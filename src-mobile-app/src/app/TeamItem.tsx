import React from "react";
import { StyleSheet, View, Text } from "react-native";

/**
 * Team Item Component
 */

type TeamItemProps = {
    rank: number; // Team Item Number
    name: string; // Team Item Name / Text
    leaves: number; // Team Item Score
}

export default function TeamItem(props: TeamItemProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.rank}>{props.rank}</Text>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.score}>{props.leaves}</Text>
        </View>
    );
}

// style
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      marginBottom: 10,
    },
    rank: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 20,
    },
    score: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

