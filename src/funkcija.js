const openWebsocket = (cryptoCoin) => {
  let ws = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
  ws.onmessage = (msg) => {
    let stock = JSON.parse(msg.data)

    // setDaily(stock[1][4].toFixed(2))

    if (stock[1] != 'hb') {
      if (stock[1]) {
        setCoinList({
          [cryptoCoin]: {
            dailyChange: stock[1][4].toFixed(2),
            volume: stock[1][7],
            lastPrice: stock[1][6],
          },
        })
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
}
