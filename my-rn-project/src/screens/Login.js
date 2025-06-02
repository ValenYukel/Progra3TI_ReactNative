import React, {Component} from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { auth, db } from '../firebase/config'


export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password: '',
            error: ''
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            console.log(user)
            if(user){
                this.props.navigation.navigate('Tab')
            }
        })
    }

    login(email, password){
        if(email !== '' && password !== ''){
            auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate('Tab')
            })
            .catch(err)
            this.setState({ error: 'Email o contraseña incorrectos. Por favor, intente nuevamente.' });
        } else {
      this.setState({ error: 'Por favor, complete ambos campos.' });
    }
    }

      render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>LogIn</Text>

        <TextInput
          style={styles.input}
          placeholder='Email'
          keyboardType='email-address'
          onChangeText={(text) => this.setState({ email: text })}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
        />

        {this.state.error !== '' ? (
          <Text style={styles.error}>{this.state.error}</Text>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.login(this.state.email, this.state.password)}
          >
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Register')} 
          >
          <Text style={styles.link}>¿No tienes cuenta aún? Regístrate para comenzar!!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  link: {
    marginTop: 15,
    color: 'black',
    textAlign: 'center',
  },
});