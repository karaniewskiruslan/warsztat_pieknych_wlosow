import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MastersIcon from "./MastersIcon";
import { renderWithRouter } from "../../renderWithRouter";
import Master from "./Master/Master";
import { Route, Routes } from "react-router";
import { mastersInfo } from "./Masters.data";
import userEvent from "@testing-library/user-event";

const TEST_NAME = "Vasilis";
const TEST_PROFESSION = "Tester";
const TEST_EXPERIENCE = "5 year";
const TEST_MASTER_FROM_LIST = mastersInfo[0];

const testMaster = {
  id: 2,
  name: TEST_NAME,
  frontImage: "test-image",
  profession: TEST_PROFESSION,
  experience: TEST_EXPERIENCE,
  description: [""],
  masterWorksPhotos: ["photo 1", "photo 2"],
  masterPhoto: "photo master",
};

describe("Masters icon", () => {
  it("Should have proper name and profession on it", () => {
    renderWithRouter(<MastersIcon master={testMaster} />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      TEST_NAME,
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      TEST_PROFESSION,
    );
    expect(screen.getByRole("paragraph")).toHaveTextContent(TEST_EXPERIENCE);
  });

  it("Should open Master component with custom data after click", async () => {
    renderWithRouter(
      <Routes>
        <Route
          path="/"
          element={<MastersIcon master={TEST_MASTER_FROM_LIST} />}
        />
        <Route path="/masters/:name" element={<Master />} />
      </Routes>,
    );

    const button = screen.getByAltText(TEST_MASTER_FROM_LIST.name);
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    expect(screen.getByTestId("master")).toBeInTheDocument();
    expect(
      screen.getByText(`Master ${TEST_MASTER_FROM_LIST.name}`),
    ).toBeInTheDocument();
  });

  it("Should open Master component with custom data after click", async () => {
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

    expect(screen.getByTestId("master")).toBeInTheDocument();
    expect(screen.getByText(`Master ${TEST_NAME}`)).toBeInTheDocument();
  });

  it("Should show error is master not found", async () => {
    renderWithRouter(
      <Routes>
        <Route path="/" element={<MastersIcon master={testMaster} />} />
        <Route path="/masters/:name" element={<Master />} />
      </Routes>,
    );

    const button = screen.getByAltText(TEST_NAME);
    expect(button).toBeInTheDocument();

    await userEvent.click(button);

    expect(screen.getByTestId("master-not-found")).toBeInTheDocument();
  });
});
