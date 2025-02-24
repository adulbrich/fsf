import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Text, View, Button } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../features/system/Auth";
import { supabase } from "../lib/supabase"; // Adjust this path if needed

const TeamLeaderboard = () => {
  const navigation = useNavigation();
  const { session, isReady, getSession } = useAuth();
  const [teamStats, setTeamStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllTeams = async () => {
      try {
        const { data, error } = await supabase
          .from("TeamStats")
          .select("*")
          .order("TotalScore", { ascending: false }); // Sort teams by score

        if (error) throw error;
        setTeamStats(data || []);
      } catch (error) {
        console.error("Error fetching team stats:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isReady) {
      fetchAllTeams();
    } else {
      getSession();
    }
  }, [isReady, getSession]);

  if (!isReady || loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.heading}>Team Leaderboard</Text>
        <View style={styles.leaderboardContainer}>
          {teamStats.length === 0 ? (
            <Text style={styles.placeholderText}>No leaderboard data available!</Text>
          ) : (
            teamStats.map((team, index) => (
              <View key={team.TeamID} style={styles.teamRow}>
                <Text style={styles.teamName}>
                  {index + 1}. {team.Name}
                </Text>
                <Text style={styles.teamScore}>{team.TotalScore ?? 0}</Text>
              </View>
            ))
          )}
        </View>
        <Button
          bg="#426B1F"
          color="#FFFFFF"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          Back to Profile
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    alignItems: "center",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#426B1F",
    marginBottom: 20,
  },
  leaderboardContainer: {
    width: "100%",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  teamRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  teamScore: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#426B1F",
  },
  placeholderText: {
    fontSize: 18,
    textAlign: "center",
    color: "#888",
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    textAlign: "center",
  },
});

export default TeamLeaderboard;
