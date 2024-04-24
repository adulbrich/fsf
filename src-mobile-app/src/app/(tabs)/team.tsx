import { SafeAreaView, StyleSheet } from "react-native";
import { Button } from "tamagui";
import Card from "../../features/teams/NameCard";
import { View, Text, ScrollView } from "tamagui";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeamStatsBreakdown, selectMyTeamStats, selectTeamStatsBreakdown } from "../../store/teamStatsSlice";
import { useTypedDispatch, useTypedSelector } from "../../store/store";
import { TeamStats } from "../../lib/models";
export default function Team() {
  const myTeamStats = useTypedSelector(selectTeamStatsBreakdown);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchTeamStatsBreakdown());
  }, []);
  const [teamData, setTeamData] = useState<TeamStats[]>([]);

  useEffect(() => {
    const profileId = "df3cb711-d4ac-418d-9ee9-83efe5a289ae"; // replace with your ProfileID
    const rowsWithProfileId = myTeamStats.filter((stat) => stat.Profiles.some((profile) => profile.ProfileID === profileId));

    if (rowsWithProfileId.length > 0) {
      const teamId = rowsWithProfileId[0].TeamID;
      const rowsWithTeamId = myTeamStats.filter((stat) => stat.TeamID === teamId);
      setTeamData(rowsWithTeamId);
      console.log("AHHHHHH", rowsWithTeamId);
    } else {
      console.log("NO TEAM FOUND");
    }
  }, [myTeamStats]);

  useEffect(() => {
    console.log(myTeamStats);
  }, [myTeamStats]);

  return (
    <SafeAreaView style={[styles.safeAreaContainer]}>
      <View style={[styles.teamListContainer]}>
        {teamData.map((team, index) => (
          <Text key={index} style={[styles.teamName]}>
            {team.TeamName}
          </Text>
        ))}
        <View style={[styles.teamContainer, styles.dropShadow]}>
          <View style={[styles.namesAndStepsContainer]}>
            <Text style={[styles.namesAndStepsText]}>Name</Text>
            <Text style={[styles.namesAndStepsText]}>Steps</Text>
          </View>
          <ScrollView style={[styles.teamsScrollViewContainer]}>
            {teamData.map((team, index) => team.Profiles.map((profile, index) => <Card key={index} name={profile.ProfileName} steps={profile.TotalScore}></Card>))}
          </ScrollView>
          <View style={[styles.totalTeamStepsContainer]}>           
            <Text style={[styles.totalTeamSteps]}>Total Steps: {teamData[0].TotalScore}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  teamContainer: {
    height: "70%",
    width: "100%",
    borderWidth: 0.4,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 30,
  },
  dropShadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  safeAreaContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  teamName: {
    fontSize: 25,
    fontWeight: "600",
  },
  teamListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "68%",
    width: "80%",
  },
  namesAndStepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "10%",
    // borderWidth: 0.4,
    // borderColor: "black",
  },
  namesAndStepsText: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 20,
    marginHorizontal: 27,
  },
  teamsScrollViewContainer: {
    height: "80%",
    width: "100%",
    
  },
  totalTeamSteps: {
    fontSize: 25,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 18,
    marginRight: 12,
  },
  totalTeamStepsContainer: {
    width: "100%",
    alignItems: "flex-end",
  },
});
