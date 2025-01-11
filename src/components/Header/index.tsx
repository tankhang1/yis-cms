import {
  ActionIcon,
  AppShell,
  Flex,
  Group,
  Image,
  Menu,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import LOGO from "../../assets/logo-yis.png";
import { useNavigate } from "react-router-dom";
import NAV_LINK from "../../constants/navLinks";
import { useDispatch } from "react-redux";
import { resetAppInfo } from "../../redux/slices/appSlices";
const MapLanguageIcon = new Map([
  [
    "vi",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMF-Ly3Re3LxcOi4Bz61Rqj9iR2_DAX4EanQ&s",
  ],
  [
    "en",
    "https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg",
  ],
  [
    "kr",
    "https://asiasociety.org/sites/default/files/styles/1200w/public/K/korean-flag.jpg",
  ],
]);
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = async () => {
    navigate(NAV_LINK.LOGIN);
    dispatch(resetAppInfo());
  };
  return (
    <AppShell.Header
      p="md"
      style={{
        backdropFilter: "saturate(180%) blur(15px)",
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: "6px",
      }}
      ml={280}
      mr={20}
      mt={10}
    >
      <Group wrap="nowrap" justify="space-between" w={"100%"}>
        <Flex align="center" h="100%">
          <Group gap="1rem">
            <Image src={LOGO} w={100} h={25} />
          </Group>
        </Flex>

        <Group gap="md">
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="transparent">
                <Image
                  src={MapLanguageIcon.get("vi")}
                  className="flag-icon"
                  w={20}
                />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={() => {}}>
                <Group>
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMF-Ly3Re3LxcOi4Bz61Rqj9iR2_DAX4EanQ&s"
                    w={20}
                    className="flag-icon"
                  />
                  <Text>Việt Nam</Text>
                </Group>
              </Menu.Item>
              {/* <Menu.Item onClick={() => {}}>
                <Group>
                  <Image
                    src="https://asiasociety.org/sites/default/files/styles/1200w/public/K/korean-flag.jpg"
                    className="flag-icon"
                    w={20}
                  />
                  <Text>Korean</Text>
                </Group>
              </Menu.Item>
              <Menu.Item onClick={() => {}}>
                <Group>
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg"
                    w={20}
                    className="flag-icon"
                  />
                  <Text>English</Text>
                </Group>
              </Menu.Item> */}
            </Menu.Dropdown>
          </Menu>
          <Tooltip label={"Thoát"}>
            <ActionIcon
              variant="default"
              size="lg"
              radius="md"
              onClick={onLogout}
              loading={false}
            >
              <IconLogout size="1.125rem" stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </AppShell.Header>
  );
};

export default Header;
