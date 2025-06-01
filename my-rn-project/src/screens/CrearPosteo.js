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
    if (this.state.texto.trim() !== '') {
      db.collection('posts')
        .add({
          texto: this.state.texto,
          email: auth.currentUser.email,
          createdAt: Date.now()
        })
        .then(() => {
          this.setState({ texto: '', error: '' });
        })
        .catch(e => {
          this.setState({ error: e.message });
        });
    } else {
      this.setState({ error: 'El posteo no puede estar vacío.' });
    }
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
  padding: 20 
  },
  input: { 
  borderWidth: 1,
  borderColor: 'pink', 
  marginVertical: 10, 
  padding: 10, 
  minHeight: 60 
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
 },
  error: { 
  color: 'red', 
  marginVertical: 5 
 }
});
