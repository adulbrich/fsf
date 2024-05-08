import { AnimatePresence, Card, H3, Image, Text, View, XStack, YStack, useTheme } from "tamagui";
import { Tables } from "../../lib/supabase-types";
import { useAssets } from "expo-asset";
import { LinearGradient } from 'tamagui/linear-gradient';
import { useDispatch } from "react-redux";
import { setActiveEvent } from "../../store/eventsSlice";
import React from "react";
import { router } from "expo-router";

//Purpose: defines a card for a team. The card contains the team name, number of members, and a "Join" button

type Props = {
	team: Tables<'Teams'>
}

export default function TeamCard({ team }: Props) {
  const theme = useTheme();
  const dispatch = useDispatch();

  // fetch team name
  function TeamName({ team }: Props) {
		const teamname = team && team.Name;
		console.log(teamname);
		return teamname;
  }

  // fetch number of members in the team

  // 'Join' team button functionality

  return(
    <AnimatePresence exitBeforeEnter>
			<YStack
				padding="$4"
			>
				<Card height="$8" 
					width="100%" 
					elevation={"$1"} 
					backgroundColor="white" 
					borderWidth="$1" 
					borderColor="red"
					borderTopLeftRadius={"$3"}
					borderTopRightRadius={"$3"}
				>
					<XStack
						position="absolute"
						justifyContent="center"
						paddingVertical={"$2"}
						paddingHorizontal={"$3"}
						//bottom={0}
						left={0}
						right={0}
						backgroundColor={"#EEEEEEEE"}
						borderBottomWidth="$1"
						
						//box radius
						borderTopLeftRadius={"$2"}
						borderTopRightRadius={"$2"}
						borderColor="blue"
						
						
					>
						<H3 color="black">{TeamName({ team })}</H3>

						<Text color="black" marginTop={"$2"} fontSize={"$4"}>Sample Text</Text>
						
					</XStack>
				</Card>
			</YStack>
    </AnimatePresence>
  );
}               




