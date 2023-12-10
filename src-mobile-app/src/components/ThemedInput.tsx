import { useState } from "react";
import { Input, useTheme } from "tamagui";

type Props = React.ComponentProps<typeof Input>;

export default function ThemedInput(props: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();

  return (
    <Input
      {...props}
      focusStyle={{
        borderColor: theme.blue8,
        borderWidth: 2
      }}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
    />
  );
};
