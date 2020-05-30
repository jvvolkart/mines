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

            <View style={styles.containerScore}>
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
            <View style={styles.containerScore}>
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
            <View style={styles.containerScore}>
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
        color: '#ddd',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    containerScore: {
        alignItems: 'center',
        height: 140,
        width: '80%',
        //borderColor: '#ddd',
        //borderWidth: 1,
        marginBottom: 20
    },
    titleDifficult: {
        color: '#ddd',
        fontSize: 20,
        marginBottom: 5,
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
        color: '#ddd',
        marginRight: 15,
    },
})