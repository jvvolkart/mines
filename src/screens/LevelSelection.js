import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal
} from 'react-native'

export default props => {
    return (
        <Modal
            onRequestClose={props.onCancel}
            visible={props.isVisible}
            animationType='slide'
            transparent={true}>
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.frame}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Dificuldade</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.bgEasy]}
                            onPress={() => props.onLevelSelected(0.1)}>
                            <Text style={styles.buttonLabel}>Fácil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.bgNormal]}
                            onPress={() => props.onLevelSelected(0.15)}>
                            <Text style={styles.buttonLabel}>Intermediário</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.bgHard]}
                            onPress={() => props.onLevelSelected(0.2)}>
                            <Text style={styles.buttonLabel}>Difícil</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
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
        paddingTop: 20,
        paddingBottom: 30,
        width: 280,
    },
    title: {
        fontSize: 20,
        fontFamily: 'PressStart2PRegular',
        color: '#EEE',
        marginVertical: 10,
    },
    button: {
        marginTop: 10,
        paddingHorizontal: 5,
        paddingTop: 12,
        paddingBottom: 7,
        minWidth: 195,
        alignItems: 'center',
        borderWidth: 4,
    },
    buttonLabel: {
        fontSize: 13,
        color: '#EEE',
        fontFamily: 'PressStart2PRegular',
    },
    bgEasy: {
        backgroundColor: '#61de96',
        borderTopColor: '#6fffac',
        borderLeftColor: '#6fffac',
        borderRightColor: '#4bad75',
        borderBottomColor: '#4bad75',
    },
    bgNormal: {
        backgroundColor: '#5daee4',
        borderTopColor: '#71c6ff',
        borderLeftColor: '#71c6ff',
        borderRightColor: '#4e93c1',
        borderBottomColor: '#4e93c1',
    },
    bgHard: {
        backgroundColor: '#e4675b',
        borderTopColor: '#ff7b6e',
        borderLeftColor: '#ff7b6e',
        borderRightColor: '#b9554b',
        borderBottomColor: '#b9554b',
    }
})