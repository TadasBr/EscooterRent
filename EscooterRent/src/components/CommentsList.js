import { Add, Delete, Edit } from "@mui/icons-material";
import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Api, authConfig, isAdmin, userId } from "./Api";
import CommentListItem from "./CommentListItem";
import AddUpdateCommentModal from "./AddUpdateCommentModal";
import Spinner from "./Spinner";

const CommentsList = ({ rentPointId, scooterId }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    const [addCommentModalOpen, setAddCommentModalOpen] = useState(false);

    const handleOpenAddCommentModalOpen = () => {
        setAddCommentModalOpen(true);
    };
    const handleCloseAddCommentModalOpen = () => {
        setAddCommentModalOpen(false);
    };

    useEffect(() => {
        const getComments = async () => {
            setIsLoading(true);
            const response = await Api.get(`/topics/${rentPointId}/scooters/${scooterId}/comments`, authConfig);
            setComments(response.data);
            setIsLoading(false);
        }
        getComments();
    }, [])

    return (
        <>
            <Spinner isOpen={isLoading} />
            <Typography component="h1" variant="h5" sx={{ mb: 1 }}>Comments:</Typography>
                <Button onClick={handleOpenAddCommentModalOpen} variant="contained" sx={{ mb: 2 }}>
                    <Add color="#000"></Add>
                    Add
                </Button>
            <Grid
                container
                rowSpacing={{ md: 2, xs: 1 }}
                alignItems="stretch"
            >
                {comments?.map((comment, index) => (
                    <CommentListItem comment={comment} key={index} />
                ))}
            </Grid>
            
            <AddUpdateCommentModal
                open={addCommentModalOpen}
                handleClose={handleCloseAddCommentModalOpen}
                rentPointId={rentPointId}
                scooterId={scooterId}
            />
        </>
    )
};

export default CommentsList;