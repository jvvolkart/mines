import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.containerName}>
                <Text style={styles.name}>Campo minado</Text>
            </View>
            <View style={styles.containerButtons}>
                <TouchableOpacity style={[styles.button, styles.playButton]} onPress={() => navigation.navigate('Game')}>
                    <Text style={styles.textButton}>Jogar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.recordsButton]} onPress={() => navigation.navigate('Records')}>
                    <Text style={[styles.textButton]}>Records</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#222',
    },
    containerName: {
        marginTop: 80,
        marginBottom: 125,
    },
    name: {
        color: '#ddd',
        fontSize: 40,
        fontWeight: 'bold',
    },
    containerButtons: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: '50%',
        padding: 10,
        marginBottom: 20,
        borderWidth: 4,
    },
    textButton: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    playButton: {
        backgroundColor: '#61de96',
        borderTopColor: '#6fffac',
        borderLeftColor: '#6fffac',
        borderRightColor: '#4bad75',
        borderBottomColor: '#4bad75',
    },
    recordsButton: {
        backgroundColor: '#ffffff1a',
        borderTopColor: '#eee',
        borderLeftColor: '#eee',
        borderRightColor: '#9e9e9e',
        borderBottomColor: '#9e9e9e',
    },
})