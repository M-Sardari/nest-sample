import { sign, verify } from "jsonwebtoken";
import { Payload } from "../dto/payload";
import { readFileSync } from "fs";

export class JwtHandler {
  constructor() {
  }

  async verify(token, publicKey): Promise<Payload> | undefined {
    try {
      return (await verify(token, readFileSync(publicKey), {
        algorithms: ["ES256"]
      })) as Payload;
    } catch (e) {
      return undefined;
    }
  }

  async sign(payload: Payload, ttl, privateKey) {
    return sign(payload, readFileSync(privateKey), {
      issuer: "SARDAR",
      expiresIn: ttl,
      algorithm: "ES256"
    });
  }
}
