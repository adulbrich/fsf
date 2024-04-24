import * as React from "react";
import Svg, { Path, G, Text } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 1"
    viewBox="0 0 100 125"
    {...props}
  >
    <G data-name="Group">
      <Path
        d="M10.1 50.5v8.9a4 4 0 0 0 4 4h2.4v25.7a6 6 0 0 0 6 6h55a6 6 0 0 0 6-6V63.5h2.4a4 4 0 0 0 4-4v-9A19.9 19.9 0 0 0 60 33.3a19.8 19.8 0 0 0-20 0 19.9 19.9 0 0 0-30 17.2ZM70 34.6a16 16 0 0 1 15.9 15.9v8.9h-2.4a4 4 0 0 0-4 4v25.7a2 2 0 0 1-2 2H63.2a6 6 0 0 0 .4-2V63.5H66a4 4 0 0 0 4-4v-9A19.9 19.9 0 0 0 63.6 36a15.9 15.9 0 0 1 6.4-1.4Zm-20 0a16 16 0 0 1 15.9 15.9v8.9h-2.4a4 4 0 0 0-4 4v25.7a2 2 0 0 1-2 2H52V67.7h-4v23.4h-5.5a2 2 0 0 1-2-2V63.5a4 4 0 0 0-4-4h-2.4v-9A16 16 0 0 1 50 34.6Zm-20 0a15.9 15.9 0 0 1 6.4 1.4A19.9 19.9 0 0 0 30 50.6v8.9a4 4 0 0 0 4 4h2.4v25.6a6 6 0 0 0 .4 2H22.5a2 2 0 0 1-2-2V63.5a4 4 0 0 0-4-4h-2.4v-9A16 16 0 0 1 30 34.6ZM40 20.5a11 11 0 0 0 20 0 11 11 0 1 0 0-9.2 11 11 0 0 0-20 0 11 11 0 1 0 0 9.2ZM70 8.9a7 7 0 1 1-7 7 7 7 0 0 1 7-7Zm-20 0a7 7 0 1 1-7 7 7 7 0 0 1 7-7Zm-27 7a7 7 0 1 1 7 7 7 7 0 0 1-7-7Z"
        data-name="Compound Path"
      />
    </G>
  </Svg>
  );
}

export default SvgComponent;
