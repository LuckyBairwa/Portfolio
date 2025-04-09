import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import Animated, {FadeInUp} from 'react-native-reanimated';

type SkillCategory = 'Programming' | 'Frontend' | 'Game Dev' | 'Mobile';
const categories: SkillCategory[] = ['Programming', 'Frontend', 'Game Dev', 'Mobile'];

const skillsData: Record<SkillCategory, string[]> = {
  Programming: ['C', 'C++', 'JavaScript', 'Python', 'C#'],
  Frontend: ['React.js', 'HTML', 'CSS', 'JavaScript', 'TypeScript (Basics)', 'Tailwind CSS'],
  'Game Dev': ['Unity', 'C#'],
  Mobile: ['React Native', 'React Native Reanimated', 'React Native Navigation'],
};

const {width} = Dimensions.get('window');

const SkillsScreen: React.FC = () => {
  const {theme} = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('Programming');

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Heading */}
        <Animated.Text
          entering={FadeInUp.duration(800)}
          style={[styles.heading, {color: theme.themeColor}]}>
          💡 Skills & Technologies
        </Animated.Text>

        {/* Category Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.7}>
              <Text
                style={[
                  styles.tab,
                  selectedCategory === category && {
                    color: theme.themeColor,
                    borderBottomColor: theme.themeColor,
                  },
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Skills List */}
        <View style={styles.skillsList}>
          {skillsData[selectedCategory].map((skill, index) => (
            <Animated.View
              key={skill}
              entering={FadeInUp.delay(index * 100).duration(500)}
              style={[styles.skillBadge, {borderColor: theme.themeColor}]}>
              <Text style={styles.skillText}>{skill}</Text>
            </Animated.View>
          ))}
        </View>

        {/* Timeline Section */}
        <Text style={[styles.heading, {color: theme.themeColor}]}>📜 Skill Journey Timeline</Text>
        <View style={styles.timeline}>
          {[
            '2022: C & C++',
            '2023: Web Dev Basics',
            '2024: React JS',
            '2024: Basics of PHP & Python',
            '2025: React Native & C#',
          ].map((milestone, index) => (
            <Animated.Text
              key={milestone}
              entering={FadeInUp.delay(index * 200).duration(600)}
              style={styles.timelineItem}>
              {milestone}
            </Animated.Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  tab: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 2,
    color: '#ffffff',
  },
  skillsList: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 25,
  },
  skillBadge: {
    backgroundColor: '#222',
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    alignItems: 'center',
    shadowColor: '#39FF14',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    borderWidth: 2,
    width: width * 0.8,
  },
  skillText: {
    fontSize: 16,
    color: '#fff',
  },
  timeline: {
    marginTop: 15,
    alignItems: 'center',
  },
  timelineItem: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
  },
});

export default SkillsScreen;
