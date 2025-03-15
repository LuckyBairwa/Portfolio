import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import SkillScreen from '../screens/SkillScreen';
import ProjectScreen from '../screens/ProjectScreen';
import ContactScreen from '../screens/ContactScreen';
import SettingScreen from '../screens/ThemeSwitcherScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeContext';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Skills: undefined;
  Projects: undefined;
  About: undefined;
  Contact: undefined;
  Themes: undefined
};

const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();



const RootNavigator : React.FC = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: '#0f0f1f'},
        tabBarActiveTintColor: '#39FF14',
        tabBarInactiveTintColor: '#ffffff',
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={
          {
            tabBarIcon:({color, size})=>(
              <Icon name='home' color={color} size={size} />
            )
          }
        }
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="call-sharp" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen

        name="Skills"
        component={SkillScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="code-slash-sharp" color={color} size={size} />
          ),
          // tabBarButton:()=>null,
          // tabBarStyle:{display:'none'}
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="folder-open-sharp" color={color} size={size} />
          ),
          // tabBarButton:()=>null,
          // tabBarStyle:{display:'none'}
        }}
      />
      <Tab.Screen
        name="Themes"
        component={SettingScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="toggle-sharp" color={color} size={size} />
          ),
         
        }}
      />
    </Tab.Navigator>
  );
};


// const RootNavigator: React.FC = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Main" component={TabNavigator} />
//       <Stack.Screen name="Skills" component={SkillScreen} />
//       <Stack.Screen name="Projects" component={ProjectScreen} />
//     </Stack.Navigator>
//   );
// };


export default RootNavigator;
