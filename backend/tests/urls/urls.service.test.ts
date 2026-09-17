import { describe, it, expect, jest, beforeEach } from "@jest/globals";

jest.unstable_mockModule("../../src/urls/urls.repository", () => ({
  create: jest.fn(),
  deleteManyUrls: jest.fn(),
  deleteUrl: jest.fn(),
  findById: jest.fn(),
  getAnalytics: jest.fn(),
  getUrlByCode: jest.fn(),
  listUrls: jest.fn(),
  registerClick: jest.fn(),
}));

jest.unstable_mockModule("nanoid", () => ({
  nanoid: jest.fn(),
}));

const urlsRepository = await import("../../src/urls/urls.repository");
const { nanoid } = await import("nanoid");

const { createUrl, getUrl } = await import("../../src/urls/urls.service");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createUrl", () => {
  it("should create a new URL", async () => {
    jest.mocked(nanoid).mockReturnValue("abc123");

    const createdUrl = {
      id: "url-123",
      code: "abc123",
      originalUrl: "https://google.com",
      userId: "user-123",
      expiresAt: null,
      createdAt: new Date(),
    };

    jest.mocked(urlsRepository.create).mockResolvedValue(createdUrl);

    const result = await createUrl("https://google.com", "user-123");

    expect(urlsRepository.create).toHaveBeenCalledWith({
      code: "abc123",
      originalUrl: "https://google.com",
      userId: "user-123",
      expiresAt: undefined,
    });

    expect(result).toEqual(createdUrl);
  });
});

describe("getUrl", () => {
  it("should return the URL when the code exists", async () => {
    const url = {
      id: "url-123",
      code: "abc123",
      originalUrl: "https://google.com",
      userId: "user-123",
      expiresAt: null,
      createdAt: new Date(),
    };

    jest.mocked(urlsRepository.getUrlByCode).mockResolvedValue(url);

    const result = await getUrl("abc123");

    expect(urlsRepository.getUrlByCode).toHaveBeenCalledWith("abc123");
    expect(result).toEqual(url);
  });

  it("should throw an error when the code does not exist", async () => {
    jest.mocked(urlsRepository.getUrlByCode).mockResolvedValue(null);

    await expect(getUrl("abc123")).rejects.toThrow("URL not found");

    expect(urlsRepository.getUrlByCode).toHaveBeenCalledWith("abc123");
  });
});
