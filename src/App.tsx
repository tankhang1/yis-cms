import "./App.css";
import React from "react";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import COLORS from "./constants/color";
import { useRoutes } from "react-router-dom";
import routes from "./router";
import "@mantine/core/styles.css";
import "@mantine/core/styles.layer.css";
import "@mantine/notifications/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

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
  const appRoutes = useRoutes(routes);

  return (
    <MantineProvider
      theme={customTheme}
      withCssVariables
      withGlobalClasses
      withStaticClasses
    >
      <ModalsProvider>{appRoutes}</ModalsProvider>
      <Notifications />
    </MantineProvider>
  );
}

export default App;
