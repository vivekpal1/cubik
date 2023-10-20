import { NFTProfile } from "@cubik/common-types";

export interface User {
  id: string;
  username: string;
  profilePicture: string;
  mainWallet: string;
  profileNft?: NFTProfile;
}
