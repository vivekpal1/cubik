import type { Request, Response } from "express";
import * as anchor from "@coral-xyz/anchor";

import * as sqds from "@sqds/multisig";
const RPC_URL = process.env.RPC_URL || "https://rpc.cubik.so";

const connection = new anchor.web3.Connection(RPC_URL);

const { Multisig, VaultTransaction, Proposal } = sqds.accounts;

export const getSquadsTxs = async (req: Request, res: Response) => {
  try {
    const { createKey } = req.query;
    const [multisigPda] = sqds.getMultisigPda({
      createKey: new anchor.web3.PublicKey(createKey as string),
    });

    const multisigAccount = await Multisig.fromAccountAddress(
      connection,
      multisigPda
    );

    let getTxsPromise = [];
    let getProposalsPromise = [];
    let allTxs: sqds.generated.VaultTransaction[] = [];
    let allProposals: sqds.generated.Proposal[] = [];

    for (let i = 0; i < Number(multisigAccount.transactionIndex); i++) {
      const [transactionPda] = sqds.getTransactionPda({
        multisigPda,
        index: BigInt(i + 1),
      });

      getTxsPromise.push(
        VaultTransaction.fromAccountAddress(connection, transactionPda)
      );

      const [proposalPda] = sqds.getProposalPda({
        multisigPda,
        transactionIndex: BigInt(i + 1),
      });

      getProposalsPromise.push(
        Proposal.fromAccountAddress(connection, proposalPda)
      );

      allTxs = await Promise.all(getTxsPromise);
      allProposals = await Promise.all(getProposalsPromise);
    }

    res.status(200).json({
      msMembers: multisigAccount.members,
      multisigAccount,
      allTxs,
      allProposals,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};
