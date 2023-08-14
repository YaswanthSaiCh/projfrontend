import React from "react";
import AllRoutes from "./Routes";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<AllRoutes />);
