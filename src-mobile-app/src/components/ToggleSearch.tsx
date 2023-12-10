import { Button, ButtonIcon, View, XStack } from "tamagui";
import { Search } from '@tamagui/lucide-icons';
import { useState } from "react";

export default function ToggleSearch() {
  const [active, setActive] = useState(false)



  return (
    <XStack flex={1} justifyContent="flex-end" alignItems="center">
      <Hint />
    </XStack>
  )
}

function Hint() {
  return (
    <View>
      <Button icon={<Search />} scaleIcon={2}></Button>
    </View>
  );
}