import { ChevronDown } from '@tamagui/lucide-icons';
import { Sheet } from '@tamagui/sheet';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, H1 } from 'tamagui';
import { Tables } from '../../lib/supabase-types';
import { EventsState, setActiveEvent } from '../../store/eventsSlice';
import { RootState } from '../../store/store';

export default function EventDetailsSheet() {
  const activeEvent = useSelector<RootState, EventsState>(state => state.eventsSlice).activeEvent;
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeEvent)
      setEvent(activeEvent);
  }, [activeEvent])

  const [event, setEvent] = useState<Tables<'Events'>>();

  return (
    <Sheet
      native
      modal
      animation="medium"
      open={activeEvent !== null}
      dismissOnSnapToBottom
      onOpenChange={(open: boolean) => { if (!open) dispatch(setActiveEvent(null)) }}
    >
      <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
      <Sheet.Frame ai="center" jc="center">
        <Sheet.Handle><H1>Hello</H1></Sheet.Handle>
        <Button
          size="$6"
          circular
          icon={ChevronDown}
          onPress={() => dispatch(setActiveEvent(null))}
        />
      </Sheet.Frame>
    </Sheet>
  )
}