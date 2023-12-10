import { AnimatePresence, Card, H3, Image, Text, View, XStack } from "tamagui";
import { Tables } from "../../lib/supabase-types";
import { useAssets } from "expo-asset";
import { LinearGradient } from 'tamagui/linear-gradient'
import { TouchableOpacity } from "react-native";
type Props = {
  event: Tables<'Events'>
}

export default function EventCard({ event }: Props) {
  const [assets, assetsError] = useAssets([
    require('../../../assets/images/preview_square.jpg'),
    require('../../../assets/images/preview_wide.jpg')
  ]);

  function getDateString() {
    const starts = new Date(event.StartsAt).getTime();
    const ends = new Date(event.EndsAt).getTime();
    const now = new Date().getTime();
    if (now < starts)
      return `Begins ${new Date(event.StartsAt).toLocaleDateString()}`;
    else if (now < ends)
      return `Ends ${new Date(event.EndsAt).toLocaleDateString()}`;
    else
      return `Ended ${new Date(event.EndsAt).toLocaleDateString()}`;
  }

  return (
    <View enterStyle={{ y: 15, opacity: 0 }} animation="slow">
      <Card height={"$15"} overflow="hidden" pressStyle={{ opacity: 0.8 }} animation="medium">
        { assets && (<View width={'100%'} height={'75%'} enterStyle={{ opacity: 0 }} animation={"slow"}>
          <Image width={'100%'} height={'100%'} marginLeft={-1} resizeMode="stretch" source={{ uri: assets[1].uri, width: assets[1].width!, height: assets[1].height! }} />
        </View>) }
        <LinearGradient width={'100%'} height={'75%'} colors={['#00000099', 'transparent']} start={[0.5, 1]} end={[0.5, 0]} position="absolute"  />
        <XStack flex={1} justifyContent="space-between" alignItems="center" paddingHorizontal={"$4"}>
          <H3>{event.Name}</H3>
          <Text fontSize={"$1"}>{ getDateString() }</Text>
        </XStack>
      </Card>
    </View>
  );
}