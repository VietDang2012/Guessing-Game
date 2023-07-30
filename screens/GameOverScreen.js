import { Text, View, ScrollView, Image, StyleSheet, useWindowDimensions } from "react-native"

import Colors from "../constants/colors"
import Title from "../components/ui/Title"
import PrimaryButton from "../components/ui/PrimaryButton"

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {

    const { width, height } = useWindowDimensions()

    let imageSize = 300

    if (width < 380) {
        imageSize = 150
    }

    if (height < 400) {
        imageSize = 100
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    }

    return (
        <ScrollView style={styles.screen}>
            <View style={styles.rootContainer}>
                <Title>Game Over</Title>
                <View style={[styles.imageContainer, imageStyle]}>
                    <Image style={styles.image} source={require('../assets/images/gigachad.jpg')} />
                </View>
                <Text style={styles.summaryText}>Chỉ cần tới
                    <Text style={styles.hightlight}> {roundsNumber} </Text>lần là tôi có thể đoán được con số
                    <Text style={styles.hightlight}> {userNumber} </Text>của bạn
                </Text>
                <PrimaryButton onPress={onStartNewGame}>Start new game</PrimaryButton>
            </View>
        </ScrollView>
    )
}

export default GameOverScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        // height: deviceWidth < 380 ? 150 : 300,
        // width: deviceWidth < 380 ? 150 : 300,
        // borderRadius: deviceWidth < 380 ? 75 : 150,
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36
    },
    image: {
        height: '100%',
        width: '100%'
    },
    summaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 24
    },
    hightlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
})

