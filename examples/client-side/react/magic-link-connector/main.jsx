import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CampProvider } from "@campnetwork/sdk/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx"; 

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CampProvider clientId="your-camp-client-id">
        <App />
      </CampProvider>
    </QueryClientProvider>
  </StrictMode>
);