import { Text, View, Image, StyleSheet } from 'react-native'
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
        .collection('users')
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
        .collection('users')
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
        <Text>{this.props.dataEstudiante.nombre}</Text>
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



