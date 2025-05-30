import React, {Component} from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { auth, db } from '../firebase/config'

//auth.onAuthStateChanged

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
        if(
            (
                email !== '' &&
                contra !== '' &&
                usuario !== ''
            )
            &&
            contra.length >= 6
            &&
            email.includes('@') 
            &&
            usuario.length > 3
        ){
          auth.createUserWithEmailAndPassword(email, contra)
          .then(() => {

            db.collection('users')
            .add({
                email: email,
                usuario: usuario
            })
            .then(() => {
                this.setState({ error: '' }); 
                this.props.navigation.navigate('Login');
            });

          })
          .catch(err => {
            this.setState({ error: err.message }); 
        });
    }
    }

    render(){
        return(
            <View>
                <TextInput
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text})}
                    keyboardType='default'
                    style={styles.input}
                />
                <TextInput
                    value={this.state.contra}
                    onChangeText={(text) => this.setState({contra: text})}
                    keyboardType='default'
                    style={styles.input}
                />
                <TextInput
                    value={this.state.usuario}
                    onChangeText={(text) => this.setState({usuario: text})}
                    keyboardType='default'
                    style={styles.input}
                />
                 {this.state.error !== '' && (
                    <Text> {this.state.error}</Text>
                )}
                <TouchableOpacity onPress={()=> this.registrarUsuario(this.state.email, this.state.contra, this.state.usuario)}>
                    <Text>Registrar usuario</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                    <Text>
                        Ir al login
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: 'pink'
    }
})

export default Registro