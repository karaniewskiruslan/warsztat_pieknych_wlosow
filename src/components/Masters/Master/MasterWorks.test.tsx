import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MasterWorks from "./MasterWorks";

const testName = "John";
const testMasterWorks = ["Photo 1", "Photo 2", "Photo 3", "Photo 4", "Photo 5"];

describe("Master Works", () => {
  it("Should to render proper alt name and photos in section", () => {
    render(<MasterWorks name={testName} masterWorks={testMasterWorks} />);

    const masterPhotos = screen.getAllByTestId("master-work-photo");

    expect(masterPhotos).toHaveLength(5);
    expect(masterPhotos[1]).toHaveAttribute("src", testMasterWorks[1]);
    expect(masterPhotos[1]).toHaveAttribute(
      "alt",
      `Master ${testName} photo 1`,
    );
    expect(masterPhotos[4]).toHaveAttribute("src", testMasterWorks[4]);
    expect(masterPhotos[4]).toHaveAttribute(
      "alt",
      `Master ${testName} photo 4`,
    );
  });
});
