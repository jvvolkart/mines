import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { format, parseISO } from 'date-fns'

export default ({ navigation }) => {
    const initialState = {
        all: [],
        bests: []
    }

    const [fRecords, setFRecords] = useState(initialState);
    const [iRecords, setIRecords] = useState(initialState);
    const [dRecords, setDRecords] = useState(initialState);

    async function getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('@rank')

            getRecordsData(jsonValue != null ? JSON.parse(jsonValue) : null)
        } catch (e) {
            console.log('Erro ao trazer rank: ' + e)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const getRecordsByDifficult = (list, difficult) => {
        return {
            all: list.filter(item => item.difficult === difficult),
            bests: list.filter(item => item.difficult === difficult).sort((a, b) => a.time - b.time).slice(0, 3)
        }
    }

    const getRecordsData = (records) => {
        console.log(getRecordsByDifficult(records.records, 'F'))
        setFRecords(getRecordsByDifficult(records.records, 'F'))
        setIRecords(getRecordsByDifficult(records.records, 'I'))
        setDRecords(getRecordsByDifficult(records.records, 'D'))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Records</Text>
            <View style={[styles.containerScore, styles.bgEasy]}>
                <Text style={styles.titleDifficult}>Fácil</Text>
                <Text style={styles.winCount}>V:{fRecords.all.length}</Text>
                <View style={styles.containerRecords}>
                    {fRecords.all.length > 0 ? fRecords.bests.map((record, index) => {
                        return (
                            <View key={record.date} style={styles.recordItem}>
                                <Text style={styles.recordText}>{index + 1}. {record.time.match(/.{1,2}/g).join(":")}</Text>
                                <Text style={styles.recordText}>{format(parseISO(record.date), 'dd/MM/yyyy')}</Text>
                            </View>
                        )
                    }) : <Text style={styles.noRecordText}>Nenhuma vitória.</Text>}
                </View>
            </View>
            <View style={[styles.containerScore, styles.bgNormal]}>
                <Text style={styles.titleDifficult}>Intermediário</Text>
                <Text style={styles.winCount}>V:{iRecords.all.length}</Text>
                {iRecords.all.length > 0 ? iRecords.bests.map((record, index) => {
                    return (
                        <View key={record.date} style={styles.recordItem}>
                            <Text style={styles.recordText}>{index + 1}. {record.time.match(/.{1,2}/g).join(":")}</Text>
                            <Text style={styles.recordText}>{format(parseISO(record.date), 'dd/MM/yyyy')}</Text>
                        </View>
                    )
                }) : <Text style={styles.noRecordText}>Nenhuma vitória.</Text>}
            </View>
            <View style={[styles.containerScore, styles.bgHard]}>
                <Text style={styles.titleDifficult}>Difícil</Text>
                <Text style={styles.winCount}>V:{dRecords.all.length}</Text>
                {dRecords.all.length > 0 ? dRecords.bests.map((record, index) => {
                    return (
                        <View key={record.date} style={styles.recordItem}>
                            <Text style={styles.recordText}>{index + 1}. {record.time.match(/.{1,2}/g).join(":")}</Text>
                            <Text style={styles.recordText}>{format(parseISO(record.date), 'dd/MM/yyyy')}</Text>
                        </View>
                    )
                }) : <Text style={styles.noRecordText}>Nenhuma vitória.</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#222',
        paddingTop: 30,
    },
    title: {
        fontSize: 30,
        fontFamily: 'PressStart2PRegular',
        color: '#DCDCDC',
        marginBottom: 20,
        marginTop: 5,
    },
    containerScore: {
        alignItems: 'center',
        height: 140,
        width: '80%',
        marginBottom: 20,
        borderWidth: 4,
        backgroundColor: '#ffffff1a',
        position: 'relative',
    },
    titleDifficult: {
        color: '#ddd',
        fontSize: 15,
        fontFamily: 'PressStart2PRegular',
        marginTop: 17,
        marginBottom: 15,
    },
    containerRecords: {
        width: '100%',
        height: 40,
        alignItems: 'center',
    },
    recordItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    recordText: {
        fontSize: 10,
        fontFamily: 'PressStart2PRegular',
        color: '#ddd',
        marginRight: 15,
        marginBottom: 8,
    },
    bgEasy: {
        borderTopColor: '#6fffac',
        borderLeftColor: '#6fffac',
        borderRightColor: '#4bad75',
        borderBottomColor: '#4bad75',
    },
    bgNormal: {
        borderTopColor: '#71c6ff',
        borderLeftColor: '#71c6ff',
        borderRightColor: '#4e93c1',
        borderBottomColor: '#4e93c1',
    },
    bgHard: {
        borderTopColor: '#ff7b6e',
        borderLeftColor: '#ff7b6e',
        borderRightColor: '#b9554b',
        borderBottomColor: '#b9554b',
    },
    noRecordText: {
        fontSize: 10,
        fontFamily: 'PressStart2PRegular',
        color: '#fff',
        lineHeight: 10,
        marginTop: 15,
    },
    winCount: {
        position: 'absolute',
        right: 10,
        top: 10,
        color: '#fff',
        fontSize: 11,
        fontFamily: 'PressStart2PRegular',
    },
})