import { UAParser } from "ua-parser-js";

export const parseUserAgent = (userAgent: string) => {
  return new UAParser(userAgent).getResult();
};
