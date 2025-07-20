import { describe, expect, it } from "vitest";
import { renderWithRouter } from "../../renderWithRouter";
import { screen } from "@testing-library/react";
import Booking from "./Booking";

describe("Admin", () => {
  it("Should be rendered", () => {
    renderWithRouter(<Booking />, "/booking");

    expect(screen.getByTestId("booking")).toBeInTheDocument();
  });
});
