import { useSelector } from "react-redux";
import { YStack, useTheme, XStack, H3, Text } from "tamagui";
import { fetchProfileStats, selectMyProfileStats } from "../../store/profileStatsSlice";
import { useEffect } from "react";
import { useTypedDispatch } from "../../store/store";

export default function Home() {
  const theme = useTheme();
  const dispatch = useTypedDispatch();
  const myProfileStats = useSelector(selectMyProfileStats);

  useEffect(() => {
    dispatch(fetchProfileStats());
  }, []);


  return (
    <YStack backgroundColor={theme.backgroundStrong} justifyContent="center" alignItems="center" flex={1} space>
      <XStack width={'100%'}>
        <H3>My Total Steps</H3>
        <Text>{ myProfileStats?.TotalScore ?? 0 }</Text>
      </XStack>
    </YStack>
  );
}