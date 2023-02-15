import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const CoinItem = ({ coin }) => {

    return (
        <View style={styles.containerItem}>
            <View style={styles.coinName}>
                <Image
                    source={{ uri: coin.image }}
                    style={styles.image}
                />
                <View style={styles.containerNames}>
                    <Text className='text-blue-400'>{coin.name}</Text>
                    <Text style={styles.textSymbol}>{coin.symbol}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.textPrice}>${coin.current_price}</Text>
                <Text style={[styles.pricePercentage, coin.price_change_percentage_24h > 0 ? styles.priceUp : styles.priceDown]}>{coin.price_change_percentage_24h}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerItem: {
        backgroundColor: '#ffffff',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    coinName: {
        flexDirection: 'row'
    },
    text: {
        color: '#121212'
    },
    image: {
        width: 30,
        height: 30,
    },
    textSymbol: {
        color: '#121212',
        textTransform: 'uppercase',
    },
    containerNames: {
        marginLeft: 20
    },
    pricePercentage: {
        textAlign: 'right'
    },
    priceUp: {
        color: 'green',
    },
    priceDown : {
        color: 'red'
    },
    textPrice: {
        color: '#121212',
        textAlign: 'right',
    },
})

export default CoinItem