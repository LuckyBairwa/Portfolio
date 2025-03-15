import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {themes} from '../styles/theme';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface Theme {
  name: keyof typeof themes;
  color: string;
}

const ThemeSwitcher: React.FC = () => {

  const translateY = useSharedValue(1500)

  useEffect(()=>{
    translateY.value = withSpring(0, {damping: 10, stiffness:80});
  },[translateY])

  const bottomToTop = useAnimatedStyle(()=>{
    return{
      transform :[{translateY: translateY.value}]
    }
  })

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
    // {name: 'neonWhite', color: '#FFFFFF'},
  ];

  return (
    <Animated.View style={[styles.container]}>
      <Animated.Text style={[styles.title, {color: '#ffffff'}, bottomToTop]}>
        Choose Your Theme
      </Animated.Text>

      <Animated.View style={[styles.themeList,bottomToTop]}>
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
    backgroundColor: '#121212',
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
});

export default ThemeSwitcher;
