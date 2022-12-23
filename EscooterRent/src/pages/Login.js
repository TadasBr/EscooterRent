import { Alert, Avatar, Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { Api } from "../components/Api";
import Spinner from "../components/Spinner";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    const formData = new FormData(e.currentTarget);
    const loginData = {
      userName: formData.get("userName"),
      password: formData.get("password"),
    };

    try {
      const { data } = await Api.post("/Auth/login", loginData);
      sessionStorage.setItem("accessToken", data.accessToken);
      sessionStorage.setItem("username", data.user.userName);
      sessionStorage.setItem("isAdmin", data.isAdmin);
      window.location.href = "/";
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage("Unable to login with provided credentials.")
      }
    }

    setIsLoading(false);
  };

  return (
    <Paper
      sx={{ m: 5, p: 5, backgroundColor: "#ddd", textAlign: "center"}}
    >
      <Spinner isOpen={isLoading} />
      <Avatar sx={{m: "5px auto"}}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <Box
        component="form"
        onSubmit={handleOnSubmit}
        sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="userName"
          label="Username"
          name="userName"
          autoComplete="username"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
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
          Log in
        </Button>
      </Box>
    </Paper>
  )
};

export default Login;