import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput,TouchableHighlight } from "react-native";
import * as Location from "expo-location";

export default function App() {


  const [position, setPosition] = useState(null);

  const getPosition = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({});
      setPosition(coords);
    } catch (error) {
      console.log("getPosition -> error", error);
      setPosition(null);
    }
  };

  const entryPoint = async () => {
    try {
      const { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        getPosition();
      }
    } catch (error) {
      console.log("getPermissionAndPosition -> error", error);
    }
  };

  useEffect(() => {
    entryPoint();
  }, []);

  return (
    <View style={styles.container}>
      
      {(position && (
        <View>
           <Text style={styles.title}>Formulario</Text>
          <View>
          <TextInput
        style={styles.input}
        placeholder='Nombre'
         />
            <TextInput style={styles.input}>{position.latitude}</TextInput>
          </View>
          <View>
            <TextInput style={styles.input}>{position.longitude} </TextInput>
          </View>
          <View>
            <Button title="Enviar"/>
          </View>
        </View>
      )) || (
        <View>
          <Text>GPS Unavailable</Text>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop:30,
    paddingLeft:15,
    paddingRight:15
  
  },
  title:{
    textAlign:'center',
    
    marginBottom: 5

  },
  input:{
    height:40,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom:20

  },

});
