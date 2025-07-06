import { describe, expect, it } from "vitest";
import { renderWithRouter } from "../../renderWithRouter";
import ServicesProduct from "./ServicesProduct";
import { screen } from "@testing-library/react";

const testProduct1 = {
  id: 400,
  image: "image2",
  name: "Test prod 1",
  category: "Test category 1",
  options: [],
  cost: 20,
};

const testProduct2 = {
  id: 401,
  image: "image1",
  name: "Test prod 2",
  category: "Test category 2",
  options: ["Option 1", "Option 2", "Option 3"],
  cost: [25, 35, 45],
};

describe("Services product", () => {
  it("Should render in the document", () => {
    renderWithRouter(<ServicesProduct product={testProduct1} />);

    expect(screen.getByTestId("servicesProd")).toBeInTheDocument();
  });

  it("Should to render cost with zł symbol and product name", () => {
    renderWithRouter(<ServicesProduct product={testProduct1} />);

    expect(screen.getByTestId("servicesProd")).toHaveTextContent("20 zł");
    expect(screen.getByTestId("servicesProd")).toHaveTextContent("Test prod 1");
  });

  it("Should to render all options' cost", () => {
    renderWithRouter(<ServicesProduct product={testProduct2} />);

    expect(screen.getByTestId("servicesProd")).toHaveTextContent("25 zł");
    expect(screen.getByTestId("servicesProd")).toHaveTextContent("Option 1");

    expect(screen.getByTestId("servicesProd")).toHaveTextContent("35 zł");
    expect(screen.getByTestId("servicesProd")).toHaveTextContent("Option 2");

    expect(screen.getByTestId("servicesProd")).toHaveTextContent("45 zł");
    expect(screen.getByTestId("servicesProd")).toHaveTextContent("Option 3");
  });
});
