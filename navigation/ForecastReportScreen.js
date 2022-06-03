import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import WeatherScrollInDay from '../components/WeatherScrollInDay';
import WeatherScrollInWeek from '../components/WeatherScrollInWeek';
import DateTime from '../components/DateTime'

export default function ForecastReportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forecast Report</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.today}>Today</Text>
        <DateTime style={styles.date} />
      </View>
      <View>
        <WeatherScrollInDay />
      </View>
      <View style={styles.forecastContainer}>
        <Text style={styles.titleList}>Next forecast</Text>
        <Image source={require('../assets/img/list.png')} style={[{height: 30},{width: 30}]} />
      </View>
        <WeatherScrollInWeek />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060720',
    marginTop: 30
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '400',
    paddingTop: 30,
    alignSelf: 'center',
  },
  date: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '100',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  today: {
    color: '#edeffe',
    fontSize: 20,
    fontWeight: '500',
  },
  forecastContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
    marginBottom: 30,
  },
  titleList: {
    color: '#edeffe',
    fontSize: 20,
    fontWeight: '500',
  },
});
