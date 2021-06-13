import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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

  appBar: {
    width: '1000px',
    justifycontent: 'center',
    margin: ' auto ',
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

export default function AppBar1() {
  const [login, setLogin] = useState(false)
  const classes = useStyles()
  return (
    <AppBar
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
          <Link to='/'>Home</Link>
        </Typography>
        {login && (
          <Typography variant='h6' className={classes.title}>
            <Link to='/profile'>Profile</Link>
          </Typography>
        )}

        <Button color='inherit' onClick={() => setLogin(!login)}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  )
}
