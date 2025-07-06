import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

export const renderWithRouter = (ui: React.ReactElement, route = "/") => {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};
