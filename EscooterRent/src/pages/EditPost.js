import { Alert, Avatar, Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Api, authConfig } from "../components/Api";
import Spinner from "../components/Spinner";
import { Link, useParams } from "react-router-dom";
import { Add, Done } from "@mui/icons-material";

const EditPost = () => {
    const { rentPointId, scooterId } = useParams();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);

    useEffect(() => {
        const getPost = async () => {
            setIsLoading(true);
            const response = await Api.get(`/topics/${rentPointId}/scooters/${scooterId}`, authConfig);
            setPost(response.data);
            setTitle(response.data.title);
            setContent(response.data.content);
            setIsLoading(false);
        };

        getPost();
    }, []);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        const formData = new FormData(e.currentTarget);
        const requestData = {
            title: formData.get("title"),
            content: formData.get("content"),
        };

        try {
            await Api.put(`/topics/${rentPointId}/scooters/${scooterId}`, requestData, authConfig);
            setSuccess(true)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage("Unable to edit post.")
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
                Add post
            </Typography>
            {post &&
                <Box
                    component="form"
                    onSubmit={handleOnSubmit}
                    sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="title"
                        name="title"
                        autoFocus
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
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
                        onChange={e => setContent(e.target.content)}

                    />
                    {errorMessage != ""
                        ? <Alert severity="error">{errorMessage}</Alert>
                        : <></>
                    }
                    {success && <Alert severity="success">Post edited successfully</Alert>}

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

export default EditPost;