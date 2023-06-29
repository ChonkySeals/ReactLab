import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';



export default function Dashboard() {

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

  const generateRatingStars = (rating) => {
    const fullStars = Array.from({ length: rating }, (_, index) => (
      <StarIcon key={index} />
    ));
    const emptyStars = Array.from({ length: 5 - rating }, (_, index) => (
      <StarBorderIcon key={index + rating} />
    ));
    return [...fullStars, ...emptyStars];
  };

  const isBestSeller = (bestseller) => {
    if (bestseller == true) {
      return "Yes"
    } else {
      return "No"
    }
  }

  const deleteItem = (id) => {
    fetch(`${baseURL}/${id}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP Status:${response.status}')
        }
        return response.json()
      })
      .then(() => { // Remove the deleted item from APIData state
        const updatedAPIData = APIData.filter((item) => item.id !== id)
        setAPIData(updatedAPIData)
      })
      .catch((error) => console.log(error.message))
  }

  return (
    <Typography sx={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h2' component='div'>
        Item Lists
      </Typography>
      <Typography sx={{ alignSelf: 'flex-end' }}>
        <Link to='/add' sx={{ alignSelf: 'flex-end', marginBottom: '20px' }}>
          <AddIcon sx={{ backgroundColor: '#1976d2', color: 'white', borderRadius: '20px', padding: '5px 15px' }} />
        </Link>
      </Typography>


      <TableContainer component={Paper}>
        <Table >
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow >
              <TableCell sx={{ color: 'white', fontSize: '18px' }}>
                ID
              </TableCell>
              <TableCell sx={{ color: 'white', fontSize: '18px' }}>
                Image
              </TableCell>
              <TableCell sx={{ color: 'white', fontSize: '18px' }}>
                Name
              </TableCell>
              <TableCell sx={{ color: 'white', fontSize: '18px' }}>
                Category
              </TableCell>
              <TableCell sx={{ color: 'white', fontSize: '18px' }}>
                Price
              </TableCell>
              <TableCell sx={{ color: 'white', fontSize: '18px' }}>
                Description
              </TableCell>
              <TableCell sx={{ color: 'white', fontSize: '18px' }}>
                Rating
              </TableCell>

              <TableCell sx={{ color: 'white', fontSize: '18px' }}>
                Best Seller
              </TableCell>
              <TableCell sx={{ color: 'white', fontSize: '18px' }}>
              </TableCell>
              <TableCell sx={{ color: 'white', fontSize: '18px' }}>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {APIData.map((item) => (
              <TableRow>
                <TableCell>
                  {item.id}
                </TableCell>

                <TableCell className='table-img'>
                  <img src={item.image} alt='' className='' />
                </TableCell>

                <TableCell>
                  {item.name}
                </TableCell>

                <TableCell>
                  {item.category}
                </TableCell>

                <TableCell>
                  ${item.price}.00
                </TableCell>

                <TableCell>
                  {item.description}
                </TableCell>

                <TableCell >
                  {/* {generateRatingStars(item.rating)} */}
                  {item.rating}/5
                </TableCell>

                <TableCell>
                  {isBestSeller(item.bestseller)}
                </TableCell>

                <TableCell>
                  <Link to={`/edit/${item.id}`}>
                    <Button><EditIcon /></Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteItem(item.id)}>
                    <DeleteIcon sx={{ color: 'red' }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Typography>
  )
}
