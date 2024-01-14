import { StyleSheet, Text, View } from 'react-native';
import RankItem from '../../components/RankItem';
import React from 'react'; 

/**
 * 
 * Rank view - details of the rank
 * 
 * @returns
 */
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