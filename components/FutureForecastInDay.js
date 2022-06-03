import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import moment from 'moment-timezone'

const CurrentItemInHour = ({data}) => {
    if(data && data.weather){
        const img = {uri: "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"}
        return (
          <View style={[styles.scrollViewItem, { backgroundColor: '#1b86e6'}]}>
            <Image source={img} style={styles.scrollViewItemIcon} />
            <View style={styles.scrollViewItemValue}>
            <Text style={styles.time}>{moment(data.dt * 1000).hour()}:00</Text>
            <Text style={styles.temp}>{Math.round(data.temp)}&#176;C</Text>
            </View>
          </View>
        );
    }else{
        return( 
            <View>
            </View>
        )
    }
}

const FutureForecastItemInHour = ({data}) => {
  const img = {uri: "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"}
  return (
    <View style={[styles.scrollViewItem, { backgroundColor: '#12122b' }]}>
      <Image source={img} style={styles.scrollViewItemIcon} />
      <View style={styles.scrollViewItemValue}>
          <Text style={styles.time}>{moment(data.dt * 1000).hour()}:00</Text>
          <Text style={styles.temp}>{Math.round(data.temp)}&#176;C</Text>
      </View>
    </View>
  );
};

const FutureForecastInDay = ({data}) => {
    return (
        <View style={{flexDirection: 'row'}}>
            {data && data.length > 0 ? data.map((data, idx) => (
                    idx == 0 ? <CurrentItemInHour key={idx} data={data} /> : idx < 24 && <FutureForecastItemInHour key={idx} data={data}/>
                ))
                :
                <View/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
  scrollViewItem: {
    flexDirection: 'row',
    backgroundColor: '#1b86e6',
    width: 120,
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  scrollViewItemIcon: {
    height: 50,
    width: 50,
  },
  scrollViewItemValue: {
    paddingLeft: 10,
  },
  time: {
    color: '#f4f6ff',
    fontSize: 14,
    fontWeight: '400',
  },
  temp: {
    color: '#f6f6ff',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default FutureForecastInDay;
