import { describe, expect, it } from "vitest";
import { renderWithRouter } from "../../renderWithRouter";
import EmptyPage from "./EmptyPage";
import { screen } from "@testing-library/react";

describe("Admin", () => {
  it("Should be rendered", () => {
    renderWithRouter(<EmptyPage />, "/nasfasbca");

    expect(screen.getByTestId("empty-page")).toBeInTheDocument();
  });
});
