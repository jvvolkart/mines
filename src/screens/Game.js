import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import params from '../params'
import MineField from '../components/MineField'
import Header from '../components/Header'
import LevelSelection from './LevelSelection'
import YouWon from './YouWon'
import YouLost from './YouLost'
import {
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    lostGame,
    invertFlag,
    flagsUsed
} from '../functions'

export default class App extends Component {

    constructor(props) {
        super(props)

        this.state = this.createState()
    }

    minesAmount = () => {
        const cols = params.getColumnsAmount()
        const rows = params.getRowsAmount()
        return Math.ceil(cols * rows * params.difficultLevel)
    }

    createState = () => {
        if (this.state && this.state.timer) {
            this.stopTimer()
        }
        const cols = params.getColumnsAmount()
        const rows = params.getRowsAmount()
        return {
            board: createMinedBoard(rows, cols, this.minesAmount()),
            won: false,
            lost: false,
            showLevelSelection: false,
            showWon: false,
            showLost: false,
            gameOver: false,

            timerIsOn: false,
            timer: null,
            minutes: '00',
            seconds: '00',
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    onOpenField = (row, column) => {
        if (!this.state.gameOver) {
            const board = cloneBoard(this.state.board)
            openField(board, row, column)

            const lost = hadExplosion(board)
            const won = wonGame(board)

            if (!this.state.timerIsOn && !lost) {
                this.startTimer()
            }

            const stringTime = this.state.minutes + this.state.seconds
            if (lost) {
                if (this.state.timerIsOn) {
                    this.stopTimer()
                }

                lostGame(board, params.getRowsAmount(), params.getColumnsAmount())
                this.setState({ showLost: true, gameOver: true })
            }

            if (won && !lost) {
                if (this.state.timerIsOn) {
                    this.stopTimer()
                    this.storeData(stringTime)
                }

                this.setState({ showWon: true })
            }

            this.setState({ board, lost, won })
        }
    }

    onSelectField = (row, column) => {
        if (!this.state.gameOver) {
            const board = cloneBoard(this.state.board)
            if (!this.state.lost && !this.state.won) {
                invertFlag(board, row, column, this.minesAmount())
            }

            if (!this.state.timerIsOn) {
                this.startTimer()
            }

            const won = wonGame(board)

            if (won) {
                this.setState({ showWon: true })
            }

            this.setState({ board, won })
        }
    }

    onLevelSelected = level => {
        params.difficultLevel = level
        this.setState(this.createState())
    }

    start() {
        let timer = setInterval(() => {
            var num = (Number(this.state.seconds) + 1).toString(),
                count = this.state.minutes;

            if (Number(this.state.seconds) == 59) {
                count = (Number(this.state.minutes) + 1).toString();
                num = '00';
            }

            this.setState({
                minutes: count.length == 1 ? '0' + count : count,
                seconds: num.length == 1 ? '0' + num : num
            });
        }, 1000);
        this.setState({ timer });
    }

    startTimer() {
        this.setState({ timerIsOn: true })
        this.start();
    }

    stopTimer() {
        clearInterval(this.state.timer);
    }

    async getData() {
        try {
            const jsonValue = await AsyncStorage.getItem('@rank')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log('Erro ao trazer rank: ' + e)
        }
    }

    async storeData(time) {
        function letterDificult(number) {
            switch (number) {
                case 0.1:
                    return 'F'
                case 0.15:
                    return 'I'
                case 0.2:
                    return 'D'
                default: '?'
            }
        }

        try {
            let rank = await this.getData()
            if (rank === null) {
                rank = {
                    records: []
                }
            }

            rank.records.push({
                time,
                difficult: letterDificult(params.difficultLevel),
                date: new Date()
            })

            const jsonValue = JSON.stringify(rank)
            await AsyncStorage.setItem('@rank', jsonValue)
        } catch (e) {
            console.log('Erro ao salvar rank: ' + e)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <YouWon isVisible={this.state.showWon}
                    onCancel={() => this.setState({ showWon: false })}
                    minutes={this.state.minutes}
                    seconds={this.state.seconds} />

                <YouLost isVisible={this.state.showLost}
                    onCancel={() => this.setState({ showLost: false })}
                    minutes={this.state.minutes}
                    seconds={this.state.seconds} />

                <LevelSelection isVisible={this.state.showLevelSelection}
                    onLevelSelected={this.onLevelSelected}
                    onCancel={() => this.setState({ showLevelSelection: false })} />

                <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
                    onNewGame={() => this.setState(this.createState())}
                    onButtonPress={() => this.setState({ showLevelSelection: true })}
                    difficultLevel={params.difficultLevel}
                    minutes={this.state.minutes}
                    seconds={this.state.seconds}
                />

                <View style={styles.board}>
                    <MineField board={this.state.board}
                        onOpenField={this.onOpenField}
                        onSelectField={this.onSelectField}
                        showLost={this.showLost} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    board: {
        alignItems: 'center',
        backgroundColor: '#AAA'
    },
})