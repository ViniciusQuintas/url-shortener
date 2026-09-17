import { describe, it, expect, jest, beforeEach } from "@jest/globals";

jest.unstable_mockModule("../../src/auth/auth.repository", () => ({
  findByEmail: jest.fn(),
  create: jest.fn(),
}));

jest.unstable_mockModule("bcrypt", () => ({
  default: {
    hash: jest.fn(),
    compare: jest.fn(),
  },
}));

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    sign: jest.fn(),
  },
}));

const authRepository = await import("../../src/auth/auth.repository");

const bcrypt = (await import("bcrypt")).default;

const jwt = (await import("jsonwebtoken")).default;

const { register, login } = await import("../../src/auth/auth.service");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("register", () => {
  it("should register a new user", async () => {
    jest.mocked(authRepository.findByEmail).mockResolvedValue(null);
    jest.mocked(bcrypt.hash).mockResolvedValue("hash-fake" as never);

    await register("João", "joao@email.com", "123456");

    expect(authRepository.create).toHaveBeenCalledWith({
      name: "João",
      email: "joao@email.com",
      passwordHash: "hash-fake",
    });
  });

  it("should not register a user with an existing email", async () => {
    jest.mocked(authRepository.findByEmail).mockResolvedValue({
      id: "123",
      email: "joao@email.com",
      name: "João",
      passwordHash: "hash-fake",
      createdAt: new Date(),
    });

    await expect(register("João", "joao@email.com", "123456")).rejects.toThrow(
      "A user with this email already exists!",
    );

    expect(authRepository.create).not.toHaveBeenCalled();
  });
});

describe("login", () => {
  it("should sign in with credentials", async () => {
    jest.mocked(authRepository.findByEmail).mockResolvedValue({
      id: "123",
      email: "user@example.com",
      name: "John Doe",
      passwordHash: "hash-fake",
      createdAt: new Date(),
    });

    jest.mocked(bcrypt.compare).mockResolvedValue(true);
    jest.mocked(jwt.sign).mockImplementation(() => "token-fake");

    const token = await login("user@example.com", "123456");

    expect(token).toBe("token-fake");
  });

  it("should reject with an invalid password", async () => {
    jest.mocked(authRepository.findByEmail).mockResolvedValue({
      id: "123",
      email: "user@example.com",
      name: "John Doe",
      passwordHash: "hash-fake",
      createdAt: new Date(),
    });

    jest.mocked(bcrypt.compare).mockResolvedValue(false);

    await expect(login("user@example.com", "wrong-password")).rejects.toThrow(
      "Invalid password. Please try again",
    );
  });

  it("should reject when the email does not exist", async () => {
    jest.mocked(authRepository.findByEmail).mockResolvedValue(null);

    await expect(login("unknown@example.com", "123456")).rejects.toThrow(
      "This account does not exist!",
    );

    expect(bcrypt.compare).not.toHaveBeenCalled();
  });
});
