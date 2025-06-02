import { View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../firebase/config'
import Publicacion from '../components/Publicacion'
import { FontAwesome } from '@expo/vector-icons'


export default class Perfil extends Component {
  constructor(props){
    super(props)
    this.state = {
      posteos: [],
      usuario: ''
    }
  }

  componentDidMount(){
    db.collection('posts')
    .where('email', '==', auth.currentUser.email)
    .onSnapshot((docs) => {
      let posts = [];
      console.log('Documentos obtenidos:', docs.docs);
      docs.forEach((doc) => posts.push({
        id: doc.id,
        data: doc.data()
      }))

      posts.sort((a, b)=> b.data.createdAt- a.data.createdAt )
      this.setState({
        posteos: posts
      })
    })
    db.collection('users')
      .where('email', '==', auth.currentUser.email).onSnapshot((docs) => {
        if(docs.docs === undefined) {
          this.setState({
            usuario: '...',
            })
          return
        }else{
        this.setState({
          usuario: docs.docs[0].data().usuario
        })
        }
    })
  }
  borrarPosteo(id){
    db.collection('posts').doc(id).delete()
    .catch(e => console.log('Error al eliminar el posteo', e))
  }

  logout(){
    auth.signOut()
    .then(()=> this.props.navigation.navigate('LogIn'))
    .catch(e => console.log('error en signout', e))
  }
  
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>{this.state.usuario}</Text>
        <Text style={styles.email}>{auth.currentUser.email}</Text>

        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 10 }}>
              <Publicacion id={item.id} data={item.data} />
              <TouchableOpacity style={styles.botonBorrar} onPress={() => this.borrarPosteo(item.id)}>
                <FontAwesome name="trash" size={14} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity style={styles.boton} onPress={() => this.logout()}>
          <FontAwesome name="sign-out" size={20} color="white" />
          <Text style={styles.botonTexto}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA', 
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
    alignSelf: 'center'
  },
  email: {
    fontSize: 16,
    color: '#1976D2',
    marginBottom: 20,
    alignSelf: 'center'
  },
  boton: {
    backgroundColor: '#1976D2',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  botonBorrar: {
    backgroundColor: '#FF6B6B', 
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
});