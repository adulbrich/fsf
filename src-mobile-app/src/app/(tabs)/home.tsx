import { useSelector } from "react-redux";
import { YStack, useTheme, H5, H4 } from "tamagui";
import { fetchProfileStats, selectMyProfileStats } from "../../store/profileStatsSlice";
import { useEffect } from "react";
import { useTypedDispatch } from "../../store/store";
import { fetchTeamStats } from "../../store/teamStatsSlice";

export default function Home() {
  const theme = useTheme();
  const dispatch = useTypedDispatch();
  const myProfileStats = useSelector(selectMyProfileStats);

  useEffect(() => {
    dispatch(fetchProfileStats());
    dispatch(fetchTeamStats());
  }, []);


  return (
    <YStack backgroundColor={theme.backgroundStrong} justifyContent="center" alignItems="center" flex={1} space>
      <YStack width={'100%'} alignItems="center" padding="$4" backgroundColor={'$background'}>
        <H5>My Total Steps</H5>
        <H4>{ myProfileStats?.TotalScore ?? 0 }</H4>
      </YStack>
    </YStack>
  );
}