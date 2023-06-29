import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { Button, Container, FormControlLabel, Paper, Switch, TextField, Typography } from '@mui/material';

export default function Edit() {

  const { id } = useParams()
  const [APIData, setAPIData] = useState({})
  const navigate = useNavigate()
  const baseURL = `https://6497def49543ce0f49e177aa.mockapi.io/products/${id}`

  useEffect(() => {
    fetch(baseURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAPIData(data)
        formik.setValues(data)
      })
      .catch((error) => console.log(error.message));
  }, [id]);

  const popup = () => {
    alert('Updated successfully')
  }

  const formik = useFormik({
    initialValues: {
      name: APIData.name || "",
      price: APIData.price || 0,
      description: APIData.description || "",
      category: APIData.category || "",
      bestseller: APIData.bestseller || false,
      image: APIData.image || ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required").min(2, "Must be at least 2 characters long").max(100, "Maximum 100 characters"),
      price: Yup.number().integer('Must be an integer').typeError('Must be a number').positive('Must be a positive number').required('Required'),
      description: Yup.string().required("Required").min(10, "Must be at least 10 characters long"),
      category: Yup.string().required("Required").min(2, "Must be at least 2 characters long"),
      image: Yup.string().required("Required").matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|webg|svg)/i, 'Invalid image URL')
    }),
    onSubmit: (values) => {
      fetch(baseURL, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP Status: ${response.status}`);
          }
          return response.json();
        })
        .then(() => {
          popup();
          formik.resetForm();
          navigate('/dashboard')
        })
        .catch(error => console.log(error.message));
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Call the formik.handleSubmit function to trigger form submission
    formik.handleSubmit();
  };


  return (
    <Typography sx={{ padding: '80px 30px' }}>

      <Container >

        <Paper sx={{ padding: '20px' }}>
          <Typography variant='h2' component='div'>
            Edit The Item
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              name='name'
              label='Name'
              type='text'
              variant='standard'
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              required
            />
            {formik.errors.name && (
              <Typography display='flex' justifyContent='left'>
                <Typography variant='caption' color='red' fontSize='18px'>{formik.errors.name}</Typography>
              </Typography>
            )}
            <br />
            <TextField
              autoFocus
              name="price"
              label="Price"
              type="number"
              variant="standard"
              fullWidth
              value={formik.values.price}
              required
              onChange={formik.handleChange}
            />
            {formik.errors.price && (
              <Typography display='flex' justifyContent='left'>
                <Typography variant='caption' color='red' fontSize='18px'>{formik.errors.price}</Typography>
              </Typography>

            )}
            <br />
            <TextField
              autoFocus
              name="description"
              label="Description"
              type='text'
              variant="standard"
              multiline
              fullWidth
              value={formik.values.description}
              onChange={formik.handleChange}
              required
            />
            {formik.errors.description && (
              <Typography display='flex' justifyContent='left'>
                <Typography variant='caption' color='red' fontSize='18px'>{formik.errors.description}</Typography>
              </Typography>
            )}
            <br />
            <TextField
              autoFocus
              name="category"
              label="Category"
              type='text'
              variant="standard"
              fullWidth
              value={formik.values.category}
              onChange={formik.handleChange}
              required
            />
            {formik.errors.category && (
              <Typography display='flex' justifyContent='left'>
                <Typography variant='caption' color='red' fontSize='18px'>{formik.errors.category}</Typography>
              </Typography>
            )}
            <br />
            <TextField
              autoFocus
              name="image"
              label="Image URL"
              type='text'
              variant="standard"
              fullWidth
              value={formik.values.image}
              onChange={formik.handleChange}
              required
            />
            {/* <Input
          autoFocus
          name='image'
          label='Image'
          type='file'
          fullWidth
          variant=''
          value={formik.values.image}
          onChange={formik.handleChange}
          required
        /> */}
            {formik.errors.image && (
              <Typography display='flex' justifyContent='left'>
                <Typography variant='caption' color='red' fontSize='18px'>{formik.errors.image}</Typography>
              </Typography>
            )}
            <Typography sx={{ display: 'flex' }}>
              <FormControlLabel
                control={<Switch checked={formik.values.bestseller} onChange={formik.handleChange} />}
                name='bestseller'
                label='Best seller'
                labelPlacement='start'
                sx={{ justifyContent: 'left', margin: '0px' }}
              />
            </Typography>
            <br />
            <Button variant='contained' size='small' type='submit' sx={{ borderRadius: '20px' }}>
              <Typography>
                Edit
              </Typography>
            </Button>
          </form>
        </Paper>
      </Container>
    </Typography>
  )
}
