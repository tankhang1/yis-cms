import "./App.css";
import React from "react";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import COLORS from "./constants/color";

// Define your custom theme type
const customTheme: MantineThemeOverride = {
  colors: {
    //@ts-expect-error no check
    primary: [
      COLORS.primary[100], // 100
      COLORS.primary[200], // 200
      COLORS.primary[300], // 300
      COLORS.primary[400], // 400
      COLORS.primary[500], // 500
      COLORS.primary[600], // 600
      COLORS.primary[700], // 700
      COLORS.primary[800], // 800
      COLORS.primary[900], // 900
    ],
  },
  primaryColor: "primary", // Set the primary color for the theme
  other: {
    primaryShades: COLORS.primary.o, // Use the `o` object directly from COLORS
  },
};

function App() {
  return (
    <MantineProvider
      theme={customTheme}
      withCssVariables
      withGlobalClasses
      withStaticClasses
    >
      {/* Your app content here */}
    </MantineProvider>
  );
}

export default App;
