import type { Request, Response } from "express";
import * as anchor from "@coral-xyz/anchor";
import fs from "fs";
// import type NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
// import type { PublicKey } from "@solana/web3.js";
// import Squads, { getTxPDA, getIxPDA } from "@sqds/sdk";
// import type { TransactionAccount, InstructionAccount } from "@sqds/sdk";
import { getVault, getMsAddress, getAllTx, getSquads } from "utils/squads";
// const RPC_URL = process.env.RPC_URL || "https://rpc.cubik.so";

const keyPair = anchor.web3.Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(fs.readFileSync(process.env.KEYPAIR!).toString()))
);

const wallet = new anchor.Wallet(keyPair);

export const getSquadsTxs = async (req: Request, res: Response) => {
  try {
    /*
    1. get createKey of multisig
    2. get multisig pda
    3. get all transactions for that pda
    4. get all ixs for each txs
    */
    const { createKey } = req.query;
    const squads = await getSquads(wallet);
    const multiSigAccount = await getMsAddress(wallet, createKey as string);
    const vault = await getVault(wallet, multiSigAccount);
    const txs = await getAllTx(wallet, createKey as string);

    res.status(200).json({
      vault,
      txs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};
