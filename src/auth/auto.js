import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./style";

export default function LoginAuto({ navigation }){
    useFocusEffect(() => {
        const login = async () => {
            const tel = await AsyncStorage.getItem("telefone");
            const senha = await AsyncStorage.getItem("senha");
            if(tel && senha){
                navigation.navigate('Home');
            } else {
                navigation.navigate("Login");
            }
        }
        login();
    });

    return (
        <View style={styles.container}>
            <ActivityIndicator color="white" size={50} />
        </View>
    );
}