import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/RootNavigator';
import {AuthContext} from '../context/AuthContext';
import {useTheme} from '../context/ThemeContext';

type SignupScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'Signup'
>;

interface SignupScreenProps {
  navigation: SignupScreenNavigationProps;
}

const SignupScreen: React.FC<SignupScreenProps> = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const {signUp} = useContext(AuthContext);
  const {theme} = useTheme();



  const isValidEmail = (email: string) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };



  const handleSignup = async () => {
    if (!username) {
      Alert.alert('Invalid Input', 'Please enter a username');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    const success = await signUp(username.trim(), email, password);

    if (success) {
      Alert.alert('Sign Up Success', 'Registered successfully');
      setUsername('');
      setEmail('');
      setPassword('');
      navigation.navigate('Login');
    } else {
      Alert.alert('Sign Up Failed', 'Please check your details and try again');
    }
    setLoading(false);

    
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Text style={[styles.headerText, {color: theme.primary}]}>Sign Up</Text>
      <TextInput
        placeholder="Username"
        style={[styles.input, {color: theme.text, borderColor: theme.primary, backgroundColor: theme.inputBackground}]}
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={theme.placeholder}
      />
      <TextInput
        placeholder="Email"
        style={[styles.input, {color: theme.text, borderColor: theme.primary, backgroundColor: theme.inputBackground}]}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={theme.placeholder}
      />
      <TextInput
        placeholder="Password"
        style={[styles.input, {color: theme.text, borderColor: theme.primary, backgroundColor: theme.inputBackground}]}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={theme.placeholder}
      />
      {/* <TouchableOpacity
        style={[styles.btn, {backgroundColor: theme.primary}]}
        onPress={handleSignup}>
        <Text style={[styles.btnText, {color: theme.text}]}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.linkText, {color: theme.primary}]}>
          Already have an account? Log In
        </Text>
      </TouchableOpacity>
    </View> */}
    {loading ? (
        <ActivityIndicator size="large" color={theme.primary} />
      ) : (
        <TouchableOpacity style={[styles.btn, { backgroundColor: theme.primary }]} onPress={handleSignup}>
          <Text style={[styles.btnText, { color: theme.buttonText }]}>Sign Up</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.linkText, { color: theme.link }]}>
          Already have an account? Log In
        </Text>
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

export default SignupScreen;
