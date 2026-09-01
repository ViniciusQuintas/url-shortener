import { create, findByEmail } from "./auth.repository";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import "dotenv/config";
import { env } from "node:process";
const saltRounds = 10;

async function generatePasswordHash(password: string) {
  return await bcrypt.hash(password, saltRounds);
}

async function comparePasswordHash(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export async function register(name: string, email: string, password: string) {
  const verifyUserByEmail = await findByEmail(email);

  if (verifyUserByEmail) {
    throw new Error("A user with this email already exists!");
  }

  const passwordHash = await generatePasswordHash(password);

  await create({ name, email, passwordHash });
}

export async function login(email: string, password: string) {
  const user = await findByEmail(email);

  if (!user) {
    throw new Error("This account does not exist!");
  }

  const verifyPassword = await comparePasswordHash(password, user.passwordHash);

  if (!verifyPassword) {
    throw new Error("Invalid password. Please try again");
  }

  const payload = {
    sub: user.id,
    name: user.name,
    email: user.email,
  };

  const secret = env.JWT_SECRET;

  if (!secret) {
    throw new Error("The JWT_SECRET is required!");
  }

  const options: SignOptions = {
    expiresIn: "7d",
  };

  const token = jwt.sign(payload, secret, options);

  return token;
}
