import { AppShell, Box, ScrollArea, useMantineTheme } from "@mantine/core";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import NavBar from "../../components/NavBar";
import Header from "../../components/Header";

const MainPage = () => {
  const theme = useMantineTheme();
  const matches = useMediaQuery("(max-width: 768px)");

  const appShellStyles = useMemo(
    () => ({
      main: {
        background: theme.colors.gray[0],
        width: "100%",
      },
    }),
    []
  );

  return (
    <AppShell
      styles={appShellStyles}
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm" }}
      padding="md"
    >
      <Header />
      <NavBar />

      <ScrollArea type="auto">
        <Box pl={matches ? 80 : 290} pr={20} pt={80} h={"100vh"} w={"100vw"}>
          <Outlet />
        </Box>
      </ScrollArea>
    </AppShell>
  );
};

export default MainPage;
