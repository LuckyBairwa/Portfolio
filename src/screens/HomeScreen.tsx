import {
  Image,
  PermissionsAndroid,
  Platform,
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
import RNFS from 'react-native-fs';
import {useTheme} from '../context/ThemeContext';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/RootNavigator';

const HomeScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const scale = useSharedValue(1);
  const fade = useSharedValue(0);

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

  // const downloadResume = async () => {
  //   const fileURL =
  //     'https://drive.google.com/file/d/1HIPUVx7ZhpOu9v9xzcflqB5MJ_pxC0lQ/view?usp=sharing';
  //   const fileName = 'Lucky Bairwa.pdf';
  //   const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;

  //   try {
  //     if (Platform.OS === 'android') {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       );
  //       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
  //         ToastAndroid.show('Storage permission denied', ToastAndroid.SHORT);
  //         return;
  //       }
  //     }

  //     const download = RNFS.downloadFile({
  //       fromUrl: fileURL,
  //       toFile: path,
  //       background: true,
  //       discretionary: true,
  //       progress: (res: {bytesWritten: number; contentLength: number}) => {
  //         console.log(
  //           `Downloaded: ${(
  //             (res.bytesWritten / res.contentLength) *
  //             100
  //           ).toFixed(2)}%`,
  //         );
  //       },
  //     });

  //     await download.promise;
  //     ToastAndroid.show('Resume downloaded successfully!', ToastAndroid.SHORT);
  //     console.log('Download complete:', path);
  //   } catch (error) {
  //     console.error('Download failed:', error);
  //   }
  // };

  const downloadResume = () => {
    ToastAndroid.show('Resume not available!', ToastAndroid.SHORT);
  };

  return (
    <View style={[styles.container]}>
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
          onPress={() => navigation.navigate('Themes')}>
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

      {/* add social links from react-native-vector-icons below*/}
      {/* <Icon name="whatsapp" size={30} color="green" /> */}
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
