import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {createContext, ReactNode, useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from './ThemeContext';

const API_URL = 'http://192.168.216.248:5000'; // API URL='http://10.0.0.2:5000' for the emulator

interface AuthContextData {
  token: string | null;
  isLoading: boolean;
  userId: string | null;
  signIn: (
    identifier: string,
    password: string,
  ) => Promise<{success: boolean; username?: string}>;
  signUp: (
    username: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  signOut: () => void;
  isAuthenticated: boolean;
  checkAuth: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {theme} = useTheme();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuth = async (): Promise<boolean> => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedToken && storedUserId) {
        setToken(storedToken);
        setUserId(storedUserId);
        setIsAuthenticated(true);
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const signUp = async (
    username: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const result = await axios.post(`${API_URL}/api/auth/register`, {
        username,
        email,
        password,
      });
      return result?.data?.success;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        console.error('Error', error.response?.data);
      }
      return false;
    }
  };

  const signIn = async (
    identifier: string,
    password: string,
  ): Promise<{success: boolean; username?: string}> => {
    try {
      const result = await axios.post(`${API_URL}/api/auth/login`, {
        identifier,
        password,
      });
      const {token, userId, success, username} = result?.data;
      if (success) {
        await AsyncStorage.setItem('token', token);
        setToken(token);
        await AsyncStorage.setItem('userId', userId);
        setUserId(userId);
        setIsAuthenticated(true);
        return {success: true, username};
      } else {
        return {success: false};
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        console.error('Error', error.response?.data);
      }
      return {success: false};
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userId');
      setIsAuthenticated(false);
      setUserId(null);
      setToken(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color={theme.primary} />;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        isLoading,
        isAuthenticated,
        checkAuth,
        signIn,
        signUp,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
