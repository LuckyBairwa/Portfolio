import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from '../context/ThemeContext';

const AboutScreen: React.FC = () => {
  const {theme} = useTheme();
  const fade = useSharedValue(0);
  const translateX = useSharedValue(-200);

  useEffect(() => {
    fade.value = withTiming(1, {duration: 1500});
    translateX.value = withSpring(0, {damping: 10, stiffness: 80});
  }, []);

  const fadeAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <Animated.View
        style={[
          styles.aboutContainer,
          fadeAnimation,
          {borderColor: theme.themeColor},
        ]}>
        <Text style={[styles.heading, {color: theme.themeColor}]}>
          About Me
        </Text>
        <Text style={styles.text}>
          Hey there! I'm Lucky, a Full-Stack Developer, Tech Enthusiast, and
          Educator passionate about building innovative solutions. With
          expertise in React, and Tailwind CSS, I love creating engaging digital
          experiences that make an impact.
        </Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.aboutContainer,
          fadeAnimation,
          {borderColor: theme.themeColor},
        ]}>
        <Text style={[styles.heading, {color: theme.themeColor}]}>
          Education & Background
        </Text>
        <Text style={styles.text}>🎓 BCA - University of Rajasthan</Text>
        <Text style={styles.text}>🏆 Participated in multiple Hackathons</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.aboutContainer,
          fadeAnimation,
          {borderColor: theme.themeColor},
        ]}>
        <Text style={[styles.heading, {color: theme.themeColor}]}>
          Projects
        </Text>
        <Text style={styles.text}>
          🚀 I strive to develop intelligent, user-friendly applications.
        </Text>
        <Text style={styles.text}>
          💡 My goal is to build user-friendly, and optimized websites for
          making easy everyday life.
        </Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.aboutContainer,
          fadeAnimation,
          {borderColor: theme.themeColor},
        ]}>
        <Text style={[styles.heading, {color: theme.themeColor}]}>
          Hobbies & Interests
        </Text>
        <Text style={styles.text}>
          🎵 Love music, tech innovations, and coding.
        </Text>
        <Text style={styles.text}>
          📚 Always exploring AI, and Next-Gen Web Technologies.
        </Text>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1f',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  aboutContainer: {
    marginBottom: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: '#39FF14',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    width: '100%',
    minHeight: 150, // Ensures proper scrolling
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    marginBottom: 20,
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
    paddingLeft: 15,
  },
});

export default AboutScreen;
