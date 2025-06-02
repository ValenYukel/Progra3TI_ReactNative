import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import firebase from 'firebase/app'
import { auth, db } from '../firebase/config'
import { FontAwesome } from '@expo/vector-icons';


export default class Publicacion extends Component {
    constructor(props){
        super(props)
        const yaLikeado = this.props.data.likes
          ? this.props.data.likes.includes(auth.currentUser.email)
          : false;
        this.state = {
            likeado: yaLikeado,
            cantLikes: this.props.data.likes ? this.props.data.likes.length : 0
        }
    }
    likePost(){
        db.collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(() => this.setState({
            likeado: true,
            cantLikes: this.state.cantLikes + 1
        }))
    }

    dislikePost(){
        db.collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => this.setState({
            likeado: false,
            cantLikes: this.state.cantLikes - 1
        }))
    }
  render() {
    const date = new Date(this.props.data.createdAt);
    return (
      <View style={styles.container}>
        <Text style={styles.email}>{this.props.data.email}</Text>
        <Text style={styles.texto}>{this.props.data.texto}</Text>
        <Text style={styles.fecha}>On {date.toDateString()}</Text>
        <Text style={styles.likes}><FontAwesome name="heart" size={16} color="#FF6B6B" /> {this.state.cantLikes}</Text>
        {
          this.state.likeado ?
          <TouchableOpacity style={styles.boton} onPress={() => this.dislikePost()}>
            <Text style={styles.botonTexto}>Dislike</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={styles.boton} onPress={() => this.likePost()}>
            <Text style={styles.botonTexto}>Like</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA', 
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#ADB5BD', 
  },
  email: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4C6EF5' 
  },
  texto: {
    fontSize: 16,
    marginBottom: 10,
    color: '#212529' 
  },
  fecha: {
    fontSize: 13,
    color: '#212529', 
    marginBottom: 5
  },
  likes: {
    fontSize: 14,
    color: '#364FC7', 
    marginBottom: 10
  },
  boton: {
    backgroundColor: '#4C6EF5', 
    padding: 10,
    alignItems: 'center',
    borderRadius: 5
  },
  botonActivo: {
    backgroundColor: '#364FC7', 
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold'
  }
});