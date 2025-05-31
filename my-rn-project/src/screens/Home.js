import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase/app';


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
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
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
        <Text style={styles.title}> Home - PuppyGram </Text>

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
              <View style={styles.posteo}>
                <Text style={styles.posteoAuthor}>
                  {item.data.owner ? item.data.owner : 'Anónimo'}
                </Text>

                <Text style={styles.posteoContent}>{item.data.texto}</Text>

                <Text style={styles.posteoLikes}>
                  Likes: {item.data.likes ? item.data.likes.length : 0}
                </Text>

                <TouchableOpacity
                  style={styles.likeButton}
                  onPress={() =>
                    this.cambioLike(item.id, item.data.likes ? item.data.likes : [])
                  }
                >
                  <Text style={styles.likeButtonText}>
                    {item.data.likes && item.data.likes.includes(auth.currentUser.email)
                      ? 'Dislikear': 'Likear'}
                  </Text>
                </TouchableOpacity>
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
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center',
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
  },
  likeButton: {
    backgroundColor: 'pink',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  likeButtonText: {
    color: 'black',
  },
});