import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { format, parseISO } from 'date-fns'

export default ({ navigation }) => {
    const [fRecords, setFRecords] = useState([]);
    const [iRecords, setIRecords] = useState([]);
    const [dRecords, setDRecords] = useState([]);

    async function getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('@rank')
            //console.log(jsonValue != null ? JSON.parse(jsonValue) : null)
            getRecordsData(jsonValue != null ? JSON.parse(jsonValue) : null)
        } catch (e) {
            console.log('Erro ao trazer rank: ' + e)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const getRecordsByDifficult = (list, difficult) => {
        if (list.length > 0) {
            return list.filter(item => item.difficult === difficult).sort((a, b) => a.time - b.time).slice(0, 3)
        }
    }

    const getRecordsData = (records) => {
        setFRecords(getRecordsByDifficult(records.records, 'F'))
        setIRecords(getRecordsByDifficult(records.records, 'I'))
        setDRecords(getRecordsByDifficult(records.records, 'D'))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Records</Text>

            <View style={[styles.containerScore, styles.bgEasy]}>
                <Text style={styles.titleDifficult}>Fácil</Text>
                <View style={styles.containerRecords}>
                    {fRecords.map((record, index) => {
                        return (
                            <View key={record.date} style={styles.recordItem}>
                                <Text style={styles.recordText}>{index + 1}. {record.time.match(/.{1,2}/g).join(":")}</Text>
                                <Text style={styles.recordText}>{format(parseISO(record.date), 'dd/MM/yyyy')}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
            <View style={[styles.containerScore, styles.bgNormal]}>
                <Text style={styles.titleDifficult}>Intermediário</Text>
                {iRecords.map((record, index) => {
                    return (
                        <View key={record.date} style={styles.recordItem}>
                            <Text style={styles.recordText}>{index + 1}. {record.time.match(/.{1,2}/g).join(":")}</Text>
                            <Text style={styles.recordText}>{format(parseISO(record.date), 'dd/MM/yyyy')}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={[styles.containerScore, styles.bgHard]}>
                <Text style={styles.titleDifficult}>Difícil</Text>
                {dRecords.map((record, index) => {
                    return (
                        <View key={record.date} style={styles.recordItem}>
                            <Text style={styles.recordText}>{index + 1}. {record.time.match(/.{1,2}/g).join(":")}</Text>
                            <Text style={styles.recordText}>{format(parseISO(record.date), 'dd/MM/yyyy')}</Text>
                        </View>
                    )
                })}
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
    },
    containerScore: {
        alignItems: 'center',
        height: 140,
        width: '80%',
        marginBottom: 20,
        borderWidth: 4,
        backgroundColor: '#ffffff1a',
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
    }
})