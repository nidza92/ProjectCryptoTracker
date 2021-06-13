import React from 'react'
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

const useStyles = makeStyles({
  container: {
    // width: '1000px',
  },
  table1: {
    justifycontent: 'center',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    width: '1000px',

    margin: 'auto',
  },

  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: '20px',
  },
  title: {
    flexGrow: 1,
  },
})
export default function Table1({ coinList }) {
  const classes = useStyles()
  return (
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
    </TableContainer>
  )
}
