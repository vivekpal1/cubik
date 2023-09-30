import * as anchor from "@coral-xyz/anchor";
import type NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import type { PublicKey } from "@solana/web3.js";
import Squads, { getTxPDA, getIxPDA } from "@sqds/sdk";
import type { TransactionAccount, InstructionAccount } from "@sqds/sdk";
import type { VaultTx } from "@cubik/common-types";

const RPC_URL = process.env.RPC_URL || "https://rpc.cubik.so";

export const getSquads = async (wallet: NodeWallet): Promise<Squads> => {
  const squads = Squads.endpoint(RPC_URL, wallet);

  return squads;
};

export const getVault = async (
  wallet: NodeWallet,
  mutliSigAccount: anchor.web3.PublicKey
): Promise<string> => {
  const squads = await getSquads(wallet);

  const [authority] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("squad"),
      mutliSigAccount.toBuffer(),
      new anchor.BN(1).toArrayLike(Buffer, "le", 4),
      anchor.utils.bytes.utf8.encode("authority"),
    ],
    squads.multisigProgramId
  );

  return authority.toBase58();
};

export const getMsAddress = async (wallet: NodeWallet, createKey: string) => {
  const squads = await getSquads(wallet);

  const [multiSigAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("squad"),
      new anchor.web3.PublicKey(createKey).toBuffer(),
      anchor.utils.bytes.utf8.encode("multisig"),
    ],
    squads.multisigProgramId
  );

  return multiSigAccount;
};

export const getAllTx = async (wallet: NodeWallet, createKey: string) => {
  try {
    if (!createKey) return [];
    const squads = await getSquads(wallet);

    const [multiSigAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode("squad"),
        new anchor.web3.PublicKey(createKey).toBuffer(),
        anchor.utils.bytes.utf8.encode("multisig"),
      ],
      squads.multisigProgramId
    );

    const nextIndex = await squads.getNextTransactionIndex(multiSigAccount);
    const txsPDA: PublicKey[] = [];
    for (let index = 0; index < nextIndex - 1; index++) {
      const [txPDA] = getTxPDA(
        multiSigAccount,
        new anchor.BN(index + 1, 10),
        squads.multisigProgramId
      );
      txsPDA.push(txPDA);
    }
    const ixAccount = await getAllIxAcc(wallet, multiSigAccount, txsPDA);
    const txsAccount = await squads.getTransactions(txsPDA);
    const final: VaultTx[] = [];
    txsAccount.forEach((tx, index) => {
      if (!ixAccount) return;
      final.push({
        tx: tx as TransactionAccount,
        ix: ixAccount![index] as InstructionAccount,
      });
    });
    final.sort((a, b) => {
      return b.tx.transactionIndex - a.tx.transactionIndex;
    });
    return final;
  } catch (error) {
    console.log("getAllTx: ", error);
    return [];
  }
};

export const getAllIxAcc = async (
  wallet: NodeWallet,
  multiSigAccount: anchor.web3.PublicKey,
  txPDA: anchor.web3.PublicKey[]
) => {
  try {
    const squads = await getSquads(wallet);

    const nextIndex = await squads.getNextTransactionIndex(multiSigAccount);
    const IxsPDA: PublicKey[] = [];
    for (let index = 0; index < nextIndex - 1; index++) {
      const [pda] = getIxPDA(
        txPDA[index],
        new anchor.BN(1),
        squads.multisigProgramId
      );
      IxsPDA.push(pda);
    }
    const ix = await squads.getInstructions(IxsPDA);
    return ix;
  } catch (error) {
    console.log("getAllIxAcc: ", error);
    return null;
  }
};
