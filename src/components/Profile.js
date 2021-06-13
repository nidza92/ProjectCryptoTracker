import React, { useState, useEffect } from 'react'

export default function Profile() {
  const [ready, setReady] = useState(false)
  const [photo, setPhoto] = useState([])

  const fetchPhoto = async () => {
    setReady(false)
    const response = await fetch('https://picsum.photos/200/300')
    console.log(response)
    // const data = await response.json()
    // console.log(data)
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
    <div>
      <img src={photo} />
      <btn onClick={() => fetchPhoto()}>new photo</btn>
    </div>
  )
}
