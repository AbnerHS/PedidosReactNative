import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#262626',
      padding: 10,
    },
    viewPedido: {
      backgroundColor: '#111',
      margin: 5,
    },
    containerPedido: {
      flexDirection:'row',
      justifyContent:"space-between",
      width:'auto',
      padding: 10,
      height: 50,
      margin: 5,
    },  
    textoPedido: {
      flex: 1,
      color: 'white',
      fontSize: 16,
    },
    viewProduto: {
      flexDirection:'row',
      backgroundColor: '#111',
      justifyContent:"space-between",
      width:'auto',
      padding: 10,
      height: 100,
      margin: 5,
    },
    textoProduto: {
      flex: 3,
      alignItems:'flex-end',
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
});

export default styles;