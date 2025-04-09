import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import SkillScreen from '../screens/SkillScreen';
import ProjectScreen from '../screens/ProjectScreen';
import ContactScreen from '../screens/ContactScreen';
import SettingScreen from '../screens/ThemeSwitcherScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import {useTheme} from '../context/ThemeContext';

export type RootStackParamList = {
  Home: undefined;
  Skills: undefined;
  Projects: undefined;
  About: undefined;
  Contact: undefined;
  Setting: undefined;
  Login: undefined;
  Signup: undefined;
  Main: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TabNavigator: React.FC = () => {
  const {theme} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#0f0f1f',
          height: 65,
        },
        tabBarLabelStyle: {fontSize: 13, fontWeight: 'bold', marginBottom: 4},
        tabBarActiveTintColor: theme.primary,
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        },
        tabBarInactiveTintColor: '#ffffff',
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Contact" component={ContactScreen} />

      <Tab.Screen name="Skills" component={SkillScreen} />
      <Tab.Screen name="Projects" component={ProjectScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

const RootNavigator: React.FC = () => {
  const naviagtion = useNavigation<NavigationProp>();
  const {isAuthenticated, isLoading} = useContext(AuthContext);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        naviagtion.reset({
          index: 0,
          routes: [{name: 'Main'}],
        });
      } else {
        naviagtion.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      }
    }
  }, [isLoading, isAuthenticated, naviagtion]);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name="Main" component={TabNavigator} />

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
