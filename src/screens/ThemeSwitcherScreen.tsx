import React, {useContext, useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {themes} from '../styles/theme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {AuthContext} from '../context/AuthContext';
import {RootStackParamList} from '../navigation/RootNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Theme {
  name: keyof typeof themes;
  color: string;
}

type SettingScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Setting'
>;

interface SettingScreenProps {
  navigation: SettingScreenNavigationProps;
}

const ThemeSwitcher: React.FC<SettingScreenProps> = ({navigation}) => {
  const translateY = useSharedValue(1500);
  const {signOut} = useContext(AuthContext);

  useEffect(() => {
    translateY.value = withSpring(0, {damping: 10, stiffness: 80});
  }, [translateY]);

  const bottomToTop = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          await signOut();
          navigation.replace('Login');
        },
      },
    ]);
  };

  const {theme, setTheme} = useTheme();
  const themes: Theme[] = [
    {name: 'neonGreen', color: '#39FF14'},
    {name: 'neonRed', color: '#FF3131'},
    {name: 'neonBlue', color: '#0AB9F2'},
    {name: 'neonPurple', color: '#9D00FF'},
    {name: 'neonPink', color: '#FF10F0'},
    {name: 'neonOrange', color: '#FF6700'},
    {name: 'neonMagenta', color: '#FF00FF'},
    {name: 'neonTurquoise', color: '#30D5C8'},
    {name: 'neonViolet', color: '#8F00FF'},
    {name: 'neonGold', color: '#FFD700'},
    {name: 'neonLime', color: '#CCFF00'},
    {name: 'neonYellow', color: '#FFFF00'},
    {name: 'neonCyan', color: '#00FFFF'},
  ];

  return (
    <Animated.View style={[styles.container]}>
      <TouchableOpacity
        style={[styles.logoutTopRight, {backgroundColor: theme.primary}]}
        onPress={handleLogout}>
        <Text style={[styles.logoutText, {color: 'black'}]}>Logout</Text>
      </TouchableOpacity>

      <Animated.Text style={[styles.title, {color: '#ffffff'}, bottomToTop]}>
        Choose Your Theme
      </Animated.Text>

      <Animated.View style={[styles.themeList, bottomToTop]}>
        {themes.map(({name, color}) => (
          <TouchableOpacity
            key={name}
            style={[
              styles.themeButton,
              {
                backgroundColor: theme?.background || '#222',
                borderColor: color,
              },
              theme?.name === name && styles.activeTheme,
            ]}
            onPress={() => setTheme(name)}>
            <Text style={[styles.themeText, {color}]}>
              {' '}
              {name.replace('neon', '')}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0f1f',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  themeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  themeButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    margin: 8,
  },
  themeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  activeTheme: {
    borderWidth: 2,
    borderColor: '#FFF',
    shadowColor: '#FFF',
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  logoutTopRight: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#FF3131',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    zIndex: 999,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ThemeSwitcher;
