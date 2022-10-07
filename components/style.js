import { StyleSheet } from 'react-native';

export const stylesTicketDetail = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#5DADE2',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius : 30,
      borderTopRightRadius : 30,
    },
    bodyContainer: {
        flex: 1,
        backgroundColor: '#76D7C4',
        alignItems: 'center',
        borderTopLeftRadius : 30,
        borderTopRightRadius : 30,
    },
    title: {
        fontSize: 25,
        marginBottom: 15,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        padding: 25,
        textAlign: 'justify',
    },
    priority: {
        padding: 15,
        marginVertical: 5,
        width: 300,
        backgroundColor: '#F7DC6F',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#76D7C4',
    },
    priorityText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    difficulty: {
        marginVertical: 5,
        padding: 15,
        textAlign: 'center', 
        width: 300,
        backgroundColor: '#EC7063',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#76D7C4',
    },
    status: {
        width: 300,
        color: '#fff',
        backgroundColor: '#28B463',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#76D7C4',
    },
});

export const stylesTicketList = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
      },
      containerList: {
        height: '70%',
        },
      title: {
        fontSize: 25,
        marginBottom: 15,
        textAlign: 'center',
        color: '#000',
        fontWeight: 'bold',
    },
});

export const stylesTicketItem = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        borderColor: '#0051FF',
        borderWidth : 2,
        borderRadius: 10,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        alignItems: 'center',
          },
      containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        },
      title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        width: '100%',
        },
    priority: {
        padding: 15,
        marginVertical: 5,
        width: 150,
        textAlign: 'center',
    },
    difficulty: {
        padding: 15,
        marginVertical: 5,
        width: 150,
        textAlign: 'center',
    },
    status: {
        padding: 15,
        marginVertical: 5,
        width: 300,
        textAlign: 'center',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        width: 100,
        textAlign: 'center',
        padding: 10
        },

    });
