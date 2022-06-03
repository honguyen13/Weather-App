import React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';

const InforItem = ({ title, value, unit }) => {
  return (
    <View style={styles.inforItemContainer}>
      <Text style={styles.inforItemTitle}>{title}</Text>
      <Text style={styles.inforItemValue}>{value}{unit}</Text>
    </View>
  );
};

const WeatherData = ({data}) => {
  if (data){
    const img = {uri: "http://openweathermap.org/img/wn/"+data.icon+"@2x.png"}
    return (
      <View>
      <Image source={img} style={styles.weatherIcon} />
      <View style={styles.weatherDataContainer}>
          <InforItem title="Temp" value={data.temp} unit="&#176;C" />
          <InforItem title="Wind" value={data.wind} unit="m/s" />
          <InforItem title="Humidity" value={data.humidity} unit="%" />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  weatherDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    paddingHorizontal: 30,
  },
  inforItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inforItemTitle: {
    color: '#82829b',
    fontSize: 14,
    paddingVertical: 10,
  },
  inforItemValue: {
    color: '#f6f6ff',
    fontSize: 16,
  },
  weatherIcon: {
    height: 240,
    width: 240,
    alignSelf: 'center',
  },
});

export default WeatherData;
