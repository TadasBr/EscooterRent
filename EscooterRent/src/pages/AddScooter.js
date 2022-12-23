import { Alert, Avatar, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api, authConfig } from "../components/Api";
import Spinner from "../components/Spinner";
import { Link, useParams } from "react-router-dom";
import { Add, Done } from "@mui/icons-material";
import ScooterListItem from "../components/ScooterListItem";

const AddScooter = () => {
    const { rentPointId } = useParams();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [maxDistance, setMaxDistance] = useState("");
    const [pricePerDay, setPricePerDay] = useState("");
    const [maxSpeed, setMaxSpeed] = useState("");
    //const [rentPointId, setRentPointId] = useState("");

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        const requestData = {
            brand,
            model,
            maxDistance,
            pricePerDay,
            maxSpeed,
            rentPointId
        };

        try {
            await Api.post(`/ElectricScooter`, requestData, authConfig);
            setSuccess(true)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage("Unable to add scooter.")
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
                    {"Scooter successfully added."}
                    <br/>
                    {"Back to "}
                    <Link style={{ textDecoration: 'none' }} to={`/rent-points/${rentPointId}`}>Rent point</Link>
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
                    Add scooter
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleOnSubmit}
                    sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="brand"
                        label="brand"
                        name="brand"
                        value={brand}
                        onChange={a => setBrand(a.target.value)}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="model"
                        label="model"
                        name="model"
                        value={model}
                        onChange={a => setModel(a.target.value)}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="maxDistance"
                        label="maxDistance"
                        name="maxDistance"
                        value={maxDistance}
                        onChange={a => setMaxDistance(a.target.value)}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="pricePerDay"
                        label="pricePerDay"
                        name="pricePerDay"
                        value={pricePerDay}
                        onChange={a => setPricePerDay(a.target.value)}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="maxSpeed"
                        label="maxSpeed"
                        name="maxSpeed"
                        value={maxSpeed}
                        onChange={a => setMaxSpeed(a.target.value)}
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
                    <Link to={`ElectricScooter`}>
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

export default AddScooter;