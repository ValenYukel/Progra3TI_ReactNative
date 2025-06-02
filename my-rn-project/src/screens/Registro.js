import React, {Component} from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { auth, db } from '../firebase/config'

class Registro extends Component {
    constructor(props){
        super(props)
        this.state = {
            contra: '',
            usuario: '',
            email:'',
            error:''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.props.navigation.navigate('Tab')
            }
        })
    }

    registrarUsuario(email, contra, usuario){
         console.log('Intentando registrar:', email, usuario);
        if(
            (
                email !== '' &&
                contra !== '' &&
                usuario !== ''
            )
        ){
          auth.createUserWithEmailAndPassword(email, contra)
          .then(() => {

            db.collection('users')
            .add({
                email: email.toLowerCase(),
                usuario: usuario
            })
            .then(() => {
                this.setState({ error: '' }); 
                auth.signOut();
                this.props.navigation.navigate('LogIn');
            });

          })
          .catch(error => {
            this.setState({ error: error.message }) ; 
        });
    }
    }

    render(){
            console.log('Usuario actual:', auth.currentUser);
            console.log(this.state.error);
        return(
            <View style={styles.container}>
            <Text style={styles.titulo}>Registro</Text>
            <TextInput
                value={this.state.email}
                onChangeText={(text) => this.setState({email: text})}
                keyboardType='default'
                style={styles.input}
                placeholder="Email"
            />
            <TextInput
                value={this.state.contra}
                onChangeText={(text) => this.setState({contra: text})}
                keyboardType='default'
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
            />
            <TextInput
                value={this.state.usuario}
                onChangeText={(text) => this.setState({usuario: text})}
                keyboardType='default'
                style={styles.input}
                placeholder="Nombre de usuario"
            />
            {this.state.error !== '' && (
                <Text style={styles.error}>{this.state.error}</Text> 
            )}
            <TouchableOpacity style={styles.boton} onPress={()=> this.registrarUsuario(this.state.email, this.state.contra, this.state.usuario)}>
                <Text style={styles.botonTexto}>Registrar usuario</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('LogIn')}>
                <Text style={styles.link}>Ir al login</Text>
            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    padding: 24,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 20,
    alignSelf: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'white',
    fontSize: 16
  },
  boton: {
    backgroundColor: 'blue',
    padding: 14,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  error: {
    color: 'red',
    marginBottom: 10,
    alignSelf: 'center'
  },
  link: {
    color: 'blue',
    textAlign: 'center',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10
  }
});
export default Registro