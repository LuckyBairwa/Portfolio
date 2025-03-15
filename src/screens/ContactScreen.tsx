  import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Linking,
    ToastAndroid,
  } from 'react-native';
  import React from 'react';
  import {useTheme} from '../context/ThemeContext';
  import {MotiView} from 'moti';

  const ContactScreen: React.FC = () => {
    const {theme} = useTheme();

    // Function to open links
    const openLink = (url: string) => {
      Linking.openURL(url).catch(err =>
        console.error('Error opening link:', err),
      );
    };

    return (
      <ScrollView
        style={[
          styles.container,
          {backgroundColor: theme?.background || '#1B1F3B'},
        ]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <MotiView
          from={{opacity: 0, scale: 0.5}}
          animate={{opacity: 1, scale: 1}}
          transition={{type: 'timing', duration: 1500}}
          style={styles.content}>
          {/* 🟢 Get In Touch Section */}
          <View style={[styles.section, {borderColor: theme.themeColor}]}>
            <Text style={[styles.heading, {color: theme?.themeColor}]}>
              🚀 Get In Touch
            </Text>
            <Text style={styles.text}>
              Have a project in mind, or just want to connect? I'm always open to
              new collaborations and opportunities! Feel free to reach out.
            </Text>
          </View>

          {/* 📧 Email Section */}
          <View style={[styles.section, {borderColor: theme.themeColor}]}>
            <Text style={[styles.heading, {color: theme?.themeColor}]}>
              📧 Email
            </Text>
            <Text style={styles.infoText}>luckyshairwal@gmail.com</Text>
          </View>

          {/* 📍 Location Section */}
          <View style={[styles.section, {borderColor: theme.themeColor}]}>
            <Text style={[styles.heading, {color: theme?.themeColor}]}>
              📍 Location
            </Text>
            <Text style={styles.infoText}>Jaipur, Rajasthan, India</Text>
          </View>

          {/* 💬 Social Media Section */}
          <View style={[styles.section, {borderColor: theme.themeColor}]}>
            <Text style={[styles.heading, {color: theme?.themeColor}]}>
              💬 Social Media
            </Text>

            <View style={styles.linkBtnContainer}>
              <TouchableOpacity
                style={styles.linkBtn}
                onPress={() => openLink('https://github.com/luckybairwa')}>
                <Text style={styles.linkBtnText}> GitHub</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkBtn}
                onPress={() =>
                  openLink('https://www.linkedin.com/in/lucky-bairwa')
                }>
                <Text style={styles.linkBtnText}>LinkedIn</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkBtn}
                onPress={() =>
                  openLink(
                    'https://www.facebook.com/profile.php?id=100088888142992',
                  )
                }>
                <Text style={styles.linkBtnText}>FaceBook</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkBtn}
                onPress={() =>
                  openLink('https://www.instagram.com/lucky.shairwal/')
                }>
                <Text style={styles.linkBtnText}>InstaGram</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkBtn}
                onPress={() =>
                  openLink('https://wa.me/message/374W3LURETPSI1?src=qr')
                }>
                <Text style={styles.linkBtnText}>WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer Message */}
          <Text style={styles.footerText}>
            Want to message me directly? Use the contact form below! 👇
          </Text>
          <TouchableOpacity
                style={[styles.contactBtn, {borderColor: theme.themeColor}]}
                onPress={() =>ToastAndroid.show('Contact form not available at this time!',ToastAndroid.LONG)
                }>
                <Text style={[styles.contactBtnText, {color: theme.themeColor}]}>Contanct Form</Text>
              </TouchableOpacity>
        </MotiView>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingVertical: 20,
      alignItems: 'center',
    },
    content: {
      width: '90%',
      backgroundColor: '#0f0f1f',
      padding: 20,
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.5,
      shadowRadius: 5,
      alignItems: 'center',
    },
    section: {
      width: '100%',
      backgroundColor: '#14142b',
      padding: 15,
      borderRadius: 10,
      borderWidth: 2,
      marginBottom: 15,
      alignItems: 'center',
    },
    heading: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    text: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '500',
      textAlign: 'center',
    },
    infoText: {
      fontSize: 16,
      color: '#3FC1C9',
      fontWeight: '500',
      textAlign: 'center',
    },
    linkBtnContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap', 
      justifyContent: 'center',
      marginTop: 10,
    },
    linkBtn: {
      backgroundColor: '#22254B', 
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 8,
      margin: 5,
      alignItems: 'center',
    },
    linkBtnText: {
      fontSize: 16,
      color: '#3FC1C9',
      fontWeight: 'bold',
    },
    footerText: {
      fontSize: 16,
      color: '#fff',
      marginTop: 15,
      textAlign: 'center',
    },
    contactBtn: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginTop: 10,
      alignItems: 'center',
      borderWidth: 2,
    },
    contactBtnText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
  });

  export default ContactScreen;
