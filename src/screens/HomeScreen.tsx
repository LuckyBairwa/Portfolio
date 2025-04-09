import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import {useTheme} from '../context/ThemeContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootNavigator';

const HomeScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const scale = useSharedValue(1);
  const fade = useSharedValue(0);

  const username = 'Lucky';
  const getGreetingMessage = (name: string) => {
    const hour = new Date().getHours();
    let greeting = 'Good Morning';
    if (hour >= 12 && hour < 18) {
      greeting = 'Good Afternoon';
    } else if (hour >= 18) {
      greeting = 'Good Evening';
    } else {
      greeting = 'Good Night';
    }
    return `${greeting}, ${name}`;
  };

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.18, {duration: 1000, easing: Easing.inOut(Easing.ease)}),
      -1,
      true,
    );
    fade.value = withRepeat(
      withTiming(1, {duration: 2000, easing: Easing.inOut(Easing.ease)}),
      1,
      true,
    );
  }, [scale, fade]);

  const pulseAnimation = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const fadeAnimation = useAnimatedStyle(() => {
    return {
      opacity: fade.value,
    };
  });

  const downloadResume = () => {
    ToastAndroid.show('Resume not available!', ToastAndroid.SHORT);
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.greetingContainer, {borderColor: theme.primary}]}>
        <Text style={[styles.greetingText, {color: theme.primary}]}>{getGreetingMessage(username)}</Text>
      </View>
      <Animated.View
        style={[
          styles.imageContainer,
          pulseAnimation,
          {borderColor: theme.themeColor},
        ]}>
        <Image
          source={require('../assets/5.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      </Animated.View>
      <Text style={styles.title}>
        Hey, I'm Lucky Welcome to my{' '}
        <Text style={{color: theme.themeColor}}>Portfolio!</Text>
      </Text>
      <Text style={styles.subtitle}>
        Full-Stack Developer | Tech Enthusiast | Educator |
      </Text>

      <Text style={styles.bio}>
        Passionate about Web & App Development, AI, and Teaching.
      </Text>
      <Animated.View style={[styles.btnContainer, fadeAnimation]}>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: theme.themeColor}]}
          onPress={() => navigation.navigate('Skills')}>
          <Text style={[styles.btnText]}>Skills</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, {backgroundColor: theme.themeColor}]}
          onPress={() => navigation.navigate('Projects')}>
          <Text style={[styles.btnText]}>Projects</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, {backgroundColor: theme.themeColor}]}
          onPress={() => navigation.navigate('About')}>
          <Text style={[styles.btnText]}>About Me</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, {backgroundColor: theme.themeColor}]}
          onPress={() => navigation.navigate('Contact')}>
          <Text style={[styles.btnText]}>Contact</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, {backgroundColor: theme.themeColor}]}
          onPress={() => navigation.navigate('Setting')}>
          <Text style={[styles.btnText]}>Theme</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.btnContainer, fadeAnimation]}>
        <TouchableOpacity
          style={[styles.btnOutliner, {borderColor: theme.themeColor}]}
          onPress={downloadResume}>
          <Text style={[styles.btnOutlinerText, {color: theme.themeColor}]}>
            Download Resume
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1f',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  greetingContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#39FF14',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 50,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 32,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 30,
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    fontFamily: 'Roboto, sans-serif',
    marginBottom: 20,
    textAlign: 'center',
  },
  bio: {
    fontSize: 14,
    color: '#cccccc',
    fontFamily: 'Roboto, sans-serif',
    textAlign: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    margin: 5,
    width: 120,
  },
  btnText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnOutliner: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  btnOutlinerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default HomeScreen;
