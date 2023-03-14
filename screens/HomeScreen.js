import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, SafeAreaView ,Image} from 'react-native';
import Location from 'react-native-location';

import DateTime from '../components/DateTime.js';
import WeatherScrollInDay from '../components/WeatherScrollInDay.js';

// const API_KEY = process.env.REACT_APP_API_KEY;

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

const HomeScreen = ({navigation}) => {
  const [data, setData] = useState({});
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("10.762622", "106.660172")
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
    if(latitude && longitude) {
      fetch("https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude+"&units=metric&appid="+API_KEY).then(res => res.json())
      .then((data) => {
          setData({
            cityName: data.name,
            countryName: data.sys.country,
            temp: Math.round(data.main.temp*10)/10, 
            wind: data.wind.speed,
            humidity: data.main.humidity,
            icon: data.weather[0].icon,
          })
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.cityName}>{data.cityName}, {data.countryName}</Text>
      <DateTime style={styles.date}/>
      <View style={styles.optionContainer}>
        <Text style={styles.optionForecast}>Forecast</Text>
        <Text style={styles.optionAirQuality}>Air quality</Text>
      </View>
      <WeatherData data={data} />
      <View style={styles.title}>
        <Text style={styles.today}>Today</Text>
        <Text style={styles.report}>View full report</Text>
      </View>
      <WeatherScrollInDay />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060720',
    marginTop: 30
  },
  cityName: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '400',
    paddingTop: 30,
    paddingBottom: 10,
    alignSelf: 'center',
  },
  date: {
      color: '#FFF',
      fontSize: 20,
      fontWeight: '100',
      alignSelf: 'center',
      paddingVertical: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  optionForecast: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '400',
    backgroundColor: '#1b86e6',
    borderRadius: 5,
    width: 120,
    height: 40,
    paddingHorizontal: 24,
    paddingVertical: 5,
  },
  optionAirQuality: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '400',
    backgroundColor: '#141741',
    borderRadius: 5,
    width: 120,
    height: 40,
    paddingHorizontal: 18,
    paddingVertical: 5,
  },
  title: {
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
  report: {
    color: '#225b9e',
    fontSize: 16,
    fontWeight: '500',
  },
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
export default HomeScreen;