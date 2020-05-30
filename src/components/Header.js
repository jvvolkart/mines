import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import Flag from './Flag'
import ButtonLevelSelection from './ButtonLevelSelection';

export default props => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onButtonPress}>
                <ButtonLevelSelection difficultLevel={props.difficultLevel} />
            </TouchableOpacity>
            <View style={styles.middleContainer}>
                <View style={styles.flagContainer}>
                    <View style={styles.flagButton}>
                        <Flag />
                    </View>
                    <Text style={styles.flagsLeft}>= {props.flagsLeft}</Text>
                </View>
                <View>
                    <Text style={styles.timerText}>{`${props.minutes}:${props.seconds}`}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={props.onNewGame}>
                <Image source={require('../assets/imgs/reload.png')} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingTop: 5,
        paddingHorizontal: 20,
        borderBottomColor: '#121212',
        borderWidth: 1,
    },
    middleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerText: {
        color: '#DCDCDC',
        fontSize: 22,
        fontWeight: 'bold',
    },
    flagContainer: {
        flexDirection: 'row',
    },
    flagButton: {
        marginTop: 10,
        minWidth: 2,
    },
    flagsLeft: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 5,
        marginLeft: 20,
        color: '#DCDCDC'
    },
    button: {
        backgroundColor: '#1fc3b4',
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    buttonLabel: {
        fontSize: 20,
        color: '#DCDCDC',
        fontWeight: 'bold'
    }
})
