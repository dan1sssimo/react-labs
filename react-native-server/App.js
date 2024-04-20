import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const serverLink = "https://raw.githubusercontent.com/dan1sssimo/react-labs/main/react-native-server/";

// TabBar Component
const TabBar = ({ setCurrentScreen }) => {
  return (
    <View style={styles.tabContainer}>
      <CustomButton title="Новини" onPress={() => setCurrentScreen('News')} />
      <CustomButton title="Галерея" onPress={() => setCurrentScreen('Gallery')} />
      <CustomButton title="Авторизація" onPress={() => setCurrentScreen('Login')} />
    </View>
  );
};

// CustomButton Component
const CustomButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const GalleryScreen = ({ setCurrentScreen }) => {
  const [images, setImages] = useState([])

  const uploadImages = async()=>{
    const res = await fetch(serverLink+"gallery.json");
    const {data}= await res.json();
    setImages(data);
  }

  useEffect(
    ()=>{
      uploadImages()
    },
    []
  )

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.galleryContainer}>
        {images.map((image) => {
          return (
            <TouchableOpacity key={image.id}>
              <Image source={{uri: serverLink+image.link}} style={styles.galleryImage} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const NewsScreen = ({ setCurrentScreen }) => {
  const [news, setNews] = useState([])

  const uploadNews = async()=>{
    const res = await fetch(serverLink+"news.json");
    const {data}= await res.json();
    setNews(data);
  }

  useEffect(
    ()=>{
      uploadNews();
    },
    []
  )

  return (
    <View style={styles.newsContainer}>
      <ScrollView>
        {news.map((item, index) => (
          <View key={item.id} style={styles.newsItem}>
            <Image source={{uri: serverLink+item.image}} style={styles.newsImage} />
            <View style={styles.newsTextContainer}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const LoginScreen = ({ setCurrentScreen }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleLogin = () => {
    // Logic for user authentication
    console.log('Вхід в систему: ', username, password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Реєстрація</Text>
        <TextInput
          placeholder="Пошта"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Ім'я користувача"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Пароль"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TextInput
          placeholder="Пароль(ще раз)"
          secureTextEntry
          value={password2}
          onChangeText={setPassword2}
          style={styles.input}
        />
        <Button title="Зареєструватись" onPress={handleLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  galleryImage: {
    width: 150,
    height: 150,
    margin: 5,
  },
  newsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  newsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  newsImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  newsTextContainer: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 16,
    color: 'black',
  },
  formContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('News');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'News':
        return <NewsScreen setCurrentScreen={setCurrentScreen} />;
      case 'Gallery':
        return <GalleryScreen setCurrentScreen={setCurrentScreen} />;
      case 'Login':
        return <LoginScreen setCurrentScreen={setCurrentScreen} />;
      default:
        return <NewsScreen setCurrentScreen={setCurrentScreen} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TabBar setCurrentScreen={setCurrentScreen} />
      {renderScreen()}
    </View>
  );
};

export default App;
