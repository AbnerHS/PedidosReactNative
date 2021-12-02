import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#262626',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titulo: {
        fontSize: 35,
        marginBottom: '30%',
        color: '#ff6600'
    },
    mensagem: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
    },
    label: {
        fontSize: 18,
        margin: 10,
        color: 'white',
        textAlign: 'left',
        width:'80%',
    },
    textInput: {
        width: '80%',
        fontSize: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ff6600',
        padding:10,
        marginBottom:20,
        color: 'white'
    },
    botao: {
        borderRadius: 50,
        borderWidth:1,
        width: '80%',
        padding: 15,
        margin: 15,
        backgroundColor: '#ff6600'
    },
    textoBotao: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    }
});
export default styles;