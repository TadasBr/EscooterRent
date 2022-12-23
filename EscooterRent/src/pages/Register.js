import { Alert, Avatar, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { Api } from "../components/Api";
import Spinner from "../components/Spinner";
import { containsNumber, hasEmailValidFormat, hasUpperCase, isValidLength } from "../components/Utils";
import { Done, DoneOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Register = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [successfulRegistration, setSuccessfulRegistration] = useState(false);

    const ErrorMessages = {
        MISSMATCHING_PASSWORDS: "Passwords do not match.",
        INCORRECT_PASSWORD_FORMAT:
            "A password must contain 8 characters and contain at least one number, upper case and lower case characters.",
        INCORRECT_EMAIL_FORMAT: "Invalid email format",
        UNEXPECTED_ERROR: "Unable to register with provided data",
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        const formData = new FormData(e.currentTarget);
        const registrationData = {
            email: formData.get("email"),
            userName: formData.get("userName"),
            password: formData.get("password"),
            repeatPassword: formData.get("repeatPassword"),
        };

        if (!hasEmailValidFormat(registrationData.email)) {
            setErrorMessage(ErrorMessages.INCORRECT_EMAIL_FORMAT);
            return;
        }

        if (
            !hasUpperCase(registrationData.password) ||
            !containsNumber(registrationData.password) ||
            !isValidLength(registrationData.password)
        ) {
            setErrorMessage(ErrorMessages.INCORRECT_PASSWORD_FORMAT);
            return;
        }

        if (registrationData.password !== registrationData.repeatPassword) {
            setErrorMessage(ErrorMessages.MISSMATCHING_PASSWORDS);
            return;
        }

        setIsLoading(true);

        try {
            await Api.post("/Auth/register", registrationData);
            setSuccessfulRegistration(true);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(ErrorMessages.UNEXPECTED_ERROR)
            }
        }

        setIsLoading(false);
    };

    return successfulRegistration
        ? (
            <Paper
                sx={{ m: 5, p: 5, backgroundColor: "#ddd", textAlign: "center" }}
            >
                <Avatar sx={{ m: "5px auto" }}>
                    <Done />
                </Avatar>
                <Typography variant="h4">
                    {"Registration successful, proceed to "}
                    <Link style={{ textDecoration: 'none' }} to="/login">Login</Link>
                </Typography >
            </Paper>
        )
        : (
            <Paper
                sx={{ m: 5, p: 5, backgroundColor: "#ddd", textAlign: "center" }}
            >
                <Spinner isOpen={isLoading} />
                <Avatar sx={{ m: "5px auto" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleOnSubmit}
                    sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="repeatPassword"
                        label="Repeat password"
                        type="password"
                        id="repeatPassword"
                        autoComplete="current-password"
                    />

                    {errorMessage !== ""
                        ? <Alert severity="error">{errorMessage}</Alert>
                        : <></>
                    }

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </Box>
            </Paper>
        )
};

export default Register;