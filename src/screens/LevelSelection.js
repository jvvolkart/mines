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
        fontSize: 30,
        fontWeight: 'bold',
        color: '#EEE'
    },
    button: {
        marginTop: 10,
        padding: 5,
        minWidth: 150,
        alignItems: 'center',
    },
    buttonLabel: {
        fontSize: 20,
        color: '#EEE',
        fontWeight: 'bold',
    },
    bgEasy: {
        backgroundColor: '#61de96'
    },
    bgNormal: {
        backgroundColor: '#5daee4'
    },
    bgHard: {
        backgroundColor: '#e4675b'
    }
})