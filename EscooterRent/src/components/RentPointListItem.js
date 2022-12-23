import { Delete, Edit } from "@mui/icons-material";
import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Api, authConfig, isAdmin } from "./Api";
import ComfirmationModal from "./ComfirmationModal";
import Spinner from "./Spinner";

const RentPointListItem = ({ address, city, id}) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
    };
    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    const deleteRentPoint = async () => {
        setIsLoading(true);
        await Api.delete(`/RentPoint/${id}`, authConfig);
        setIsLoading(false);
        window.location.href = `/rent-points`;
    }

    return (
        <>
            <Spinner isOpen={isLoading} />
            <Grid container>
                <Grid xs={12} md={8} item>
                    <Link to={`/rent-points/${id}`} style={{ textDecoration: "none" }}>
                        <Button>
                            <Typography component="h1" variant="h6">{address}  </Typography>
                            <Typography component="h1" variant="h6">{city}</Typography>
                        </Button>
                    </Link>

                </Grid>
                {isAdmin() &&
                    <Grid xs={12} md={4} item>
                        <ButtonGroup>
                            <Button
                                onClick={() => window.location.href = `/rent-points/${id}/edit`}
                            >
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
                    </Grid>
                }
            </Grid>
            <ComfirmationModal
                open={deleteModalOpen}
                message="Are you sure you want to delete this rent point?"
                handleClose={handleCloseDeleteModal}
                handleComfirm={deleteRentPoint}
            />
        </>
    )
};

export default RentPointListItem;