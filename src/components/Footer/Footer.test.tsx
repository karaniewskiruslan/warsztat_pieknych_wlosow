import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import Footer from "./Footer";
import { renderWithRouter } from "../../renderWithRouter";

describe("Footer", () => {
  it("Need to be rendered on app", () => {
    renderWithRouter(<Footer />);

    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("Need to render exact text on footer", () => {
    renderWithRouter(<Footer />);

    expect(screen.getByTestId("footer")).toHaveTextContent(
      "© 2025, wszystkie prawa są zastrzeżone.",
    );
  });
});
