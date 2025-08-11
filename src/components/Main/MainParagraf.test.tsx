import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MainParagraf from "./MainParagraf";
import { MainContent } from "../../types/main.type";
import { renderWithRouter } from "../../renderWithRouter";

const TEXT_TITLE = "Here is title";
const TEXT_CONTENT = "Here is content";

const testContent: MainContent = {
  title: TEXT_TITLE,
  content: TEXT_CONTENT,
  gallery1: {
    gallery: ["photo1", "photo2"],
    scrollDirection: "X",
  },
  gallery2: {
    gallery: ["photo1", "photo2"],
    scrollDirection: "Y",
  },
};

describe("Main Paragraf", () => {
  it("Need to show proper text on title", () => {
    renderWithRouter(<MainParagraf content={testContent} />);

    expect(screen.getByRole("heading")).toHaveTextContent(TEXT_TITLE);
  });

  it("Need to show proper text on content part", () => {
    renderWithRouter(<MainParagraf content={testContent} />);

    expect(screen.getByRole("paragraph")).toHaveTextContent(TEXT_CONTENT);
  });
});
