import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ContextsContainer from "./context/contextsContainer/contextsContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();


export const renderWithRouter = (ui: React.ReactElement, route = "/") => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ContextsContainer>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </ContextsContainer>
    </QueryClientProvider>,
  );
};
