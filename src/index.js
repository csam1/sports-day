import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

// Re-structure the Components folder, Group the styles and component in the same folder.
// To increase readability.

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
