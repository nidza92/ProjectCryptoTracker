import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Appbar1 from '../src/components/AppBar'
import Table1 from '../src/components/Table'
import Profile from '../src/components/Profile'

export default function BasicTable() {
  const [coin, setCoin] = useState([
    'BTCUSD',
    'BTCEUR',
    'ETHUSD',
    'ETHEUR',
    'EOSUSD',
  ])
  const [loading, setLoading] = useState(true)

  const [coinList, setCoinList] = useState([
    { BTCUSD: { dailyChange: null, volume: null, lastPrice: null } },
    { BTCEUR: { dailyChange: null, volume: null, lastPrice: null } },
    { ETHUSD: { dailyChange: null, volume: null, lastPrice: null } },
    { ETHEUR: { dailyChange: null, volume: null, lastPrice: null } },
    { EOSUSD: { dailyChange: null, volume: null, lastPrice: null } },
  ])

  useEffect(() => {
    coin.forEach((coin1) => {
      openWebsocket(coin1)
    })
  }, [])

  const openWebsocket = (cryptoCoin) => {
    console.log(cryptoCoin)
    const ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
    ws.onmessage = (msg) => {
      const stock = JSON.parse(msg.data)
      setLoading(true)
      if (stock[1] !== 'hb') {
        if (stock[1]) {
          let newState = coinList
          newState.forEach((item) => {
            if (cryptoCoin === Object.keys(item)[0]) {
              item[cryptoCoin] = {
                dailyChange: stock[1][4].toFixed(2),
                volume: stock[1][7],
                lastPrice: stock[1][6],
              }
            }
          })
          setCoinList(newState)
          setLoading(false)
          console.log('COIN LIST')
          console.log(coinList)
        }
      }
    }

    let msg = JSON.stringify({
      event: 'subscribe',
      channel: 'ticker',
      symbol: cryptoCoin,
    })

    ws.onopen = () => {
      ws.send(msg)
    }
  }

  return (
    <div display='flex' style={{ width: '100%' }}>
      <Router>
        <Appbar1></Appbar1>
        <Switch>
          <Route exact path='/'>
            <Table1 coinList={coinList}></Table1>
          </Route>
          <Route exact path='/profile'>
            <Profile></Profile>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}
