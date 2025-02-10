import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, View, Button } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase"; // Adjust the path to your Supabase client
import { useAuth } from "../features/system/Auth"; // Ensure Auth is set up

export default function IndividualLeaderboard() {
  const navigation = useNavigation();
  const { isReady, getSession } = useAuth();

  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const { data, error } = await supabase
          .from("ProfileStats")
          .select("Name, TotalScore") // Select Name and TotalScore
          .order("TotalScore", { ascending: false }); // Order by TotalScore descending

        if (error) throw error;
        setLeaderboard(data ?? []);
      } catch (error) {
        console.error("Error fetching leaderboard:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isReady) {
      fetchLeaderboard();
    } else {
      getSession();
    }
  }, [isReady, getSession]);

  if (!isReady || loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <Text style={styles.heading}>Individual Leaderboard</Text>
      <View style={styles.leaderboardContainer}>
        {leaderboard.length === 0 ? (
          <Text>No data available</Text>
        ) : (
          leaderboard.map((user, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.name}>
                {index + 1}. {user.Name ?? "Unnamed"}
              </Text>
              <Text style={styles.score}>{user.TotalScore ?? 0}</Text>
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
        Back
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: "center",
    padding: 16,
    paddingTop: 50, // Added padding to bring content lower on the page
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
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#426B1F",
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});
