import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView , Image } from 'react-native';

import { useState , useEffect } from 'react';

import MapView , {Marker} from "react-native-maps"
import * as Location from 'expo-location';

export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [longitude,setLongitude]=useState(null);
  const [latitude,setLatitude]=useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);
  
  return (
    <SafeAreaView>
      <MapView style={styles.map}
       showsUserLocation={true}
      >
        <Marker coordinate={{
          longitude:longitude ? longitude : 0,
          latitude:latitude ? latitude : 0,
        }}>
          <Image style={styles.mapImage} source={require("../assets/tree.jpg")}/>
        </Marker>
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapImage:{
    width:29,
    height:29,
    borderRadius:50,
    resizeMode:"contain"
  }
});
