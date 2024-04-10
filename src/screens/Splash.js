import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateToLogin();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  function navigateToLogin() {
    navigation.replace('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Epic\nEventify'}</Text>
      <View style={styles.poweredByContainer}>
        <Text style={styles.poweredByText}>Powered by</Text>
        <Image
          source={require('../../assets/img/hasthiya.png')}
          style={styles.poweredByIcon}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#401971',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 60,
    color: '#F6BD0F',
    marginTop: 200,
    marginRight: 1,
    fontWeight: 'bold',
    lineHeight: 59,
  },
  poweredByContainer: {
    flexDirection: 'row',
    marginTop: 300,
  },
  poweredByText: {
    fontSize: 20,
    color: '#C69CD1',
  },
  poweredByIcon: {
    width: 40,
    height: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#F6BD0F',
    marginLeft: 10,
  },
});
