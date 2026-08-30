import { create, findByEmail } from "./auth.repository";

import bcrypt from "bcrypt";
const saltRounds = 10;

export async function register(name: string, email: string, password: string) {
  const verifyUserByEmail = await findByEmail(email);

  if (verifyUserByEmail) {
    throw new Error("A user with this email already exists!");
  }

  const passwordHash = await bcrypt.hash(password, saltRounds);

  await create({ name, email, passwordHash });
}
