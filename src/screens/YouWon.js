import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native'

export default class YouWon extends Component {
    render() {
        return (
            <Modal
                onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide'
                transparent={true}>
                
                <View style={styles.frame}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Você Venceu!</Text>
                        <Text style={styles.smile}>:)</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.props.onCancel}>
                            <Text style={styles.buttonLabel}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
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
        transform: [{rotate: '90deg'}],
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
    }
})