import { describe, expect, it } from "vitest";
import { renderWithRouter } from "../../renderWithRouter";
import ContactText from "./ContactText";
import { screen } from "@testing-library/react";

const TEST_LINK = "https://www.instagram.com";

const test1 = {
  isLink: true,
  title: "INSTA",
  link: TEST_LINK,
};

const test2 = {
  isLink: false,
  title: "Telefon",
  body: "+48 123 456 789",
};

describe("Contact text", () => {
  it("Should render link if have link is true", () => {
    renderWithRouter(<ContactText contactOpt={test1} />, "/contact");

    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", TEST_LINK);
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });

  it("Should render info part if link is false", () => {
    renderWithRouter(<ContactText contactOpt={test2} />, "/contact");

    expect(screen.getByRole("heading")).toHaveTextContent(/telefon/i);
    expect(screen.getByRole("paragraph")).toHaveTextContent("+48 123 456 789");
  });
});
