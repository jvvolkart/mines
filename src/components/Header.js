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
        marginTop: 4,
    },
    timerText: {
        color: '#DCDCDC',
        fontSize: 14,
        marginTop: 5,
        fontFamily: 'PressStart2PRegular',
    },
    flagContainer: {
        flexDirection: 'row',
        marginRight: 4,
    },
    flagButton: {
        minWidth: 2,
    },
    flagsLeft: {
        fontSize: 13,
        paddingTop: 3,
        marginLeft: 25,
        marginBottom: 2,
        fontFamily: 'PressStart2PRegular',
        color: '#DCDCDC',
    },
    button: {
        paddingVertical: 4,
        paddingHorizontal: 6,
        backgroundColor: '#1fc3b4',
        borderWidth: 4,
        borderTopColor: '#28efdc',
        borderLeftColor: '#28efdc',
        borderRightColor: '#159a8e',
        borderBottomColor: '#159a8e',
    },
    buttonLabel: {
        fontSize: 20,
        color: '#DCDCDC',
        fontWeight: 'bold'
    }
})
