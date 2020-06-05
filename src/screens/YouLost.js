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
        padding: 30,
        paddingBottom: 15,
    },
    title: {
        fontSize: 20,
        fontFamily: 'PressStart2PRegular',
        color: '#DCDCDC',
    },
    smile: {
        fontSize: 60,
        marginTop: -8,
        marginBottom: 5,
        fontWeight: 'bold',
        transform: [{ rotate: '90deg' }],
        marginLeft: 15,
        color: '#DCDCDC',
    },
    button: {
        marginTop: 20,
        paddingBottom: 0,
        paddingTop: 10,
        minWidth: 150,
        alignItems: 'center',
        backgroundColor: '#555'
    },
    buttonLabel: {
        fontSize: 20,
        color: '#EEE',
        fontFamily: 'PressStart2PRegular',
    },
    time: {
        color: '#DCDCDC',
        fontSize: 16,
        fontFamily: 'PressStart2PRegular',
    }
})