import { Delete, Done, Edit } from "@mui/icons-material";
import { Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Api, authConfig, isAdmin, userId } from "../components/Api";
import ComfirmationModal from "../components/ComfirmationModal";
import CommentsList from "../components/CommentsList";
import Spinner from "../components/Spinner";

const Scooter = () => {
    const { rentPointId, scooterId } = useParams();
    const [scooter, setScooter] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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

    useEffect(() => {
        const getScooter = async () => {
            setIsLoading(true);
            const response = await Api.get(`/ElectricScooter/ScootersByScooterId/${scooterId}`, authConfig);
            setScooter(response.data);
            setIsLoading(false);
        };

        getScooter();
    }, []);

    return (
        <>
            <Spinner isOpen={isLoading} />
            {scooter &&
                <>
                    <Paper
                        sx={{ p: 2 }}
                    >
                        <div>
                            <Typography componet="h1" variant="h3">{scooter.model} {scooter.brand}</Typography>
                            <Typography variant="caption">{scooter.maxSpeed}km/h</Typography>
                            <Typography variant="caption">{scooter.pricePerDay}e/day</Typography>
                        </div>
                        {(isAdmin()) &&
                            <ButtonGroup>
                                <Button>
                                    <Edit />
                                    Edit
                                </Button>
                                <Button
                                    sx={{ color: "#880808" }}
                                    onClick={handleOpenDeleteModal}
                                >
                                    <Delete />
                                    Delete
                                </Button>
                            </ButtonGroup>
                        }
                        <Box
                            sx={{ mt: 1, mb: 3 }}
                        >
                            <Typography variant="body1">
                                {/*{post.content}*/}
                            </Typography>
                        </Box>
                        {/*<CommentsList rentPointId={rentPointId} scooterId={scooterId} />*/}
                    </Paper>

                </>}
            <ComfirmationModal
                open={deleteModalOpen}
                message="Are you sure you want to delete this post?"
                handleClose={handleCloseDeleteModal}
                handleComfirm={deletePost}
            />
        </>
    )
}

export default Scooter;