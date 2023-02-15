import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TextInput, StatusBar } from 'react-native';
import CoinItem from './components/CoinItem';

const App = () => {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  //API call
  const loadData = async () => {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    const data = await res.json()
    setCoins(data)
  }
  useEffect(() => {
    loadData();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#141414' />
      <View style={styles.header}>
        <Text style={styles.title}>CryptoMarket</Text>
        <TextInput style={styles.searchInput}
          placeholder='Search a Coin'
          placeholderTextColor='#858585'
          onChangeText={(text) => text && setSearch(text)}
        />
      </View>
      <FlatList
        style={styles.list}
        data={
          coins.filter(
            (coin) =>
              coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
              coin.symbol.toLowerCase().includes(search.toLocaleLowerCase())
        )}
        renderItem={({ item }) => {
          return <CoinItem coin={item} />
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true)
          await loadData()
          setRefreshing(false)
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  title: {
    color: '#141414',
    marginTop: 10,
    fontSize: 20,
  },
  list: {
    width: '90%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
  },
  searchInput: {
    color: '#ffffff',
    borderBottomColor: '#4657ce',
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'center',
  }
})

export default App;
