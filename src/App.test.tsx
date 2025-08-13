import { act, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { renderWithRouter } from "./renderWithRouter";

const position = [0, 0.5, 1];

const useScroll = vi.fn((value: number) => ({
  scrollYProgress: {
    get: () => value,
    onChange: vi.fn(),
  },
}));

describe("Scroll component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Renders scroll elements", () => {
    renderWithRouter(<App />);
    const scrollbarElement = screen.getByTestId("scroll-progress-bar");

    expect(scrollbarElement).toBeInTheDocument();
    expect(scrollbarElement).toBeInstanceOf(HTMLDivElement);
  });

  position.forEach((progress) => {
    it.skip(`Should render ${progress} at scroll progress equal ${progress * 100}%`, async () => {
      act(() => {
        useScroll(progress);
      });
      renderWithRouter(<App />);
      const scrollbarElement = screen.getByTestId("scroll-progress-bar");
      await waitFor(() => {
        expect(scrollbarElement).toHaveStyle(`transform: scaleX(${progress})`);
      });
    });
  });
});
