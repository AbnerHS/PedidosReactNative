import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, FlatList, Image, ScrollView, Modal, TextInput, BackHandler} from "react-native";
import Dialog from "react-native-dialog";
import url from '../utils/url';
import styles from './style';

export default function Pedido({ navigation, route }){
    const {id, status} = route.params;  
    const [produtos, setProdutos] = useState(null); 
    const [visible, setVisible] = useState(false);
    const [estado, setEstado] = useState(null);

    useEffect(()=>{
        navigation.addListener('focus', () => {
            getProdutos();
            setEstado(getEstado(status));
        });
    },[]);  

    function getEstado(i){
        if(i == 0)
            return 'Pendente';
        else if(i == 1)
            return 'Em preparação';
        else if(i == 2)
            return 'Finalizado';
        else if(i == 3)
            return 'Pago';
    }

    async function getProdutos(){
        let response = await fetch(input=url+"produtosPedido",
            init={
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value={
                    id: id,
                })
            }
        );
        let json = await response.json();
        setProdutos(json);
    }

    async function mudarEstado(){
        let response = await fetch(input=url+"mudarEstado",
            init={
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value={
                    id: id,
                    status: parseInt(status)+1
                })
            }
        );
        let json = await response.json();
        if(json == 'ok'){
            setEstado(getEstado(parseInt(status)+1));
            setVisible(false);
        }
    }

    const Produto = ({ item, index}) => (
        <View style={styles.viewProduto}> 
            <Image style={styles.imagemProduto} source={{uri: `${item.imagem}`}}/> 
            <View style={styles.textoProduto}>
                <Text style={styles.nomeProduto}>{item.nome}</Text>
                <Text style={styles.valorProduto}>R${item.valor},00</Text>
            </View>
        </View>
    );

    const renderProdutos = ({ item }) => {
        return (
            <Produto
                item={item}
                style={{width: '100%'}}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={{flex:11}}>
                <FlatList
                    style={{width: '100%'}}
                    data={produtos}
                    renderItem={renderProdutos}
                />
            </View>
            <View style={{flex:1}}>
                <TouchableOpacity
                    style={styles.botaoMudarStatus}
                    onPress={()=>setVisible(true)}
                    >
                    <Text style={styles.textoBotao}>{estado}</Text>
                </TouchableOpacity>
            </View>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Deseja mudar o estado para: {getEstado(parseInt(status)+1)}?</Dialog.Title>
                <Dialog.Button label="Cancelar" color="#ff6600" onPress={()=>{setVisible(false)}}></Dialog.Button>
                <Dialog.Button label="Sim" color="green" onPress={()=>{mudarEstado()}}></Dialog.Button>
            </Dialog.Container>
        </View>
    );
}