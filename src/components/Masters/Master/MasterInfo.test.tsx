import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MasterInfo from "./MasterInfo";

const testName = "John";
const testPhoto = "Test photo";
const testDescription = ["Line 1", "Line 2", "Line 3"];

describe("Master Info", () => {
  it("Should to render proper name and photo in alt text to photo", () => {
    render(
      <MasterInfo
        name={testName}
        description={testDescription}
        photo={testPhoto}
      />,
    );

    expect(screen.getByRole("img")).toHaveAttribute(
      "alt",
      `Master ${testName} photo`,
    );
    expect(screen.getByRole("img")).toHaveAttribute("src", testPhoto);
  });

  it("Should render all paragraphs in section", () => {
    render(
      <MasterInfo
        name={testName}
        description={testDescription}
        photo={testPhoto}
      />,
    );

    const masterParagraphs = screen.getAllByTestId("master-desc");

    expect(masterParagraphs).toHaveLength(3);
    expect(masterParagraphs[0]).toHaveTextContent("Line 1");
    expect(masterParagraphs[2]).toHaveTextContent("Line 3");
  });
});
