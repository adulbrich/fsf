import { StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

/**
 * 
 * Home view
 * 
 * @returns
 */
export default function HomeView() {

  return (
    <View style={styles.container}>
      <View style={{ ...styles.row, alignItems: 'center' }}>
        <Image source={require('../../assets/images/OSU_Logo.png')} resizeMode='contain' style={{ width: 300, height: 50, marginLeft: -60, flexDirection: 'row', justifyContent: 'flex-start' }} />
        <Text style={{ fontSize: 18 }}>
          Faculty Staff Fitness
        </Text>
      </View>
      <View style={styles.lines}></View>
      <Text style={styles.title}>Walktober 2023</Text> 
      <View style={styles.lines}></View>
      <Text style={styles.tip}>13 days remaining</Text>
      <View style={styles.row}>
        <Text>Daily Progress(steps)</Text>
        <Text>2 out of 3 leaves</Text>
      </View>
      <View style={styles.process}>
        <View style={styles.percent}></View>
        <View style={{ position: 'absolute', left: '10%', backgroundColor: 'black', top: -20, width: 1, height: 40 }}></View>
        <View style={{ position: 'absolute', left: '16%', top: -20, height: 40, flexDirection: 'row' }}>
          <Image source={require('../../assets/images/leaf.png')} style={{ width: 20, height: 20 }} />
          <Text style={{ fontSize: 12 }}>
            3000
          </Text>
        </View>
        <View style={{ position: 'absolute', left: '30%', backgroundColor: 'black', top: -20, width: 1, height: 40 }}></View>
        <View style={{ position: 'absolute', left: '36%', top: -20, height: 40, flexDirection: 'row' }}>
          <Image source={require('../../assets/images/leaf.png')} style={{ width: 20, height: 20 }} />
          <Text style={{ fontSize: 12 }}>
            6000
          </Text>
        </View>
        <View style={{ position: 'absolute', left: '50%', backgroundColor: 'black', top: -20, width: 1, height: 40 }}></View>
        <View style={{ position: 'absolute', left: '80%', top: -20, height: 40, flexDirection: 'row' }}>
          <Image source={require('../../assets/images/leaf.png')} style={{ width: 20, height: 20 }} />
          <Text style={{ fontSize: 12 }}>
            12,000
          </Text>
        </View>
        <View style={{ position: 'absolute', left: '95%', backgroundColor: 'black', top: -20, width: 1, height: 40 }}></View>
      </View>
      {/* The app must display a leaderboard of step counts among team members within the current event. */}
      <Text style={styles.title1}>My Team</Text>
      <View style={styles.lines}></View>
      {/* Participants should be able to access the leaderboard easily from within the appThe total step counts for the whole team is shown. */}
      <View style={{ ...styles.row }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>FootstepsUnited</Text>
        <View style={{ flexDirection: 'row' }}>
          <Image source={require('../../assets/images/leaf.png')} style={{ width: 20, height: 20 }} />
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            284 leaves
          </Text>
        </View>
      </View>
      <View style={styles.col}>
        <View style={styles.row}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>1. @FitJess26</Text>
          <Text>80 leaves</Text>
        </View>
        <View style={{ ...styles.row }}>
          <Text style={{ fontSize: 16, marginBottom: 10, fontWeight: 'bold' }}>2. @RunDavid23 (me)</Text>
          <Text style={{ fontWeight: 'bold' }}>76 leaves</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>3. @SamWalks19</Text>
          <Text>68 leaves</Text>
        </View>
        <View style={styles.row}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>4. @ChrisStrides16</Text>
          <Text>60 leaves</Text>
        </View>
      </View>
      <View style={{
        flexDirection: 'row',
        height: 40,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        boxShadow: '0 0 10px #ccc',
        marginBottom: 20,
        padding: 10,
      }}>
        <Ionicons name='bar-chart' color='gray' size={20}/>
        <TextInput
          placeholder='How are other teams doing?'
          style={{ marginLeft: 10, minWidth: 400 }}
        ></TextInput>
      </View>

      <Text style={styles.title1}>My Activities</Text>
      <View style={styles.lines}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  col: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title1: {
    fontSize: 20,
  },
  tip: {
    fontSize: 16,
    marginBottom: 10,
    color: '#c64b24',
    fontWeight: 'bold'
  },
  lines: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
    marginTop: 10,
    marginBottom: 10,
  },
  process: {
    width: '100%',
    height: 15,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 15,
  },
  percent: {
    width: '60%',
    height: 15,
    backgroundColor: '#c64b24',
    borderRadius: 10,
  }
});