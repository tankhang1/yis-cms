import "./App.css";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import COLORS from "./constants/color";
import { useRoutes } from "react-router-dom";
import routes from "./router";
import "@mantine/core/styles.css";
import "@mantine/core/styles.layer.css";
import "@mantine/notifications/styles.css";
import "mantine-datatable/styles.layer.css";
import "@mantine/dates/styles.css";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

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
      <ModalsProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {appRoutes}
          </PersistGate>
        </Provider>
      </ModalsProvider>
      <Notifications />
    </MantineProvider>
  );
}

export default App;
