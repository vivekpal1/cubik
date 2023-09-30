import { TransactionAccount, InstructionAccount } from "@sqds/sdk";

export type VaultTx = {
  tx: TransactionAccount;
  ix: InstructionAccount;
};
