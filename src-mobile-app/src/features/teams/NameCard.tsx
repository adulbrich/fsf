import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CardProps {
  name: string;
  steps: number;
}

// Use either named or default export, not both unless necessary
const Card: React.FC<CardProps> = ({ name, steps }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.stepsText}>{steps}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: '90%',
    margin: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    borderColor: "black",
    borderWidth: 1,
    height: 50,
  },
  title: {
    
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 15,
    
  },
  stepsText: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 15,
    marginTop: 15,
    color: "#D73F09",
  },
  
});

export default Card; // You can also export like this: export { Card };
