import React, {Component} from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { auth, db } from '../firebase/config'



export default class CrearPosteo extends Component {
    constructor(props){
        super(props)
        this.state = {
            texto: '',
            error:''
        }
    }

    crearPosteo() {

      db.collection('posts')
        .add({
          texto: this.state.texto,
          email: auth.currentUser.email,
          createdAt: Date.now()
        })
        .then(() => {
          this.setState({ texto: '', error: '' });
          this.props.navigation.navigate('Home'); 
        })
        .catch(e => {
          this.setState({ error: e.message });
        });
    } 

    
  

    render(){
        return (
      <View style={styles.container}>
        <Text>Crear un nuevo posteo</Text>
        <TextInput
          placeholder="Escribe tu posteo..."
          value={this.state.texto}
          onChangeText={text => this.setState({ texto: text })}
          style={styles.input}
        />
        {this.state.error !== '' && <Text style={styles.error}>{this.state.error}</Text>}
        <TouchableOpacity style={styles.boton} onPress={() => this.crearPosteo()}>
          <Text style={styles.botonTexto}>Publicar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 20,
    backgroundColor: '#E0F7FA' 
  },
  input: { 
    borderWidth: 1,
    borderColor: '#81D4FA', 
    marginVertical: 10, 
    padding: 10, 
    minHeight: 60,
    borderRadius: 5,
    backgroundColor: '#FFFFFF' 
  },
  boton: { 
    backgroundColor: '#1976D2', 
    padding: 10, 
    alignItems: 'center', 
    borderRadius: 5 
  },
  botonTexto: { 
    color: 'white', 
    fontWeight: 'bold' 
  },
  error: { 
    color: 'red', 
    marginVertical: 5 
  }
});