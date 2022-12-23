import { Approval, Delete, Done, Edit } from "@mui/icons-material";
import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Api, authConfig, isAdmin, userId } from "./Api";
import ComfirmationModal from "./ComfirmationModal";
import Spinner from "./Spinner";

/*
        "id": 1,
        "brand": "xiaomi",
        "model": "pro1",
        "maxDistance": 20,
        "pricePerDay": 25,
        "maxSpeed": 30,
        "rentPointId": 1
* */

const ScooterListItem = ({ brand, model, maxDistance, pricePerDay, maxSpeed, scooterId, rentPointId }) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
    };
    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    const deletePost = async () => {
        setIsLoading(true);
        await Api.delete(`/ElectricScooter/Scooters/${scooterId}`, authConfig);
        handleCloseDeleteModal();
        setIsLoading(false);
        window.location.href = `/rent-points/${rentPointId}`;
    }
    const approvePost = async () => {
        setIsLoading(true);
        await Api.post(`/ElectricScooter/Scooters/scooters/${scooterId}/approve`, {}, authConfig);
        setIsLoading(false);
        window.location.href = `/`;
    }
    return (
        <>
            <Spinner open={isLoading} />
            <Grid container>
                <Grid item xs={12} md={8}>
                    <Link to={`/rent-points/${rentPointId}/scooters/${scooterId}`} style={{ textDecoration: "none" }}>
                        <Button>
                            <Typography component="h1" variant="h6">{brand}</Typography>
                            <Typography component="h1" variant="h6">{model}</Typography>
                            <Typography component="h1" variant="h6">{maxDistance}</Typography>
                            <Typography component="h1" variant="h6">{pricePerDay}</Typography>
                            <Typography component="h1" variant="h6">{maxSpeed}</Typography>
                        </Button>
                    </Link>
                </Grid>
                {(isAdmin()) &&
                    <Grid item xs={12} md={4}>
                        <ButtonGroup>
                            <Button
                                sx={{ color: "#880808" }}
                                onClick={handleOpenDeleteModal}
                            >
                                <Delete />
                                Delete
                            </Button>
                            <Button
                                onClick={() => window.location.href = `/rent-points/${rentPointId}/scooters/${scooterId}/edit`}
                                >
                                <Edit />
                                Edit
                            </Button>
                        </ButtonGroup>
                    </Grid>
                }
            </Grid>
            <ComfirmationModal
                open={deleteModalOpen}
                message="Are you sure you want to delete this post?"
                handleClose={handleCloseDeleteModal}
                handleComfirm={deletePost}
            />
        </>
    )
};

export default ScooterListItem;