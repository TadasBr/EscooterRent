import {
    Button, Modal, Box, TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Api, authConfig } from './Api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddUpdateCommentModal = ({
    open, handleClose, rentPointId, scooterId, comment
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState(comment ? comment.content : "");


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const requestData = {
            content: formData.get("content"),
        };

        if (comment) {
            await Api.put(`/topics/${rentPointId}/scooters/${scooterId}/comments/${comment.id}`, requestData, authConfig);
        } else {
            await Api.post(`/topics/${rentPointId}/scooters/${scooterId}/comments`, requestData, authConfig);
        }
        
        setIsLoading(false);
        handleClose();
        window.location.href=`/topics/${rentPointId}/scooters/${scooterId}`
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box
                sx={style}
                component="form"
                onSubmit={handleOnSubmit}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="content"
                    label="content"
                    name="content"
                    autofocus
                    multiline
                    rows={4}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <div>
                    <Button type="submit">{comment ? "Save" : "Add"}</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </div>
            </Box>
        </Modal>
    );
}

export default AddUpdateCommentModal;