import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import { renderWithRouter } from "./renderWithRouter";

describe("Scroll component", () => {
  it("Renders scroll elements", () => {
    Object.defineProperty(document.documentElement, "scrollHeight", {
      configurable: true,
      value: window.innerHeight + 100,
    });

    renderWithRouter(<App />);
    const scrollbarElement = screen.getByTestId("scroll-progress-bar");

    expect(scrollbarElement).toBeInTheDocument();
    expect(scrollbarElement).toBeInstanceOf(HTMLDivElement);
  });
});
