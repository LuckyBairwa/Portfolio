import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {themes} from '../styles/theme';
import { ActivityIndicator } from 'react-native';

const THEME_STORAGE_KEY = 'selectedTheme';

const ThemeContext = createContext({
  theme: themes.neonGreen,
  setTheme: (themeName: keyof typeof themes) => {},
});

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState(themes.neonGreen);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);


  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme && themes[savedTheme as keyof typeof themes]) {
          setTheme(themes[savedTheme as keyof typeof themes]);
        }
      } catch (error) {
        console.log('Failed to load theme:', error);
      }
      finally {
        setIsThemeLoaded(true);
      }
    };
    loadTheme();
  }, []);

  const changeTheme = async (themeName: keyof typeof themes) => {
    const selectedTheme = themes[themeName];
    setTheme(selectedTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, themeName);
    } catch (error) {
      console.log('Failed to save theme:', error);
    }
  };

  if (!isThemeLoaded) {
    return <ActivityIndicator size="large" color={theme.primary} />;
  }

  return (
    <ThemeContext.Provider value={{theme, setTheme: changeTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
