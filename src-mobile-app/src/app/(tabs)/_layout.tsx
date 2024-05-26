import { Redirect, Tabs } from "expo-router";
import IconHome from "../../../assets/icons/IconHome";
import IconCalendar from "../../../assets/icons/IconCalendar";
import IconProfile from "../../../assets/icons/IconProfile";
import IconSettings from "../../../assets/icons/IconSettings";
import IconTeam from "../../../assets/icons/IconTeam";
import { Text, useTheme } from "tamagui";
import { useAuth } from "../../features/system/Auth";

export default function ProtectedLayout() {
  const theme = useTheme();
  const { session, isReady } = useAuth();

  if (!isReady)
    return null;

  if (!session)
    return <Redirect href={"/"} />;

  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        backgroundColor: theme.backgroundTransparent.get(),
        borderBlockColor: theme.borderColorHover.get()
      },
      tabBarActiveTintColor: '#D3832B',
      headerShown: false,
      headerTintColor: '#FFF',
      headerTitleAlign: 'left',
      headerTitle: '',
      headerRight: () => {
        return <Text>Faculty Staff Fitness</Text>
      },
      headerRightContainerStyle: {
        paddingRight: 25
      }
    }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          href: "/home",
          tabBarIcon: ({ color }) => {
            return <IconHome color={color} />;
          },
        }} />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          href: "/events",
          tabBarIcon: ({ color }) => {
            return <IconCalendar color={color} />;
          },
        }} />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          href: "/profile",
          tabBarIcon: ({ color }) => {
            return <IconProfile color={color} />;
          },
        }} />
      <Tabs.Screen
        name="team"
        options={{
          title: "Team",
          href: "/team",
          tabBarIcon: ({ color }) => {
            return <IconTeam/>;
          },
        }}
      />
    </Tabs>
  );
}