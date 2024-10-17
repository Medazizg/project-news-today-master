import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  Avatar,
  Box,
  Menu,
  ActionIcon,
} from "@mantine/core";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import AppshelNavBar from "../Navbar/AppshelNavBar";
import { IconLogin, IconLogout } from "@tabler/icons-react";

export default function AppShellDemo() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? "Close navigation" : "Open navigation";
  const navigate = useNavigate();

  const profile = localStorage.getItem("profile");

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 180, lg: 250 }}
        >
          <AppshelNavBar toggle={toggle} />
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <Box
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                color="#fe6734"
                opened={opened}
                onClick={toggle}
                aria-label={label}
                size="sm"
                mr="xl"
              />
            </MediaQuery>
            <Avatar
              component={Link}
              to="/latest"
              size={80}
              src="https://scontent.ftun14-1.fna.fbcdn.net/v/t1.15752-9/331660205_725855115713634_6851562038351684894_n.png?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=SXd1T9N9slsAX8JM7z1&_nc_ht=scontent.ftun14-1.fna&oh=03_AdRUx6uac8U7zlYRqFftpIKqJxtok4wQ1mvWv6JH6Mlk7Q&oe=6451A832"
              alt="logo"
              style={{ marginRight: "auto" }}
            />
            <Menu width={200} shadow="md">
              <Menu.Target>
                <ActionIcon>
                  <Avatar radius="xl" />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                {profile ? (
                  <Menu.Item
                    icon={<IconLogout />}
                    component="button"
                    onClick={() => {
                      localStorage.removeItem("profile");
                      navigate("/sign");
                    }}
                    color="red"
                  >
                    Log out
                  </Menu.Item>
                ) : (
                  <Menu.Item
                    icon={<IconLogin />}
                    component="button"
                    onClick={() => {
                      navigate("/sign");
                    }}
                    color="green"
                  >
                    Sign
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
          </Box>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
}
