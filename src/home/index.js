import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, FlatList, BackHandler} from "react-native";
import url from '../utils/url';
import styles from './style';

export default function Home({ navigation }){
    const backAction = () => {return true;};
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        navigation.addListener('focus', () => {
            getPedidos();
        });
    }, [navigation]);

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
        else if(item.status == 3)
            return 'Pago';
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
            <TouchableOpacity
                onPress={()=>getPedidos()}
                >
                <Text style={{color:'white'}}>Pedidos</Text>
            </TouchableOpacity>
            <FlatList
                style={{width:'100%'}}  
                data={pedidos}
                renderItem={renderPedidos}
                
            />
        </View>
    );
}