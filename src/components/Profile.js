import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 'auto',
  },
  media: {
    height: 140,
  },
})

export default function Profile() {
  const [ready, setReady] = useState(false)
  const [photo, setPhoto] = useState([])

  const classes = useStyles()

  const fetchPhoto = async () => {
    setReady(false)
    const response = await fetch('https://picsum.photos/200/300')
    setReady(true)
    setPhoto(response.url)
  }

  useEffect(() => {
    fetchPhoto()
  }, [])

  if (!ready) {
    ;<h1>not ready yet</h1>
  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={photo}
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            profile photo
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary' onClick={() => fetchPhoto()}>
          click for new photo
        </Button>
      </CardActions>
    </Card>
  )
}
