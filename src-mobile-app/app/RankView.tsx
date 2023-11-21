import { StyleSheet, Text, View } from 'react-native';
import RankItem from '../components/RankItem';
import React from 'react';
import { createClient } from 'supabase/supabase-js';
import { ScrollViewStyleReset } from 'expo-router/html';

/* 
Rank view - details of the rank
*/

// Initialize Supabase client
const supabaseUrl = 'SUPABASE_URL';
const supabaseKey = 'SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Define an interface for a team member's step count
interface TeamMemberStepCount {
  id: string; // Assuming this is the primary key in the table
  name: string;
  steps: number;
}

// Define interface for leaderboard
interface Leaderboard {
  event: string;
  teamTotalSteps: number;
  teamMembers: TeamMemberStepCount[];
}

// Service class for leaderboard function
class StepCountLeaderboardService {
  private event: string;
  private leaderboard: Leaderboard;

  constructor(event: string) {
    this.event = event;
    this.leaderboard = {
      event: event,
      teamTotalSteps: 0,
      teamMembers: []
    };
  }

export default function RankView() {
  // test example data
  const rankItems = [
    {
      rank: 1,
      name: 'John',
      score: 100,
    },
    {
      rank: 2,
      name: 'Jane',
      score: 90,
    },
    {
      rank: 3,
      name: 'Jack',
      score: 80,
    },
  ];
  return (
    <View style={styles.container}>
      {rankItems.map((item) => (
        <RankItem
          key={item.rank}
          rank={item.rank}
          name={item.name}
          score={item.score}
        />
      ))}  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    padding: 10,
  },
});