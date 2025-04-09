import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {RootStackParamList} from '../navigation/RootNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthContext} from '../context/AuthContext';
import {useTheme} from '../context/ThemeContext';
import Tts from 'react-native-tts';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  Tts.setDefaultLanguage('en-IN');
  Tts.setDefaultRate(0.3);
  Tts.setDefaultPitch(1.0);
  Tts.setDucking(true);
  Tts.setIgnoreSilentSwitch('ignore');

  const {theme} = useTheme();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const {signIn} = useContext(AuthContext);

  const handleLogin = async () => {
    if (identifier && password) {
      const result = await signIn(identifier.trim(), password);
      if (result.success && result.username?.trim()) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
        Tts.speak(`Welcome ${result.username}`);
      } else {
        Alert.alert('Login Failed', 'Please enter valid credentials');
      }
    } else {
      Alert.alert('Invalid Input', 'Please enter both identifier and password');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.headerText, { color: theme.primary }]}>Log In</Text>
      <TextInput
        placeholder="Email or Username"
        style={[
          styles.input,
          {
            borderColor: theme.primary,
            color: theme.text,
            backgroundColor: theme.inputBackground,
          },
        ]}
        keyboardType="default"
        autoCapitalize="none"
        value={identifier}
        onChangeText={setIdentifier}
        placeholderTextColor={theme.placeholder}
      />
      <TextInput
        placeholder="Password"
        style={[
          styles.input,
          {
            borderColor: theme.primary,
            color: theme.text,
            backgroundColor: theme.inputBackground,
          },
        ]}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={theme.placeholder}
      />
      <TouchableOpacity style={[styles.btn, { backgroundColor: theme.primary }]} onPress={handleLogin}>
        <Text style={[styles.btnText, { color: theme.buttonText }]}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={[styles.linkText, { color: theme.link }]}>Create new account? Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          ToastAndroid.show('Ye functionality abhi available nahi hai!', ToastAndroid.SHORT)
        }>
        <Text style={[styles.linkText, { color: theme.link }]}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#000',
  },
  btn: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    backgroundColor: '#056edd',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007aff',
    marginTop: 16,
  },
});

export default LoginScreen;
