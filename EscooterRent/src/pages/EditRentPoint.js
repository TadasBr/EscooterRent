import { Alert, Avatar, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api, authConfig } from "../components/Api";
import Spinner from "../components/Spinner";
import { Link, useParams } from "react-router-dom";
import { Add, Done, Edit } from "@mui/icons-material";

const EditRentPoint = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const { rentPointId } = useParams();
    const [ rentPoint, setRentPoint] = useState(null);
    const [ rentPointAddress, setRentPointAddress] = useState(null);
    const [ rentPointCity, setRentPointCity] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        const getRentPoint = async () => {
            setIsLoading(true);
            const response = await Api.get(`/RentPoint/RentPointsById/${rentPointId}`, authConfig);
            setRentPoint(response.data);
            setRentPointAddress(response.data.address)
            setRentPointCity(response.data.city)
            setIsLoading(false);
        }

        getRentPoint();
    }, []);

    const handleOnSubmit = async (e) => {
        setSuccess(false);
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        const requestData = {
            id: rentPointId,
            city: rentPointCity,
            address: rentPointAddress,
        };

        try {
            await Api.put(`RentPoint/${rentPointId}`, requestData, authConfig);
            setSuccess(true)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage("Unable to edit rent point.")
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
                <Edit />
            </Avatar>
            <Typography component="h1" variant="h5">
                Edit rent point
            </Typography>
            {rentPoint &&
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
                        autoFocus
                        value={rentPointAddress}
                        onChange={e => setRentPointAddress(e.target.value)}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="city"
                        label="city"
                        name="city"
                        autoFocus
                        value={rentPointCity}
                        onChange={e => setRentPointCity(e.target.value)}
                    />

                    {errorMessage != ""
                        ? <Alert severity="error">{errorMessage}</Alert>
                        : <></>
                    }
                    {success && <Alert severity="success">Rent point edited successfully</Alert>}

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
            <Link to="/rent-points" >
                <Button
                    sx={{ mt: 3, mb: 2 }}
                    fullWidth
                >
                    Back
                </Button>
            </Link>
        </Paper>
    )
};

export default EditRentPoint;