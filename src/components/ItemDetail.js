import { Card, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Detail from './Detail';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function ItemDetail(props) {
    const { id } = useParams()
    const [itemDetail, setItemDetail] = useState({})
    const baseURL = `https://6497def49543ce0f49e177aa.mockapi.io/products/${id}`
    useEffect(() => {
        fetch((baseURL))
            .then((response) => {
                if (!response.ok) {
                    throw new Error('HTTP Status:${response.status}')
                }
                return response.json()
            })
            .then((data) => { setItemDetail(data) })
            .catch((error) => console.log(error.message))
    }, [id])


    const generateRatingStars = (rating) => {
        const fullStars = Array.from({ length: rating }, (_, index) => (
            <StarIcon key={index} />
        ));
        const emptyStars = Array.from({ length: 5 - rating }, (_, index) => (
            <StarBorderIcon key={index + rating} />
        ));
        return [...fullStars, ...emptyStars];
    };

    

    return (
        <Container id="addSection">
            <Typography variant='h2' component='div' marginBottom='20px' marginTop='20px'>
                Item Info
            </Typography>
            <Card sx={{ display: 'flex', marginTop: '20px', marginBottom: '20px' }}>
                <CardContent>
                    <CardMedia
                        sx={{ width: '400px', height: '300px', objectFit: 'scale-down' }}
                        component='img' image={itemDetail.image} alt='itemDetail.name'>
                    </CardMedia>
                </CardContent>
                <CardContent sx={{ textAlign: 'left' }}>
                    <Typography variant='h4' component='div' key={itemDetail.id}>
                        {itemDetail.name}
                    </Typography>
                    <Typography variant='div' component='div' sx={{display:'flex', alignItems:'center'}}>
                        <Typography variant='h6' component='span'>Rating:</Typography>
                        <Typography variant='div' component='div' color='#FFD700' sx={{ alignItems:'center', display:'flex' }}>
                            {generateRatingStars(itemDetail.rating)}
                        </Typography>
                        {itemDetail.rating}/5
                    </Typography>
                    <Grid container spacing={5}>
                        <Grid item lg={6}>
                            <Typography variant='h6' component='div'>
                                <Typography variant='h6' component='span'>Price:</Typography> ${itemDetail.price}.00
                            </Typography>
                        </Grid>
                        <Grid item lg={6}>
                            <Typography variant='h6' component='div'>
                                <Typography variant='h6' component='span'>Type:</Typography> {itemDetail.category}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant='div' component='div' sx={{fontSize:'18px'}}>
                        <Typography variant='h6' component='span'>Description:</Typography> {itemDetail.description}
                    </Typography>

                </CardContent>
            </Card>
            <Detail />
        </Container>
    )
}
