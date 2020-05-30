import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native'

export default props => {
    return (
        <Modal
            onRequestClose={props.onCancel}
            visible={props.isVisible}
            animationType='slide'
            transparent={true}>

            <View style={styles.frame}>
                <View style={styles.container}>
                    <Text style={styles.title}>Você Perdeu!</Text>
                    <Text style={styles.smile}>:(</Text>
                    <Text style={styles.time}>{`Tempo: ${props.minutes}:${props.seconds}`}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={props.onCancel}>
                        <Text style={styles.buttonLabel}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    container: {
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#DCDCDC',
    },
    smile: {
        fontSize: 60,
        fontWeight: 'bold',
        transform: [{ rotate: '90deg' }],
        marginLeft: 15,
        color: '#DCDCDC',
    },
    button: {
        marginTop: 10,
        padding: 5,
        minWidth: 150,
        alignItems: 'center',
        backgroundColor: '#555'
    },
    buttonLabel: {
        fontSize: 20,
        color: '#EEE',
        fontWeight: 'bold',
    },
    time: {
        color: '#DCDCDC',
        fontSize: 22,
        fontWeight: 'bold',
    }
})