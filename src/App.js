import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import Appbar1 from '../src/components/AppBar'
import Table1 from '../src/components/Table'
import Profile from '../src/components/Profile'

// const useStyles = makeStyles({
//   container: {
//     // width: '1000px',
//   },
//   table1: {
//     justifycontent: 'center',
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
//     width: '1000px',

//     margin: 'auto',
//   },
//   appBar: {
//     width: '1000px',
//     justifycontent: 'center',
//     margin: ' auto ',
//   },
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: '20px',
//   },
//   title: {
//     flexGrow: 1,
//   },
// })

export default function BasicTable() {
  const [coin, setCoin] = useState([
    'BTCUSD',
    'BTCEUR',
    'ETHUSD',
    'ETHEUR',
    'EOSUSD',
  ])
  const [newCoin, setNewCoing] = useState([])

  // const [coinList1, setCoinList] = useState({
  //   BTCUSD: { dailyChange: null, volume: null, lastPrice: null },
  //   BTCEUR: { dailyChange: null, volume: null, lastPrice: null },
  //   ETHUSD: { dailyChange: null, volume: null, lastPrice: null },
  //   ETHEUR: { dailyChange: null, volume: null, lastPrice: null },
  //   EOSUSD: { dailyChange: null, volume: null, lastPrice: null },
  // })

  const [coinList, setCoinList] = useState([
    { BTCUSD: { dailyChange: null, volume: null, lastPrice: null } },
    { BTCEUR: { dailyChange: null, volume: null, lastPrice: null } },
    { ETHUSD: { dailyChange: null, volume: null, lastPrice: null } },
    { ETHEUR: { dailyChange: null, volume: null, lastPrice: null } },
    { EOSUSD: { dailyChange: null, volume: null, lastPrice: null } },
  ])

  const [loading, setLoading] = useState(true)
  const [login, setLogin] = useState(false)

  // const classes = useStyles()

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
      if (stock[1] != 'hb') {
        if (stock[1]) {
          console.log(stock[1])
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

          console.log('NEW STATE')
          console.log(newState)
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
      {/* <AppBar
        position='static'
        className={classes.appBar}
        justifycontent='center'
      >
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          ></IconButton>
          <Typography variant='h6' className={classes.title}>
            News
          </Typography>
          {login && (
            <Typography variant='h6' className={classes.title}>
              Profile
            </Typography>
          )}

          <Button color='inherit' onClick={() => setLogin(!login)}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <TableContainer
        component={Paper}
        className={classes.container}
        justifycontent='center'
      >
        <Table
          margin='auto'
          className={classes.table1}
          aria-label='simple table'
          size='medium'
        >
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell align='right'>Daily Change</TableCell>
              <TableCell align='right'>Volume</TableCell>
              <TableCell align='right'>Last Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coinList[0]['BTCUSD']['dailyChange'] &&
              coinList.map((row) => (
                <TableRow key={Object.keys(row)[0]}>
                  <TableCell component='th' scope='row'>
                    {Object.keys(row)[0]}
                  </TableCell>
                  <TableCell align='right'>
                    {row[Object.keys(row)[0]].dailyChange}
                  </TableCell>
                  <TableCell align='right'>
                    {row[Object.keys(row)[0]].volume}
                  </TableCell>
                  <TableCell align='right'>
                    {row[Object.keys(row)[0]].lastPrice}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      <Appbar1></Appbar1>
      <Table1 coinList={coinList}></Table1>
      <Profile></Profile>
    </div>
  )
}
