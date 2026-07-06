import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testMatch: ["**/?(*.)+(test|spec).[tj]s?(x)"],
};

export default config;
