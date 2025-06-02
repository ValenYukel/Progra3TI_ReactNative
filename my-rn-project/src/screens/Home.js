import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase/app';
import Publicacion from '../components/Publicacion';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],
      loading: true,
    };
  }

  componentDidMount() {
    db.collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((docs, idx) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
            idx: idx,
          });
        });
        this.setState({
          posteos: posts,
          loading: false,
        });
      });
  }

  cambioLike(postId, actualLikes) {
    const userEmail = auth.currentUser.email;
    if (actualLikes.includes(userEmail)) {
      db.collection('posts').doc(postId).update({
        likes: firebase.firestore.FieldValue.arrayRemove(userEmail),
      });
    } else {
      db.collection('posts').doc(postId).update({
        likes: firebase.firestore.FieldValue.arrayUnion(userEmail),
      });
    }
  }


   render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> PuppyGram </Text>

        {this.state.loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color='pink' />
            <Text>Cargando posteos recientes...</Text>
          </View>
        ) : (
          <FlatList
            data={this.state.posteos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                
                <Publicacion
                  data={item.data}
                  id={item.id}
                  idx={item.idx}
                  /> 

              </View>
            )}
          />
        )}
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  padding: 20,
  backgroundColor: '#E0F7FA', 
},
title: {
  fontSize: 24,
  marginBottom: 15,
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#1976D2', 
},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  posteo: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  posteoAuthor: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  posteoContent: {
    marginBottom: 10,
  },
  posteoLikes: {
    marginBottom: 5,
  }
});