// import { sign, verify } from 'jsonwebtoken';
// import { Payload } from "../dto/payload";
//
// export class JwtHandler {
//   constructor() {
//   }
//
//   async verify(token,publicKey): Promise<Payload> | undefined {
//     try {
//       const user = (await verify(token, publicKey, {
//         algorithms: ['ES256'],
//       })) as Payload;
//       return user;
//     } catch (e) {
//       return undefined;
//     }
//   }
//
//   async sign(payload: Payload, ttl,privateKey) {
//     return sign(payload, privateKey, {
//       issuer: 'SARDAR',
//       subject: `${payload.sub}`,
//       expiresIn: ttl,
//       algorithm: 'ES256',
//     });
//   }
// }
