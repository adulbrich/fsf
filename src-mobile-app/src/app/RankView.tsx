import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import RankItem from '../../src/app/RankItem';
import TeamItem from '../../src/app/TeamItem';
import React from 'react';

/**
 * 
 * Rank view - details of the rank
 * 
 * @returns
 */
export default function RankView() {

  const [flag, setFlag] = React.useState(true); // default person rank

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

  const teamItems = [
    {
      rank: 1,
      name: '@FitJess26',
      leaves: 80,
    },
    {
      rank: 2,
      name: '@RunDavid23 (me)',
      leaves: 76,
    },
    {
      rank: 3,
      name: '@SamWalks19',
      leaves: 68,
    },
    {
      rank: 4,
      name: '@ChrisStrides16',
      leaves: 60,
    }
  ]

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {/* segment */}
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', width: 100, textAlign: 'center', color: flag ? '#007AFF' : 'black' }} onPress={() => {
            setFlag(true);
          }}>Rank</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', width: 100, textAlign: 'center', color: !flag ? '#007AFF' : 'black' }} onPress={() => {
            setFlag(false);
          }}>Team</Text>
        </View>
      </View>
      <ScrollView>
        {
          flag ? "" : <View style={{ flexDirection: "row", justifyContent: 'space-between'}}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Total</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>284 leaves</Text>
          </View>
        }
        {
          flag ? rankItems.map((item) => (
            <RankItem
              key={item.rank}
              rank={item.rank}
              name={item.name}
              score={item.score}
            />
          )) : teamItems.map((item) => (
            <TeamItem
              key={item.rank}
              rank={item.rank}
              name={item.name}
              leaves={item.leaves}
            />
          ))
        }
      </ScrollView>
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