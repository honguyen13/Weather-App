import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreen from './HomeScreen'
import ForecastReportScreen from './ForecastReportScreen'
import PickLocationScreen from './PickLocationScreen'

const homeName = 'Home'
const forecastName = 'Forecast'
const pickName = 'Pick'
const settingsName = 'Settings'

const Tab = createBottomTabNavigator();

export default function MainContainer(){
  return(
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={ ({route}) => ({
            tabBarIcon: ({focused, color, size}) =>{
              let iconName;
              let rn = route.name;
              if (rn===homeName){
                iconName = focused ? 'home' : 'home-outline'
              }else if(rn===forecastName) {
                iconName = focused ? 'list' : 'list-outline'
              }else if(rn===pickName) {
                iconName = focused ? 'search' : 'search-outline'
              }else if(rn===settingsName) {
                iconName = focused ? 'settings' : 'settings-outline'
              }
              return <Ionicons name={iconName} size={size} color={color}/>
            },
        })
      } 
      tabBarOptions = {{
        activeTintColor: 'white',
        inactiveTintColor: '#ccc',
        activeBackgroundColor:'#060720',
        inactiveBackgroundColor:'#060720',
        style: {
            borderTopColor: '#060720',
            borderTopWidth: 0,
            elevation: 0,   // for Android
            shadowOffset: {
              width: 0, height: 0 // for iOS
              },
            }
      }}
      >
        <Tab.Screen name={homeName} component={HomeScreen} options={{headerShown: false}}/>
        <Tab.Screen name={forecastName} component={ForecastReportScreen} options={{headerShown: false}} />
        <Tab.Screen name={pickName} component={PickLocationScreen} options={{headerShown: false}} />
        {/* <Tab.Screen name={settingsName} component={SettingScreen} options={{headerShown: false}} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}



