import React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import moment from 'moment-timezone'

const CurrentWeather = ({data}) => {
    if(data && data.weather){
        const img = {uri: "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"}
        return (
          <View style={[styles.nextForecastContainer,{backgroundColor: '#1b86e6'}]}>
          <View style={styles.dateForecastContainer}>
            <Text style={styles.onDay}>{moment(data.dt * 1000).format('dddd')}</Text>
            <Text style={styles.onMon}>{moment(data.dt * 1000).format('MMM')}, {moment(data.dt * 1000).format('DD')}</Text>
          </View>
            <View>
              <Text style={styles.temp}>{Math.round(data.temp.min)}&#176; - {Math.round(data.temp.max)}&#176;</Text>
            </View>
            <Image source={img} style={[{width: 80},{height: 80}]} />
          </View>
        );
    }else{
        return( 
            <View></View>
        )
    }
}

const FutureForecastItemInDay = ({forecastItem}) => {
  const img = {uri: "http://openweathermap.org/img/wn/"+forecastItem.weather[0].icon+"@2x.png"}
  return (
    <View style={[styles.nextForecastContainer,{backgroundColor: '#12122b'}]}>
      <View style={styles.dateForecastContainer}>
        <Text style={styles.onDay}>{moment(forecastItem.dt * 1000).format('dddd')}</Text>
        <Text style={styles.onMon}>{moment(forecastItem.dt * 1000).format('MMM')}, {moment(forecastItem.dt * 1000).format('DD')}</Text>
      </View>
      <View>
        <Text style={styles.temp}>{Math.round(forecastItem.temp.min)}&#176; - {Math.round(forecastItem.temp.max)}&#176;</Text>
      </View>
      <Image source={img} style={[{width: 80},{height: 80}]} />
    </View>
  );
};

const FutureForecastInWeek = ({data}) => {
    return (
        <View>
            {data && data.length > 0 ? data.map((item, idx) => (
                    idx == 0 ? <CurrentWeather key={idx} data={item} /> :  <FutureForecastItemInDay key={idx} forecastItem={item}/>
                ))
                :
                <View/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
  nextForecastContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 80,
    borderRadius: 30,
    marginLeft: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  dateForecastContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    width: '30%',
  },
  onDay: {
    color: '#edeffe',
    fontSize: 14,
    fontWeight: '400',
  },
  onMon: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '100',
  },
  temp: {
    color: '#fdfeff',
    fontSize: 22,
    fontWeight: '100',
  },
});

export default FutureForecastInWeek;