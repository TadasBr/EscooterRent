import { Alert, Avatar, Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api, authConfig } from "../components/Api";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { Add, Done } from "@mui/icons-material";

const AddRentPoint = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    const requestData = {
      address,
      city
    };

    try {
      await Api.post(`/RentPoint`, requestData, authConfig);
      setSuccess(true)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage("Unable to add rent point.")
      }
    }

    setIsLoading(false);
  };

  return success
    ? (
      <Paper
        sx={{ m: 5, p: 5, backgroundColor: "#ddd", textAlign: "center" }}
      >
        <Avatar sx={{ m: "5px auto" }}>
          <Done />
        </Avatar>
        <Typography variant="h4">
          {"RentPoint added, back to "}
          <br/>
          <Link style={{ textDecoration: 'none' }} to="/rent-points">Rent points</Link>
        </Typography >
      </Paper>
    ) : (
      <Paper
        sx={{ m: 5, p: 5, backgroundColor: "#ddd", textAlign: "center" }}
      >
        <Spinner isOpen={isLoading} />
        <Avatar sx={{ m: "5px auto" }}>
          <Add />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add rent point
        </Typography>
        <Box
          component="form"
          onSubmit={handleOnSubmit}
          sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            label="address"
            name="address"
            value = {address}
            onChange={a => setAddress(a.target.value)}
            autoFocus
          />
          <TextField
              margin="normal"
              required
              fullWidth
              id="city"
              label="city"
              name="city"
              value = {city}
              onChange={a => setCity(a.target.value)}
              autoFocus
          />
          {errorMessage != ""
            ? <Alert severity="error">{errorMessage}</Alert>
            : <></>
          }

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add
          </Button>
          <Link to="/rent-points">
            <Button
              sx={{ mt: 3, mb: 2 }}
              fullWidth
            >
              Back
            </Button>
          </Link>
        </Box>
      </Paper>
    )
};

export default AddRentPoint;