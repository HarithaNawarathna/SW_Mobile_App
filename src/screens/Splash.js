import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'

const Splash = (props_splash) => {
  const stack = props_splash.navigation;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigateToLogin();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  function navigateToLogin() {
    stack.replace('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 60,
        color: '#F6BD0F',
        marginTop: 200,
        marginRight: 1,
        fontWeight: 'bold',
        lineHeight: 59,
      }}>{'Epic\nEventify'}
      </Text>
      <View style={{ 
        flexDirection: 'row',
        marginTop: 300,
        marginLeft: 40,
      }}> 
        <Text style={{
          fontSize: 20,
          color: '#C69CD1',
        }}>
          Powered by
        </Text>
        <Image
          source={require('../../assets/img/hasthiya.png')}
          style={{
            width: 40,
            height: 40,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: '#F6BD0F',
            marginLeft: 10,   
          }}
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
});
