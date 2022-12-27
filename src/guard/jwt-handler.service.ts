// import { sign, verify } from "jsonwebtoken";
// import { Payload } from "../dto/payload";
// import { readFileSync } from "fs";
//
// export class JwtHandler {
//   constructor() {
//   }
//
//   async verify(token): Promise<Payload> | undefined {
//     try {
//       return (await verify(token, readFileSync(process.env.JWT_PUB), {
//         algorithms: ["ES256"]
//       })) as Payload;
//     } catch (e) {
//       return undefined;
//     }
//   }
//
//   async sign(payload: Payload, ttl) {
//     return sign(payload, readFileSync(process.env.JWT_PRV), {
//       issuer: "SARDAR",
//       expiresIn: ttl,
//       algorithm: "ES256"
//     });
//   }
// }
