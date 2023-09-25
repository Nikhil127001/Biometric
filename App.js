import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useState } from 'react';


export default function App() {

  // const [isHardwareExists ,setIsHardwareExists] = useState(false);

  const fallBackToDefaultAuth = () => {
    console.log('falling back to passcode auth')
  }

  const AlertComponent = (title,message,btnTxt,btnFunc) => {
    return Alert.alert(title , message, [{
      text : btnTxt,
      onPress : btnFunc,
    }
  ]);
  };

  const TwoButtonAlerr = () => 
    Alert.alert('Welcome To App', 'Subscribe Now',[{
      text : 'Back',
      onPress : () => console.log('cancel Pressed')
    },
    {
      text : 'OK',
      onPress : () => console.log('OK Pressed')
    },
  ])

  const handleBiometricAuth = async() => {
    const isbiometricExists = await LocalAuthentication.hasHardwareAsync();
  
    if(!isbiometricExists)
      return AlertComponent(
        'Please Enter Your Password',
        'Biometric Auth not Supported',
        'OK',
        () => fallBackToDefaultAuth()
      );

      let supportedbiometrics;
      if(isbiometricExists)
        supportedbiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();

        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        if(!savedBiometrics)
          return AlertComponent(
        'Biometric record Not found',
        'Please Login with password',
        'Ok',
        () => fallBackToDefaultAuth()
        );
    

    const BiometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage : 'Login With Biometrics',
      cancelLabel : 'cancel',
      disableDeviceFallback: true,
    })

    if(BiometricAuth.success){
      TwoButtonAlerr()};
      console.log({isbiometricExists});
      console.log({supportedbiometrics});
      console.log({savedBiometrics});
      console.log({BiometricAuth})
  };

  return (
    <View style={styles.container}>
      <Button title='handle' onPress={() => {handleBiometricAuth()}}></Button>
      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
