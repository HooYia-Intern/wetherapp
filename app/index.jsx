import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
//import { NavigationContainer, useNavigation } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import OpenWeatherMap from 'react-native-openweathermap'; // Assurez-vous de l'installer

const API_KEY = '3445155d854560da7207e6df0df6260c'; // Remplacez par votre clé API OpenWeatherMap

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
 // const navigation = useNavigation();

  const getWeather = async () => {
    try {
      const response = await OpenWeatherMap.fetchCurrentWeather({
        zip: city,
        APPID: API_KEY,
        units: 'metric', 
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      setWeatherData(null); // Mettre null pour indiquer une erreur
    }
  };
                            
  useEffect(() => {
    if (city) {
      getWeather();
    }
  }, [city]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Météo</Text>
      <TextInput
        style={styles.input}
        placeholder="Saisir une ville"
        onChangeText={setCity}
        value={city}
      />
      <Button title="Obtenir la météo" onPress={getWeather} />
      {weatherData ? (
        <View style={styles.weather}>
          <Text style={styles.weatherText}>Ville: {weatherData.name}</Text>
          <Text style={styles.weatherText}>Température: {weatherData.main.temp}°C</Text>
          <Text style={styles.weatherText}>Description: {weatherData.weather[0].description}</Text>
          <Button
            title="Voir les détails"
            onPress={() => navigation.navigate('Details', { weatherData })} 
          />
        </View>
      ) : (
        <Text style={styles.weatherText}>Veuillez saisir une ville.</Text>
      )}
    </View>
  );
};

const DetailsScreen = ({ route }) => {
  const { weatherData } = route.params; 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de la météo</Text>
      {weatherData ? (
        <View style={styles.weather}>
          <Text style={styles.weatherText}>Ville: {weatherData.name}</Text>
          <Text style={styles.weatherText}>Température: {weatherData.main.temp}°C</Text>
          <Text style={styles.weatherText}>Description: {weatherData.weather[0].description}</Text>
          {/* Affichez d'autres détails ici */}
        </View>
      ) : (
        <Text style={styles.weatherText}>Aucune donnée météo.</Text>
      )}
    </View>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 15,
  },
  weather: {
    marginTop: 20,
  },
  weatherText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default App;
