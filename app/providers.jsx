"use client";

import Preloader from "./components/preloader";
import { ThemeProvider } from "./context/ThemeContext";

const Providers = ({ children }) => (
  <ThemeProvider>
    <Preloader />
    {children}
  </ThemeProvider>
);

export default Providers;
