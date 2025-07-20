import { describe, expect, it } from "vitest";
import { renderWithRouter } from "../../renderWithRouter";
import Admin from "./Admin";
import { screen } from "@testing-library/react";

describe("Admin", () => {
  it("Should be rendered", () => {
    renderWithRouter(<Admin />, "/admin");

    expect(screen.getByTestId("admin")).toBeInTheDocument();
  })
})