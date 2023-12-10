import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { Sheet, setupNativeSheet } from '@tamagui/sheet';
import { useState } from 'react';
import { Button } from 'tamagui';
import * as rn from 'react-native-ios-modal';

setupNativeSheet('ios', ModalView)

export default function EventSheet() {
  return (
    <Sheet native>
      {/* The rest of your sheet views, see Anatomy, example and props API */}
    </Sheet>
  )
}

function SheetDemo() {
  
}
