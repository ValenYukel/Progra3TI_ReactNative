import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, {Component} from 'react'
import { auth, db } from '../firebase/config'
//import Usuario from '../components/Usuario'
import Publicacion from '../components/Publicacion'

export default class Perfil extends Component {
  constructor(props){
    super(props)
    this.state = {
      usuarios: []
    }
  }

  componentDidMount(){
    db.collection('users').orderBy('createdAt', 'desc').onSnapshot((docs) => {
      let arrDocs = [];
      docs.forEach((doc) => arrDocs.push({
        id: doc.id,
        data: doc.data()
      }))
      this.setState({
        usuarios: arrDocs
      }, () => console.log('este es el state', this.state))
    })
  }

  logout(){
    auth.signOut()
    .then(()=> this.props.navigation.navigate('Register'))
    .catch(err => console.log('err en signout', err))
  }
  
  render(){
    return (
      <View>
        <Text>MI Perfil</Text>
        <Text>{auth.currentUser.email}</Text>
        <Text>{auth.currentUser.owner}</Text>

        <FlatList
          data={this.state.publicaciones}
          keyExtractor={(item) =>  item.id.toString()}
          renderItem = {({ item }) => <Publicacion id={item.id} data={item.data} /> }
        />


        <TouchableOpacity onPress={() => this.logout()}>
          <Text>Cerrar Sesion</Text>
        </TouchableOpacity>
      </View>
    )
  }
}