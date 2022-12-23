import { Add } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Api, authConfig, isAdmin } from "./Api";
import ComfirmationModal from "./ComfirmationModal";
import Spinner from "./Spinner";
import RentPointListItem from "./RentPointListItem";

const RentPointList = () => {
    const [rentPoints, setRentPoints] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getRentPoints = async () => {
            setIsLoading(true);
            const response = await Api.get("/RentPoint", authConfig);
            setRentPoints(response.data);
            setIsLoading(false);
        }

        getRentPoints();
    }, []);
    return (
        <>
            <Spinner isOpen={isLoading} />
            <Typography component="h1" variant="h4" sx={{ mb: 1 }}>Rent points</Typography>
            {isAdmin() &&
                <Link
                    style={{ textDecoration: 'none' }}
                    to="/rent-points/add"
                >
                    <Button variant="contained" sx={{ mb: 2 }}>
                        <Add color="#000"></Add>
                        Add
                    </Button>
                </Link>
            }
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={1}
            >
                {rentPoints?.map((rentPoint, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <RentPointListItem {...rentPoint}/>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default RentPointList;