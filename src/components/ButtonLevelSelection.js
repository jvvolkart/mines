import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default props => {

    const difficultLevel = props.difficultLevel
    const styleContainer = [styles.container]
    let textButton = null

    if (difficultLevel == 0.1 ) {
        styleContainer.push(styles.bgeasy)
        textButton = 'F'
    }

    if (difficultLevel == 0.15 ) {
        styleContainer.push(styles.bgnormal)
        textButton = 'I'
    }

    if (difficultLevel == 0.2 ) {
        styleContainer.push(styles.bghard)
        textButton = 'D'
    }

    return (
        <View style={styleContainer}>
            <Text style={styles.text}>{textButton}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 8,
        width: 50
    },
    text: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold'
    },
    bgeasy: {
        backgroundColor: '#61de96'
    },
    bgnormal: {
        backgroundColor: '#5daee4'
    },
    bghard: {
        backgroundColor: '#e4675b'
    },
})