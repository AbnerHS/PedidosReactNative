import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, TouchableOpacity, View, FlatList, BackHandler} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import url from '../utils/url';
import styles from './style';
import io from 'socket.io-client';

const socket = io(url);

export default function Home({ navigation }){
    const backAction = () => {return true;};
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                  onPress={()=>logout()}
                  >
                  <Icon name="log-out-outline"  size={30}/>
                </TouchableOpacity>
              )
        });
        navigation.addListener('focus', () => {
            getPedidos();
        });
        socket.on('novoPedido', getPedidos);
        return () => socket.off('novoPedido');
    }, []);

    const [pedidos, setPedidos] = useState(null); 

    async function getPedidos(){
        let response = await fetch(input=url+"pedidosCozinha",
            init={
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        let json = await response.json();
        setPedidos(json);
    }

    async function logout(){
        try{
            await AsyncStorage.removeItem("login");
            await AsyncStorage.removeItem("senha");
            navigation.popToTop();
        } catch(e) {
            console.log(e);
        }
      }

    function tempo (item){
        let saida, min, hora, dia, mes;
        min = parseInt(Math.abs(new Date()-new Date(item.createdAt))/(1000*60));
        saida = min+" minuto(s)";
        if(min > 59){
            hora = parseInt(min/60);
            saida = hora+" hora(s)";
        }
        if(hora > 23){
            dia = parseInt(hora/24);
            saida = dia+" dia(s)";
        }
        if(dia > 30){
            mes = parseInt(dia/30);
            saida = mes+" mês(es)";
        }
        return saida;
    }
    
    function status(item){
        if(item.status == 0)
            return 'Pendente';
        else if(item.status == 1)
            return 'Em preparação';
        else if(item.status == 2)
            return 'Finalizado';
    }

    let t,s;

    const Pedido = ({ item }) => (
        t = tempo(item),
        s = status(item),
        <View style={styles.viewPedido}>
            <TouchableOpacity
                onPress={()=>{
                    navigation.navigate('Pedido',{id: item.id, status: item.status})
                }}
            > 
            <View style={styles.containerPedido}>
                <Text style={styles.textoPedido}>{t}</Text>
                <Text style={styles.textoPedido}>Mesa: {item.mesa}</Text>
                <Text style={styles.textoPedido}>{s}</Text>
            </View>
            </TouchableOpacity>
        </View>
    );
    
    const renderPedidos = ({ item }) => {
        return (
            <Pedido
                item={item}
                style={{width: '100%'}}
            />
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={{width:'100%'}}  
                data={pedidos}
                renderItem={renderPedidos}
                
            />
        </View>
    );
}