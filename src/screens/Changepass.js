import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function Changepassfield(propschangepassfield) {

  const stack = propschangepassfield.stack;

  return (
    <View>
      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        height: 35,
        width: 300,
        marginHorizontal: 45,
        justifyContent: 'center',
        paddingLeft: 20,
        marginTop: 20,
        marginBottom: 40,

      }}>
        <TextInput
          placeholder='Enter Old Password'
          placeholderTextColor={'#000000'}
          style={{
            fontSize: 18,
            opacity: 0.5
          }}
        />
      </View>

      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        height: 35,
        width: 300,
        marginHorizontal: 45,
        justifyContent: 'center',
        paddingLeft: 20,
        marginTop: 20,
        marginBottom: 40,

      }}>
        <TextInput
          placeholder='Enter New Password'
          placeholderTextColor={'#000000'}
          style={{
            fontSize: 18,
            opacity: 0.5
          }}
        />
      </View>

      <View style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        height: 35,
        width: 300,
        marginHorizontal: 45,
        justifyContent: 'center',
        paddingLeft: 20,
        marginTop: 20,
        marginBottom: 40,

      }}>
        <TextInput
          placeholder='Confirm Password'
          placeholderTextColor={'#000000'}
          style={{
            fontSize: 18,
            opacity: 0.5
          }}
        />
      </View>
      <BottomButtons3 stack={stack} />
    </View>
  )
}

function BottomButtons3(propsbottombuttons3) {

  const stack = propsbottombuttons3.stack;

  function gotoeditacc(){
    stack.navigate('Editacc')
  }

  return (
    <View style={{
      flexDirection: 'row',
      marginHorizontal: 20,
      marginBottom: 112,
    }}>

      <TouchableOpacity onPress={gotoeditacc}>
      <View style={{
        backgroundColor: '#F6BD0F',
        height: 40,
        width: 150,
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 4,

      }}>
        <Text style={{
          fontSize: 25,
          color: '#000000',
          textAlign: 'center'
        }}>
          Cancel
        </Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={gotoeditacc}>
        <View style={{
          backgroundColor: '#F6BD0F',
          height: 40,
          width: 150,
          justifyContent: 'center',
          borderRadius: 20,
          marginHorizontal: 20,
          marginTop: 20,

        }}>
          <Text style={{
            fontSize: 25,
            color: '#000000',
            textAlign: 'center'
          }}>
            Save
          </Text>
        </View>
      </TouchableOpacity>

    </View>
  );
}

const Changepass = (propschangepass) => {

  const stack = propschangepass.stack;

  return (
    <KeyboardAwareScrollView>
    <View style={styles.container}>

      <Text style={{
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 20,
        marginTop: 80,
      }}>
        Change Password
      </Text>
      <Image
        source={require('../../assets/img/userprofile.png')}
        style={{
          width: 150,
          height: 150,
          borderRadius: 100,
          borderWidth: 4,
          borderColor: '#F6BD0F',
          marginBottom: 30,
        }}
      />
      <Changepassfield stack={stack} />
    </View>

    </KeyboardAwareScrollView>
  )
}

export default Changepass

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#401971',
    alignItems: 'center',
  },
})