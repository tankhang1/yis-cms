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
    // <AppShell
    //   styles={appShellStyles}
    //   navbar={{ width: 260, breakpoint: "sm" }}
    //   padding="md"
    // >
    //   <NavBar />
    //   <ScrollArea scrollbars="y" bg={"#F8F7FA"}>
    //     <Box pl={matches ? 80 : 280} pr={10} pt={100} h={"100vh"} w={"100vw"}>
    //       <ScrollArea type="auto" scrollbars="y">
    //         <Header />
    //         <Box w={"99%"}>
    //           <Outlet />
    //         </Box>
    //       </ScrollArea>
    //     </Box>
    //   </ScrollArea>
    // </AppShell>
    <AppShell
      styles={appShellStyles}
      navbar={{ width: 260, breakpoint: "sm" }}
      padding="md"
    >
      <NavBar />

      <ScrollArea type="auto" bg={"#F8F7FA"}>
        <Box
          pl={matches ? 80 : 280}
          pr={20}
          pt={100}
          pb={100}
          h={"100vh"}
          w={"100vw"}
        >
          <Header />
          <Outlet />
        </Box>
      </ScrollArea>
    </AppShell>
  );
};

export default MainPage;
