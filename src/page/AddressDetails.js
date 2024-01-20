import React, { useEffect, useState } from 'react';
import { Container, Grid, FormControl, TextField, Button, Autocomplete, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getCountry } from '../feature/GetCountryList';
import { setSaveAddressDetails } from '../feature/FormRegisterSlice';
import { useNavigate } from 'react-router-dom';
import { cityList, stateList } from '../utils';


const AddressDetails = () => {
    const { getCountryList } = useSelector((state) => state.country)
    const { savePersonalDetails } = useSelector((state) => state.address);
    const [searchCountry, setSearchCountry] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (Object.keys(savePersonalDetails).length === 0) {
          navigate("/");
        }
      }, [savePersonalDetails, navigate]);
    const schema = yup.object().shape({
        pincode: yup
            .string().nullable()
            .notRequired().when('pincode', {
              is: (value) => value?.length,
              then: (rule) => rule.matches(/^\d+$/, "Please enter 6 digit pincode")
              .min(6, "Please enter 6 digit pincode")
              .max(6, "Please enter 6 digit pincode"),
            })
          ,
           
    },
    [
        ['pincode', 'pincode'],
      ])

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        dispatch(setSaveAddressDetails(data))
        navigate("/data-table")
    };

    useEffect(() => {
        dispatch(getCountry())
    }, [])

 
  

    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Address"
                            type="text"
                            placeholder="Enter Address"
                            fullWidth
                            {...register("address")}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Autocomplete
                           
                            disablePortal
                            id="combo-box-demo"
                            options={stateList}
                            renderInput={(params) => <TextField {...params} label="State"  {...register("state")} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Autocomplete
                            
                            disablePortal
                            id="combo-box-demo"
                            options={cityList}
                            renderInput={(params) => <TextField {...params} label="City" {...register("city")} />}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} style={{ marginTop: '15px' }}>
                    <Grid item xs={12} sm={7}>
                        <Autocomplete
                            
                            disablePortal
                            id="combo-box-demo"
                            options={getCountryList}
                            getOptionLabel={(option) => option.name?.common}
                            renderInput={(params) => (
                                <TextField {...params} label="Country" variant="outlined" {...register("country")} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <TextField
                            label="Pincode"
                            type="text"
                            placeholder="Enter Pincode"
                            fullWidth
                            {...register("pincode")}
                            error={!!errors.pincode}
                            helperText={errors.pincode?.message}
                        />
                    </Grid>

                </Grid>

                <Box sx={{ display: "flex", justifyContent: 'flex-end' }}>

                    <Button variant="contained" color="primary" type="submit" onClick={handleSubmit(onSubmit)} style={{ marginTop: '20px' }}>
                        Submit
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default AddressDetails;

