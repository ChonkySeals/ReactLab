import { Button, Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Detail() {
  const [APIData, setAPIData] = useState([])
  const baseURL = 'https://6497def49543ce0f49e177aa.mockapi.io/products'
  console.log(baseURL)

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


  const truncateName = (name) => {
    const maxLength = 29; // Maximum characters allowed before truncation
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + '...'; // Truncate name after the maximum length
    }
    return name;
  };

  // function scrollToSection(addSection) {
  //   const section = document.getElementById(addSection);
  //   section.scrollIntoView({ behavior: 'smooth' });
  // }


  return (
    <Container sx={{ marginTop: '20px', marginBottom: '20px' }}>
      <Typography variant='h2' component='div' marginBottom='20px'>
        Products
      </Typography>
      <Grid container spacing={5}>
        {APIData.map((item) => (
          <Grid item sm={6} md={3} key={item.id}>
            <Card sx={{ alignSelf: 'normal', borderRadius: '20px', display: 'flex', flexDirection: 'column' }} >
              <CardMedia
                sx={{ width: '100%', height: '200px', objectFit: 'scale-down' }}
                component='img' image={item.image} alt='item.name'>
              </CardMedia>
              <CardContent sx={{ textAlign: 'left' }}>
                <Typography variant='h5' component='div' >
                  {truncateName(item.name)}
                </Typography>
                <Typography variant='h6' component='div'>
                  Price: ${item.price}.00
                </Typography>
                <div className='view-button'>
                  <Link to={`/itemdetail/${item.id}`}>
                    <Button variant='contained'>View</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}


      </Grid>
    </Container >
  )
}
