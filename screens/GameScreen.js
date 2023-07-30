import { View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';

import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import NumberContainer from "../components/game/NumberContainer";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
    const rndNumber = Math.floor(Math.random() * (max - min)) + min
    if (rndNumber === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNumber
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [guessRounds, setGuessRounds] = useState([initialGuess])
    const { width, height } = useWindowDimensions()

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length)
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        minBoundary = 1
        maxBoundary = 100
    }, [])

    function nextGuessHandler(direction) {
        // direction => 'lower' , 'greater'
        if (direction === 'lower' && currentGuess < userNumber ||
            direction === 'greater' && currentGuess > userNumber) {
            Alert.alert('Chọn sai rồi', 'Làm gì có chuyện số của bạn như thế được, chọn lại đi', [{ text: 'Ok em', style: "cancel" }])
            return
        }
        if (direction === 'lower') {
            maxBoundary = currentGuess
        } else {
            minBoundary = currentGuess + 1
        }
        console.log(minBoundary, maxBoundary)
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRndNumber)
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds])
    }

    const getRoundsListLength = guessRounds.length

    let content = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>Higher of lower ?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="md-remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
        </>
    )

    if (width > 500) {
        content = (
            <>
                <View style={styles.buttonsContainerWide}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="md-remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </>
        )
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {content}
            {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
            <FlatList
                data={guessRounds}
                renderItem={(itemData) => <GuessLogItem roundNumber={getRoundsListLength - itemData.index} guess={itemData.item} />}
                keyExtractor={(item) => item}
            />
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    instructionText: {
        marginBottom: 20
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonsContainerWide: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
})