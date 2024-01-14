// import { StyleSheet, Text, View } from 'react-native'; 
// import RankItem from '../components/RankItem';
// import React from 'react';
// import { createClient } from 'supabase/supabase-js';
// import { ScrollViewStyleReset } from 'expo-router/html';


// Initialize Supabase client
// const supabaseUrl = 'SUPABASE_URL';
// const supabaseKey = 'SUPABASE_ANON_KEY';
// const supabase = createClient(supabaseUrl, supabaseKey);

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';

interface TeamMemberStepCount {
  id: string;
  name: string;
  steps: number;
}

interface LeaderboardResponse {
  event: string;
  teamMembers: TeamMemberStepCount[];
}

interface Leaderboard extends LeaderboardResponse {
  teamTotalSteps: number;
}

const fetchLeaderboardData = async (event: string): Promise<LeaderboardResponse> => {
  const response = await fetch(`api_step_link=${encodeURIComponent(event)}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
};

const calculateTotalSteps = (teamMembers: TeamMemberStepCount[]): number => {
  return teamMembers.reduce((total, member) => total + member.steps, 0);
};

const sortTeamMembersBySteps = (teamMembers: TeamMemberStepCount[]): TeamMemberStepCount[] => {
  return teamMembers.sort((a, b) => b.steps - a.steps);
};

const LeaderboardScreen = ({ route }) => {
  const { event } = route.params;
  const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const loadLeaderboardData = useCallback(async () => {
    try {
      const data = await fetchLeaderboardData(event);
      setLeaderboard({
        ...data,
        teamTotalSteps: calculateTotalSteps(data.teamMembers),
        teamMembers: sortTeamMembersBySteps(data.teamMembers),
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch leaderboard data. Please try again later.');
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [event]);

  useEffect(() => {
    loadLeaderboardData();
  }, [loadLeaderboardData]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    loadLeaderboardData();
  }, [loadLeaderboardData]);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
    >
      <Text style={styles.header}>Leaderboard for {event}</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      ) : leaderboard?.teamMembers.length === 0 ? (
        <Text style={styles.noData}>No step data available</Text>
      ) : (
        leaderboard.teamMembers.map((member, index) => (
          <View key={member.id} style={styles.memberContainer}>
            <Text style={styles.memberName}>{index + 1}. {member.name}</Text>
            <Text style={styles.memberSteps}>{member.steps} steps</Text>
          </View>
        ))
      )}
      {!isLoading && leaderboard && (
        <Text style={styles.totalSteps}>Total Team Steps: {leaderboard.teamTotalSteps}</Text>
      )}
    </ScrollView>
  );
};

export default LeaderboardScreen;
