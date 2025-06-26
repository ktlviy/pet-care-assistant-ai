import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface ExtendedSession {
  session: Session;
  token: JWT;
}
