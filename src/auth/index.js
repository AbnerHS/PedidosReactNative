import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style.js';
import url from '../utils/url.js';

export default function Login({ navigation }){

    const [login, setLogin] = useState(null);
    const [senha, setSenha] = useState(null);
    const [mensagem, setMensagem] = useState(null);

    async function acessar(){
        if(login != null && senha != null){
            if(login.length > 0 && senha.length > 0){
                let response = await fetch(input=url+"loginCozinha",
                    init = {
                        method: "POST",
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(value={
                            login: login,
                            senha: senha
                        })
                    }
                );
                let json = await response.json();
                if(json == 'erro'){
                    setMensagem('Telefone ou senha inválido(s)!');
                } else {
                    setMensagem(null);
                    try{
                        await AsyncStorage.setItem("id", JSON.stringify(json.id));
                        await AsyncStorage.setItem("login", json.login);
                        await AsyncStorage.setItem("senha", json.senha);
                        navigation.navigate("Home");
                    } catch(e){
                        console.log(e);
                    }
                }
            } else {
                setMensagem('Preencha o Telefone e a Senha!');    
            }
        } else {
            setMensagem('Preencha o Telefone e a Senha!');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Seja bem vindo!</Text>
            <Text style={[{display: mensagem ? 'flex':'none'},styles.mensagem]}>{mensagem}</Text>
            <Text style={styles.label}>Login:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={setLogin}
            />
            <Text style={styles.label}>Senha:</Text>
            <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                onChangeText={setSenha}
            />
            <TouchableOpacity
                style={styles.botao}
                onPress={()=>acessar()}>
                <Text style={styles.textoBotao}>Acessar</Text>    
            </TouchableOpacity>
        </View>
    );
}