import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import FutureForecastInDay from '../components/FutureForecastInDay'

const API_KEY = process.env.REACT_APP_API_KEY;

export default function WeatherScrollToday() {
  const [data, setData] = useState({});
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("21.028511", "105.804817")
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [])

  const fetchDataFromApi = (latitude, longitude) => {
    if (latitude && longitude) {
      fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=daily,minutely&units=metric&appid=" + API_KEY).then(res => res.json())
        .then((data) => {
          // console.log(data)
          setData(data.hourly);
        })
    }
  }
  return (
    <ScrollView horizontal={true} style={styles.scrollViewContainer}>
      <FutureForecastInDay data={data} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    marginLeft: 20,
  },
});
