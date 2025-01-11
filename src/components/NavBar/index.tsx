import {
  AppShell,
  AppShellSection,
  Box,
  HoverCard,
  //   HoverCard,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  //   Stack,
  //   Text,
  useMantineTheme,
} from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

import {
  listElements,
  listRoleReportElements,
} from "../../constants/navElements";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useMemo } from "react";
const NavBar = () => {
  const { roles } = useSelector((state: RootState) => state.app);
  const theme = useMantineTheme();
  const matches = useMediaQuery("(max-width: 768px)");
  const mapElement = useMemo(
    () => (roles === "ROLE_REPORT" ? listRoleReportElements : listElements),
    [roles]
  );
  const location = useLocation();
  return (
    <AppShell.Navbar w={matches ? "auto" : 260} py={"lg"} hidden={false}>
      <AppShellSection
        grow
        component={ScrollArea}
        style={{ viewport: { padding: theme.spacing.md } }}
        scrollbarSize={10}
        px={"sm"}
      >
        {matches
          ? mapElement.map((navElement) => (
              <HoverCard
                key={navElement.label}
                disabled={!navElement.children}
                width={275}
                shadow="md"
                withinPortal
                position="right"
                radius="md"
              >
                <HoverCard.Target>
                  <NavLink
                    style={{ borderRadius: theme.radius.sm }}
                    component={Link}
                    to={navElement.link || location.pathname}
                    leftSection={
                      navElement.icon && (
                        <navElement.icon size="1.25rem" stroke={1.5} />
                      )
                    }
                    active={navElement.link === location.pathname}
                    variant="filled"
                    h="2.625rem"
                    styles={{
                      section: {
                        marginRight: 0,
                      },
                    }}
                  />
                </HoverCard.Target>
                <HoverCard.Dropdown p="md" bg={theme.white}>
                  <Stack gap="xs">
                    <Text c="dimmed" fz={15} lh={22}>
                      {navElement.label}
                    </Text>
                    <Box>
                      {navElement.children?.map((childNavElement) => (
                        <NavLink
                          key={childNavElement.label}
                          style={{ borderRadius: theme.radius.sm }}
                          label={childNavElement.label}
                          component={Link}
                          to={childNavElement.link || ""}
                          active={
                            childNavElement.link
                              ? // TODO: Better solution for checking active route?
                                location.pathname.endsWith(
                                  childNavElement.link
                                ) ||
                                location.pathname.startsWith(
                                  `${childNavElement.link}/`
                                )
                              : false
                          }
                          variant="filled"
                          h="2.625rem"
                        />
                      ))}
                    </Box>
                  </Stack>
                </HoverCard.Dropdown>
              </HoverCard>
            ))
          : mapElement.map((navElement) => (
              <NavLink
                key={navElement.label}
                style={{ borderRadius: theme.radius.sm }}
                label={navElement.label}
                fz={15}
                component={Link}
                to={navElement.link || ""}
                leftSection={
                  navElement.icon && (
                    <navElement.icon size="1.25rem" stroke={1.5} />
                  )
                }
                childrenOffset="1rem"
                active={navElement.link === location.pathname}
                variant="filled"
                h="2.625rem"
              >
                {navElement.children?.map((childNavElement) => {
                  if (childNavElement?.children) {
                    return (
                      <NavLink
                        key={childNavElement.label}
                        style={{ borderRadius: theme.radius.sm }}
                        label={childNavElement.label}
                        component={Link}
                        to={childNavElement.link || ""}
                        leftSection={
                          childNavElement.icon && (
                            <childNavElement.icon size="1.25rem" stroke={1.5} />
                          )
                        }
                        childrenOffset="1.25rem"
                        active={childNavElement.link === location.pathname}
                        variant="filled"
                        h="2.625rem"
                      >
                        {childNavElement?.children.map(
                          (nestedParentNavElement) => {
                            return (
                              <NavLink
                                key={nestedParentNavElement.label}
                                style={{ borderRadius: theme.radius.sm }}
                                label={nestedParentNavElement.label}
                                component={Link}
                                to={nestedParentNavElement.link || ""}
                                active={
                                  nestedParentNavElement.link
                                    ? // TODO: Better solution for checking active route?
                                      location.pathname.endsWith(
                                        nestedParentNavElement.link
                                      ) ||
                                      location.pathname.startsWith(
                                        `${nestedParentNavElement.link}/`
                                      )
                                    : false
                                }
                                variant="filled"
                                h="2.625rem"
                              />
                            );
                          }
                        )}
                      </NavLink>
                    );
                  }

                  return (
                    <NavLink
                      key={childNavElement.label}
                      style={{ borderRadius: theme.radius.sm }}
                      label={childNavElement.label}
                      component={Link}
                      to={childNavElement.link || ""}
                      active={
                        childNavElement.link
                          ? // TODO: Better solution for checking active route?
                            location.pathname.endsWith(childNavElement.link) ||
                            location.pathname.startsWith(
                              `${childNavElement.link}/`
                            )
                          : false
                      }
                      variant="filled"
                      h="2.625rem"
                    />
                  );
                })}
              </NavLink>
            ))}
      </AppShellSection>
    </AppShell.Navbar>
  );
};

export default NavBar;
