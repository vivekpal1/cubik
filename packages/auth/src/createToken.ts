import { SignJWT } from 'jose';

import { AuthPayload } from '@cubik/common-types';

export const createToken = async (tokenPayload: AuthPayload) => {
  try {
    const secret = new TextEncoder().encode(process.env.SECRET);

    const alg = 'HS256';
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secret);
  } catch (error) {
    console.log(error);
    return null;
  }
};
