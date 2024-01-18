import React, { useState } from 'react';
import { Container, Grid, FormControl, InputLabel, MenuItem, Select, TextField, Button, FormHelperText, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const PersonalDetail = () => {
  const [selectGovtID, setSelectGovtID] = useState(true);
  const [govtIDType, setGovtIDType] = useState("");

  const navigate = useNavigate()

  const validatePan = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
  const validateAadhar = /^[2-9][0-9]{3}[0-9]{4}[0-9]{4}$/;
  const validateMobile = /^(\+\d{1,3}[- ]?)?\d{10}$/

  const schema = yup.object().shape({
    name: yup.string().required('Name is Required').min(3, 'Please Enter At least 3 Characters'),
    age: yup
      .number()
      .typeError('Age is Required')
      .positive("Age can't start with a minus")
      .integer("Age can't include a decimal point")
      .min(1)
      .max(99)
      .required('Age is Required'),
    sex: yup.string().required('Please Select Sex'),
    phone: yup
      .string()
      .matches(validateMobile, 'Please enter a valid mobile number'),
    govtIDNum: yup.string().matches(govtIDType === "Aadhar" ? validateAadhar : validatePan, 'Please enter valid Govt ID Number'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data)
    navigate("/address")
  };

  const handleGovtID = (event) => {
    const getType = event.target.value;
    setGovtIDType(getType)
    setSelectGovtID(false);
  };


  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Name"
              type="text"
              placeholder="Enter Name"
              fullWidth
              required
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Age"
              type="text"
              placeholder="Age in Year"
              fullWidth
              required
              {...register("age")}
              error={!!errors.age}
              helperText={errors.age?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="outlined" fullWidth error={!!errors.sex}>
              <InputLabel id="demo-simple-select-required-label">Sex *</InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="sex-select"
                label="Sex *"
                required
                {...register("sex")}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
              <FormHelperText>{errors.sex?.message}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2} style={{ marginTop: '15px' }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Mobile"
              type="text"
              placeholder="Enter Mobile"
              fullWidth
              {...register("phone")}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="id-type-label">ID Type</InputLabel>
              <Select
                labelId="id-type-label"
                id="id-type-select"
                label="ID Type"
                {...register("govtIDType")}
                onChange={handleGovtID}
                error={!!errors.govtIDType}
                helperText={errors.govtIDType?.message}
              >
                <MenuItem value="Aadhar">Aadhar Card</MenuItem>
                <MenuItem value="Pan">Pan Card</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Govt ID"
              type="text"
              placeholder="Enter Govt ID"
              fullWidth
              {...register("govtIDNum")}
              disabled={selectGovtID}
              error={!!errors.govtIDNum}
              helperText={errors.govtIDNum?.message}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" type="submit" onClick={handleSubmit(onSubmit)} style={{ marginTop: '20px' }}>
            Next
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default PersonalDetail;
