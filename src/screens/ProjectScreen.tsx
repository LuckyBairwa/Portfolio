import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import Animated, {FadeInUp} from 'react-native-reanimated';

type ProjectCategory = 'Frontend' | 'Mobile';
const categories: ProjectCategory[] = ['Frontend', 'Mobile'];

const projectData: Record<
  ProjectCategory,
  Array<{
    name: string;
    description: string;
    technologies: string[];
    image?: string;
    github?: string;
    liveDemo?: string;
  }>
> = {
  Frontend: [
    {
      name: 'Portfolio Website',
      description: 'A personal portfolio built with React.js & Tailwind CSS.',
      technologies: ['React.js', 'Tailwind CSS'],
      github: 'https://github.com/example/portfolio',
      liveDemo: 'https://example.com',
    },
    {
      name: 'Currency Converter',
      description: 'A currency converter using an API.',
      technologies: ['React.js', 'Tailwind CSS', 'API'],
      github: 'https://github.com/example/ecommerce',
    },
  ],
  Mobile: [
    {
      name: 'Portfolio App',
      description: 'A Portfolio app with animations.',
      technologies: ['React Native', 'React Native Reanimated'],
      github: 'https://github.com/example/chatapp',
    },
  ],
};

const {width} = Dimensions.get('window');

const ProjectScreen: React.FC = () => {
  const {theme} = useTheme();
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>('Frontend');

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Animated.Text
          entering={FadeInUp.duration(800)}
          style={[styles.heading, {color: theme.themeColor}]}>
          📂 Projects & Work
        </Animated.Text>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}>
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

        {/* Projects List */}
        <View style={styles.projectsList}>
          {projectData[selectedCategory].map((project, index) => (
            <Animated.View
              key={project.name}
              entering={FadeInUp.delay(index * 150).duration(500)}
              style={[styles.projectCard, {borderColor: theme.themeColor}]}>
              {project.image && (
                <Image
                  source={{uri: project.image}}
                  style={styles.projectImage}
                />
              )}
              <Text style={[styles.projectTitle, {color: theme.themeColor}]}>
                {project.name}
              </Text>
              <Text style={styles.projectDescription}>
                {project.description}
              </Text>
              <View style={styles.techList}>
                {project.technologies.map(tech => (
                  <Text key={tech} style={styles.techBadge}>
                    {tech}
                  </Text>
                ))}
              </View>
              {project.github && (
                <TouchableOpacity
                  onPress={() => console.log('GitHub:', project.github)}
                  activeOpacity={0.7}>
                  <Text style={styles.link}>🔗 GitHub</Text>
                </TouchableOpacity>
              )}
              {project.liveDemo && (
                <TouchableOpacity
                  onPress={() => console.log('Live:', project.liveDemo)}
                  activeOpacity={0.7}>
                  <Text style={styles.link}>🌍 Live Demo</Text>
                </TouchableOpacity>
              )}
            </Animated.View>
          ))}
        </View>

        {/* Timeline Section */}
        <Text style={[styles.heading, {color: theme.themeColor}]}>
          📜 Project Journey Timeline
        </Text>
        <View style={styles.timeline}>
          {[
            '2024: Portfolio Website',
            '2024: Currency Converter',
            '2025: Mobile Portfolio App',
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
  projectsList: {
    width: '100%',
    marginVertical: 25,
  },
  projectCard: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#39FF14',
    shadowOpacity: 0.6,
    shadowRadius: 10,
    borderWidth: 2,
    width: width * 0.9,
  },
  projectImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  projectDescription: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 8,
  },
  techList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  techBadge: {
    fontSize: 14,
    color: '#fff',
    backgroundColor: '#444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    margin: 3,
  },
  link: {
    fontSize: 16,
    color: '#3FC1C9',
    marginTop: 5,
    textDecorationLine: 'underline',
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

export default ProjectScreen;
