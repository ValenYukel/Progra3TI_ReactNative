import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'


export default class Publicacion extends Component {
    constructor(props){
        super(props)
        this.state = {
            likeado: false,
            cantLikes: this.props.data.likes ? this.props.data.likes.length : 0
        }
    }
    likePost(){
        db
        .collection('posts')
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
        db
        .collection('posts')
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
    return (
      <View>
        <Text>{this.props.data.email}</Text>
        <Text>{this.props.data.texto}</Text>
        <Text>Publicado: {this.props.data.createdAt}</Text>
        <Text>Likes: {this.state.cantLikes}</Text>
        {
            this.state.likeado ?
            <TouchableOpacity
                onPress={() => this.dislikePost()}
            >
                <Text>
                    Dislike
                </Text>
            </TouchableOpacity>
            :
            <TouchableOpacity
                onPress={() => this.likePost()}
            >
                <Text>
                    Like
                </Text>
            </TouchableOpacity>
        }
      </View>
    )
  }
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffe4ec',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    email: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#e75480'
    },
    texto: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333'
    },
    fecha: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5
    },
    likes: {
        fontSize: 14,
        color: '#e75480',
        marginBottom: 10
    },
    boton: {
        backgroundColor: 'pink',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5
    },
    botonTexto: {
        color: 'white',
        fontWeight: 'bold'
    }
});