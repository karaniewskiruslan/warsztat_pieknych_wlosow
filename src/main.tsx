import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router.tsx";
import { NotificationContextContainer } from "./context/notificationContent.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextContainer>
      <RouterProvider router={router} />
    </NotificationContextContainer>
  </QueryClientProvider>,
);
