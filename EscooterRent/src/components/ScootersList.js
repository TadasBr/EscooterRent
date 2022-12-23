import { Add } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Api, authConfig, isAdmin } from "./Api";
import ScooterListItem from "./ScooterListItem";
import Spinner from "./Spinner";
import RentPointListItem from "./RentPointListItem";

const ScootersList = ({ rentPointAddress, rentPointId, showOnlyPending }) => {
    const [scooters, setScooters] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getscooters = async () => {
            setIsLoading(true);
            const url = `/ElectricScooter/ScootersByRentId/${rentPointId}`;
            const response = await Api.get(url, authConfig);
            setScooters(response.data);
            setIsLoading(false);
        }

        getscooters();
    }, []);
    return (
        <>
            <Spinner isOpen={isLoading} />
            <Typography component="h1" variant="h4" sx={{ mb: 1 }}>{rentPointAddress}</Typography>
            {!showOnlyPending ?
                <Link
                    style={{ textDecoration: 'none' }}
                    to={`/rent-points/${rentPointId}/scooters/add`}
                >
                    <Button variant="contained" sx={{ mb: 2 }}>
                        <Add color="#000"></Add>
                        Add
                    </Button>
                </Link>
                :
                <Typography component="h1" variant="h6">scooters waiting for approval:</Typography>
            }
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={1}
            >
                {scooters?.map((scooter, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>

                        <ScooterListItem
                            brand={scooter.brand}
                            model={scooter.model}
                            maxDistance={scooter.maxDistance}
                            pricePerDay={scooter.pricePerDay}
                            maxSpeed={scooter.maxSpeed}
                            rentPointId={rentPointId}
                            scooterId={scooter.id}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default ScootersList;