import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createClient } from '@supabase/supabase-js';

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

  // Fetch step data from Supabase
  async fetchStepData(): Promise<void> {
    let { data, error } = await supabase
      .from('step_counts') // table name here
      .select('*')
      .eq('event', this.event);

    if (error) {
      console.error('Error fetching step data:', error);
      return;
    }

    if (data) {
      this.leaderboard.teamMembers = data as TeamMemberStepCount[];
      this.calculateTeamTotalSteps();
      this.sortLeaderboard();
    }
  }

  // Calculate the total steps for the team
  private calculateTeamTotalSteps(): void {
    this.leaderboard.teamTotalSteps = this.leaderboard.teamMembers.reduce((total, member) => total + member.steps, 0);
  }

  // Sort the leaderboard by step count in descending order
  private sortLeaderboard(): void {
    this.leaderboard.teamMembers.sort((a, b) => b.steps - a.steps);
  }

  // Get the leaderboard data
  getLeaderboard(): Leaderboard {
    return this.leaderboard;
  }
}

// Example usage
(async () => {
  const stepCountService = new StepCountLeaderboardService('Walktouber');
  await stepCountService.fetchStepData();
  console.log(stepCountService.getLeaderboard());
})();
