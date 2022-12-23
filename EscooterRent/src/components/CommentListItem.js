import { Delete, Edit } from "@mui/icons-material";
import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AddUpdateCommentModal from "./AddUpdateCommentModal";
import { Api, authConfig, isAdmin, userId } from "./Api";
import ComfirmationModal from "./ComfirmationModal";

const CommentListItem = ({ comment }) => {
    const { rentPointId, scooterId } = useParams();
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
    };
    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    const [editCommentModalOpen, setEditCommentModalOpen] = useState(false);

    const handleOpenEditCommentModalOpen = () => {
        setEditCommentModalOpen(true);
    };
    const handleCloseEditCommentModalOpen = () => {
        setEditCommentModalOpen(false);
    };


    const deleteComment = async () => {
        setIsLoading(true);
        await Api.delete(`/topics/${rentPointId}/scooters/${scooterId}/comments/${comment.id}`, authConfig);
        handleCloseDeleteModal();
        setIsLoading(false);
        window.location.href = `/topics/${rentPointId}/scooters/${scooterId}`;
    }
    return <>
        <Grid item xs={12} md={7}>
            <Typography variant="body2">
                {comment.content}
            </Typography>
        </Grid>
        <Grid item xs={7} md={3}>
            <Typography variant="caption" color="#bbb">
                {new Date(comment.posted).toLocaleString()}
            </Typography>
        </Grid>
        {(isAdmin() || comment.userId == userId()) &&
            <Grid item xs={5} md={2}>
                <ButtonGroup>
                    {comment.userId == userId() &&
                        <Button onClick={handleOpenEditCommentModalOpen}>
                            <Edit />
                        </Button>}
                    <Button
                        sx={{ color: "#880808" }}
                        onClick={handleOpenDeleteModal}>
                        <Delete />
                    </Button>
                </ButtonGroup>
            </Grid>}
        <ComfirmationModal
            open={deleteModalOpen}
            message="Are you sure you want to delete this comment?"
            handleClose={handleCloseDeleteModal}
            handleComfirm={deleteComment}
        />
        <AddUpdateCommentModal
            open={editCommentModalOpen}
            handleClose={handleCloseEditCommentModalOpen}
            rentPointId={rentPointId}
            scooterId={scooterId}
            comment={comment}
        />
    </>;
}

export default CommentListItem;