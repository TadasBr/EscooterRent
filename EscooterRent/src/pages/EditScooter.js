import { Alert, Avatar, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api, authConfig } from "../components/Api";
import Spinner from "../components/Spinner";
import { Link, useParams } from "react-router-dom";
import { Add, Done } from "@mui/icons-material";

const EditScooter = () => {
    const { scooterId } = useParams();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [scooter, setScooter] = useState(null);
    const [id, setId] = useState(null);
    const [brand, setBrand] = useState(null);
    const [model, setModel] = useState(null);
    const [maxDistance, setMaxDistance] = useState(null);
    const [pricePerDay, setPricePerDay] = useState(null);
    const [maxSpeed, setMaxSpeed] = useState(null);
    const [rentPointId, setRentPointId] = useState(null);

    useEffect(() => {
        const getPost = async () => {
            setIsLoading(true);
            const response = await Api.get(`/ElectricScooter/ScootersByScooterId/${scooterId}`, authConfig);
            setScooter(response.data);
            setId(response.data.id)
            setBrand(response.data.brand);
            setModel(response.data.model);
            setMaxDistance(response.data.maxDistance);
            setPricePerDay(response.data.pricePerDay);
            setMaxSpeed(response.data.maxSpeed);
            setRentPointId(response.data.rentPointId)
            setIsLoading(false);
        };

        getPost();
    }, []);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        const requestData = {
            id,
            brand,
            model,
            maxDistance,
            pricePerDay,
            maxSpeed,
            rentPointId
        };
        try {
            await Api.put(`/ElectricScooter/Scooters/${scooterId}`, requestData, authConfig);
            setSuccess(true)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage("Unable to edit scooter.")
            }
        }

        setIsLoading(false);
    };

    return (
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
            {scooter &&
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
                        autoFocus
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="model"
                        label="model"
                        name="model"
                        autoFocus
                        value={model}
                        onChange={e => setModel(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="maxDistance"
                        label="maxDistance"
                        name="maxDistance"
                        autoFocus
                        value={maxDistance}
                        onChange={e => setMaxDistance(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="pricePerDay"
                        label="pricePerDay"
                        name="pricePerDay"
                        autoFocus
                        value={pricePerDay}
                        onChange={e => setPricePerDay(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="maxSpeed"
                        label="maxSpeed"
                        name="maxSpeed"
                        autoFocus
                        value={maxSpeed}
                        onChange={e => setMaxSpeed(e.target.value)}
                    />
                    {errorMessage != ""
                        ? <Alert severity="error">{errorMessage}</Alert>
                        : <></>
                    }
                    {success && <Alert severity="success">Scooter edited successfully</Alert>}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Edit
                    </Button>
                </Box>
            }
        </Paper>
    )
};

export default EditScooter;