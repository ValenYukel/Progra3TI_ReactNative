import React, {Component} from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { auth, db } from '../firebase/config'
import { FontAwesome } from '@expo/vector-icons';



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
        <Text style={styles.titulo}>Nuevo Post</Text>
        <TextInput
          placeholder="Escribe tu posteo..."
          value={this.state.texto}
          onChangeText={text => this.setState({ texto: text })}
          style={styles.input}
        />
        {this.state.error !== '' && <Text style={styles.error}>{this.state.error}</Text>}
        <TouchableOpacity style={styles.boton} onPress={() => this.crearPosteo()}>
          <FontAwesome name="share" size={24} color="white" />
          <Text style={styles.botonTexto}>Publicar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 32,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4C6EF5',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 1,
  },
  input: { 
    borderWidth: 1,
    borderColor: '#ADB5BD',
    marginVertical: 12,
    padding: 16,
    minHeight: 100,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 17,
    color: '#212529',
    textAlignVertical: 'top'
  },
  boton: { 
    backgroundColor: '#4C6EF5',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
    shadowColor: '#364FC7',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  botonTexto: { 
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
  },
  error: { 
    color: '#FF6B6B',
    marginVertical: 8,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});