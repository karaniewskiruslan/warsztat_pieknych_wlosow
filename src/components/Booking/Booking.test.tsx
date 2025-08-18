import { describe, expect, it } from "vitest";
import { renderWithRouter } from "../../renderWithRouter";
import { screen } from "@testing-library/react";
import Booking from "./Booking";

const BOOKSY_LINK =
  "https://booksy.com/pl-pl/172573_warsztat-pieknych-wlosow_fryzjer_3_warszawa?do=invite&_branch_match_id=1430280485439261899&utm_medium=merchant_customer_invite&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT07J0UvKz88urtRLzs%2FVz48Mc03yNfGz8EuyrytKTUstKsrMS49PKsovL04tsnXLBIrlVwAAeWwQpz0AAAA%3D";

describe("Admin", () => {
  it("Should be rendered", () => {
    renderWithRouter(<Booking />, "/booking");

    expect(screen.getByTestId("booking")).toBeInTheDocument();
  });

  it("Should have link to booksy", () => {
    renderWithRouter(<Booking />, "/booking");

    expect(screen.getByTestId("link_booksy")).toBeInTheDocument();
    expect(screen.getByTestId("link_booksy")).toHaveAttribute(
      "href",
      BOOKSY_LINK,
    );
  });
});

