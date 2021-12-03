import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#262626',
      padding: 10,
    },
    clienteView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
    },
    texto:{
      color: 'white',
      fontSize: 22,
    },
    viewProduto: {
      flexDirection:'row',
      backgroundColor: '#111',
      justifyContent:"space-between",
      width:'auto',
      padding: 10,
      height: 150,
      margin: 5,
    },
    textoProduto: {
      flex: 2,
      alignItems:'flex-start',
      justifyContent: 'center',
      padding:15,
    },
    imagemProduto: {
      flex: 1,
      borderRadius: 50,
    },
    nomeProduto: {
      fontSize: 15, 
      color: 'white'
    },
    valorProduto: {
      fontSize: 12,
      color: 'white',
      fontWeight: 'bold'
    },
    botaoMudarStatus: {
      backgroundColor: '#ff6600',
      borderRadius: 20,
      padding: 15,
      width: '100%',
      alignItems: 'center',
    },
    textoBotao: {
      color:'white',
      fontWeight:'bold',
      fontSize:20
    },
});

export default styles;