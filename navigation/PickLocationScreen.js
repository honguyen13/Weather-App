import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const API_KEY = process.env.REACT_APP_API_KEY;

const WeatherItemSearching = ({ data }) => {
  if (data && data.icon) {
    const img = { uri: "http://openweathermap.org/img/wn/" + data.icon + "@2x.png" }
    return (
      <View style={styles.weatherLocationContainer}>
        <View style={styles.valueAndImageContainer}>
          <View style={styles.value}>
            <Text style={styles.temp}>{data.temp}&#176;C</Text>
            <Text style={styles.statusWeather}>{data.status}</Text>
          </View>
          <Image source={img} style={[{ height: 80 }, { width: 80 }]} />
        </View>
        <Text style={styles.location}>{data.cityName}</Text>
      </View>
    )
  } else {
    return (
      <View></View>
    )
  }
};

const PickLocationScreen = () => {
  const [data, setData] = useState({});           
  const [location, setLocation] = useState({});    

  const fetchData = (city) => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=Metric&appid=" + API_KEY).then(res => res.json())
      .then((data) => {
        setData({
          temp: Math.floor(data.main.temp),
          status: data.weather[0].main,
          cityName: data.name,
          icon: data.weather[0].icon,
        })
      })
  }

  useEffect(() => {
    fetchData(location)
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick location</Text>
      <Text style={styles.subtitle}>
        Find the area or city that you want to know the detailed weather info at
        this time
      </Text>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Image
            source={require('../assets/img/place.png')}
            style={styles.placeIcon}
          />
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Search"
            placeholderTextColor="#78779a"
            onChangeText={(x) => setLocation(x)}
          />
        </View>
        <TouchableOpacity
          style={styles.seachButtonBorder}
          activeOpacity={0.3}
          onPress={() => {
            fetchData(location)
          }}
        >
          <Image
            source={require('../assets/img/icon-menu/search-icon.png')}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      <WeatherItemSearching data={data ? data : {}} />
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
  subtitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '100',
    textAlign: 'center',
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#23214b',
    height: 60,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
  },
  placeIcon: {
    height: 30,
    width: 30,
    margin: 10,
  },
  input: {
    height: 40,
    width: '70%',
    color: '#FFF',
    fontSize: 16,
  },
  seachButtonBorder: {
    backgroundColor: '#23214b',
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  searchIcon: {
    height: 30,
    width: 30,
  },
  weatherLocationContainer: {
    height: 130,
    width: '42%',
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: '#1b86e6',
  },
  valueAndImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 5,
  },
  temp: {
    color: '#e6ffff',
    fontSize: 24,
    fontWeight: '400',
  },
  statusWeather: {
    color: '#e6ffff',
    fontSize: 14,
    fontWeight: '100',
  },
  location: {
    color: '#e6ffff',
    fontSize: 24,
    fontWeight: '200',
    marginLeft: 15,
  },
});

export default PickLocationScreen;
