import { Redirect, Slot } from "expo-router";
import { useAuth } from "../../features/system/Auth";

export default function AuthLayout() {
  const { session, isReady } = useAuth();

  if (!isReady)
    return null;

  if (session)
    return <Redirect href={"/"} />;

  return <Slot />;
}