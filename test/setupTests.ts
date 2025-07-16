import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import { TextEncoder } from "util";

global.TextEncoder = TextEncoder;

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
