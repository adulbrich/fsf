import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Text, View, Button } from "tamagui";
import { useNavigation } from "@react-navigation/native";

const IndividualLeaderboards = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.heading}>Individual Leaderboard</Text>
        <View style={styles.leaderboardContainer}>
          {/* Placeholder for leaderboard data */}
          <Text style={styles.placeholderText}>Leaderboard data coming soon!</Text>
        </View>
        {/* Back Button */}
        <Button
          bg="#426B1F"
          color="#FFFFFF"
          onPress={() => navigation.goBack()} // Navigate back to Profile
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

export default IndividualLeaderboards;
