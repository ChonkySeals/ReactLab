import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function ItemsList() {

  const [APIData, setAPIData] = useState([])
  const baseURL = 'https://6497def49543ce0f49e177aa.mockapi.io/products'
  useEffect(() => {
    fetch((baseURL))
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP Status:${response.status}')
        }
        return response.json()
      })
      .then((data) => { setAPIData(data) })
      .catch((error) => console.log(error.message))
  }, [])

  return (
    <Container sx={{ marginTop: '20px', marginBottom: '20px' }}>
      <Grid container spacing={2}>
        {APIData.map((item) => {
          <Grid item sm={12} md={6} >
            <Card>
              <CardMedia component='img' image={item.image} alt='item.name'>
              </CardMedia>
              <CardContent sx={{ textAlign: 'left' }}>
                <Typography variant='h5' component='div'>
                  iPhone 2
                </Typography>
                <Typography variant='body2' component='div'>
                  Yes, this is an iPhone 2, it killed Steve HandJobs
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        })}

        <Grid item sm={12} md={6}>
          <Card>
            <CardMedia>

            </CardMedia>
            <CardContent sx={{ textAlign: 'left' }}>
              <Typography variant='h5' component='div'>
                iPhone 2
              </Typography>
              <Typography variant='body2' component='div'>
                Yes, this is an iPhone 2, it killed Steve HandJobs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} md={6} >
          <Card>
            <CardMedia>

            </CardMedia>
            <CardContent sx={{ textAlign: 'left' }}>
              <Typography variant='h5' component='div'>
                iPhone 2
              </Typography>
              <Typography variant='body2' component='div'>
                Yes, this is an iPhone 2, it killed Steve HandJobs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} md={6} >
          <Card>
            <CardMedia>

            </CardMedia>
            <CardContent sx={{ textAlign: 'left' }}>
              <Typography variant='h5' component='div'>
                iPhone 2
              </Typography>
              <Typography variant='body2' component='div'>
                Yes, this is an iPhone 2, it killed Steve HandJobs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
