import { SafeAreaView, StyleSheet } from "react-native";
import Card from "../../features/teams/NameCard";
import { View, Text, ScrollView } from "tamagui";
import React, { useEffect, useState } from "react";
import { selectTeamStatsBreakdown } from "../../store/teamStatsSlice";
import { useTypedSelector } from "../../store/store";
import { TeamStats } from "../../lib/models";
import { selectUserID } from "../../store/systemSlice";
import { selectMyOngoingEvents } from "../../store/eventsSlice";
export default function Team() {
  const myTeamStats = useTypedSelector(selectTeamStatsBreakdown); // Selects the team stats breakdown slice
  const userID = useTypedSelector(selectUserID); // Selects the user ID from the system slice
  const myOngoingEvents = useTypedSelector(selectMyOngoingEvents); // Selects the ongoing events from the events slice
  // Executes the fetchTeamStatsBreakdown action when the component mounts
  // This is the team data that will be displayed on the screen.  It is filtered later in the useEffect hook
  const [teamData, setTeamData] = useState<TeamStats[]>([]);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  // This useEffect hook filters the team data to only show the team that the user is on
  useEffect(() => {
    console.log("My ongoing events", myOngoingEvents[0]?.EventID);
    const profileId = userID;
    // Filters the team data to only show the team that the user is on
    const rowsWithProfileId = myTeamStats.filter((stat) => stat.Profiles.some((profile) => profile.ProfileID === profileId));
    // If no rows are returned, log that no team was found, otherwise set the team data to the team that the user is on
    if (rowsWithProfileId.length > 0) {
      const teamId = rowsWithProfileId[0].TeamID; // Gets the team ID from the team data

      const rowsWithTeamId = myTeamStats.filter((stat) => stat.TeamID === teamId && stat.EventID === myOngoingEvents[0].EventID); // Filters the team data to only show the team that the user is on
      // If no rows were returned with the current event id and the tema id, then the user is not registered for  a team or event
      if (rowsWithTeamId.length === 0) {
        alert("You are not registered for a team in the current event.");
        setIsRegistered(false);
        console.log("NO TEAM FOUND");
      } else {
        setTeamData(rowsWithTeamId); // Sets the team data to the team that the user is on
        setIsRegistered(true);
      }
    }
  }, [myTeamStats]); // Runs the useEffect hook when the myTeamStats variable changes

  return (
    // Contains the safe area view, which is basically entire page
    <SafeAreaView style={[styles.safeAreaContainer]}>
      {/* Contains Team name, userlist etc. */}
      <View style={[styles.userListContainer]}>
        {teamData.map((team, index) => (
          <Text key={index} style={[styles.teamName]}>
            {team.TeamName}
          </Text>
        ))}
        {/* Container for team stats */}
        <View style={[styles.teamContainer, styles.dropShadow]}>
          {/* Contains the names and steps container.  These are the labels */}
          <View style={[styles.namesAndStepsContainer]}>
            <Text style={[styles.namesAndStepsText]}>Name</Text>
            <Text style={[styles.namesAndStepsText]}>Steps</Text>
          </View>
          {/* Contains the list of users along with their total steps */}
          <ScrollView style={[styles.teamsScrollViewContainer]}>
            {teamData.map((team, index) => team.Profiles.map((profile, index) => <Card key={index} name={profile.ProfileName} steps={profile.TotalScore || 0}></Card>))}
          </ScrollView>
          {/* Contains the total team steps */}
          <View style={[styles.totalTeamStepsContainer]}>
            <Text style={[styles.totalTeamStepsText]}>Total Steps: {teamData[0]?.TotalScore || 0}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Contains styles for the box
  teamContainer: {
    height: "70%",
    width: "100%",
    borderWidth: 0.1,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 30,
  },
  // Contains styles for the shadow on the teamContainer
  dropShadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  // Contains styles for the safe area view, this is pretty much the entire page
  safeAreaContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // Contains styles for the team name
  teamName: {
    fontSize: 25,
    fontWeight: "600",
  },
  // Styles for container that holds the list of users
  userListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "68%",
    width: "80%",
  },
  // Contains the styles for the names and steps container
  namesAndStepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "10%",
  },
  // Contains the styles for the names and steps text
  namesAndStepsText: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 20,
    marginHorizontal: 27,
  },
  // Contains the styles for the scroll view container
  teamsScrollViewContainer: {
    height: "80%",
    width: "100%",
  },
  // Contains the styles for the total team steps text
  totalTeamStepsText: {
    fontSize: 25,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 18,
    marginRight: 12,
  },
  // Contains the styles for the total team steps container
  totalTeamStepsContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
});
