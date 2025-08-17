import { describe, expect, it } from "vitest";
import { renderWithRouter } from "../../../renderWithRouter";
import Master from "./Master";
import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router";
import MastersIcon from "../MastersIcon";
import userEvent from "@testing-library/user-event";

const TEST_NAME = "Dimitrios";
const TEST_PROFESSION = "Pedicure";
const TEST_EXPERIENCE = "17 year of experience";

const testMaster = {
  id: 2,
  name: TEST_NAME,
  frontImage: "test-images",
  profession: TEST_PROFESSION,
  experience: TEST_EXPERIENCE,
  description: ["Lorem 1", "Lorem 2", "Lorem 3"],
  masterWorksPhotos: ["photo 1", "photo 2"],
  masterPhoto: "photo 1",
};

describe("Master", () => {
  it("Should be rendered with master in props", () => {
    renderWithRouter(<Master masterInfo={testMaster} />);

    expect(screen.getByTestId("master")).toBeInTheDocument();
  });

  it("Should take back to masters page after back button click", async () => {
    renderWithRouter(
      <Routes>
        <Route path="/" element={<MastersIcon master={testMaster} />} />
        <Route
          path="/masters/:name"
          element={<Master masterInfo={testMaster} />}
        />
      </Routes>,
    );

    const button = screen.getByAltText(TEST_NAME);
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    const backButton = screen.getByRole("button");
    expect(backButton).toBeInTheDocument();

    await userEvent.click(backButton);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      TEST_NAME,
    );
  });
});
