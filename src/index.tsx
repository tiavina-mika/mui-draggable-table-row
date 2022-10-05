import * as React from "react";
import ReactDOM from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import KitchenAreas from "./KitchenAreas";

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <KitchenAreas />
    </StyledEngineProvider>
  </React.StrictMode>
);
