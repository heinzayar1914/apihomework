import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Chip, Avatar, Divider, Button } from "@mui/material";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";

function Body ({ posts, setPosts }) {
    const [loading, setloading] = useState(true);

    useEffect(() => {
        if (!posts) {
            fetch("https://dummyjson.com/posts?limit=10")
                .then((response) => response.json())
                .then((data) => {
                    setPosts(data.posts);
                    setloading(false);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    setloading(false);
                });
        } else {
            setloading(false);
        }
    }, [posts, setPosts]);

    const handleDelete = async (id) => {
        // Remove from UI immediately
        setPosts(posts.filter(post => post.id !== id));
        // Optionally, send DELETE request to API
        await fetch(`https://dummyjson.com/posts/${id}`, { method: "DELETE" });
    };

    if (!posts) return <p>Loading...</p>;
    if (posts.length === 0) return <p>No data available</p>;

    return (
        <Box sx={{ width: '500', mx: 'auto', padding: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Stack spacing={0}>
                {posts.map((post, idx) => (
                    <React.Fragment key={post.id}>
                        <Box sx={{ py: 3 }}>
                            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                <Avatar sx={{ width: 32, height: 32, bgcolor: "#eee", color: "#333", fontSize: 16 }}>
                                    {post.userId}
                                </Avatar>
                                <Typography variant="subtitle2" color="text.secondary">
                                    u/user{post.userId}
                                </Typography>
                                <Stack direction="row" spacing={0.5} ml={2}>
                                    {post.tags.map((tag, idx) => (
                                        <Chip key={idx} label={tag} size="small" variant="outlined" />
                                    ))}
                                </Stack>
                            </Stack>
                            <Typography
                              component={Link}
                              to={`/posts/${post.id}`}
                              variant="h6"
                              sx={{ fontWeight: 600, mb: 1, textDecoration: "none", color: "inherit", cursor: "pointer" }}
                            >
                              {post.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {post.body}
                            </Typography>
                            <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 1 }}>
                                <Stack direction="row" spacing={0.5} alignItems="center">
                                    <ThumbUpAltOutlinedIcon fontSize="small" />
                                    <Typography variant="body2">{post.reactions.likes}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={0.5} alignItems="center">
                                    <ThumbDownAltOutlinedIcon fontSize="small" />
                                    <Typography variant="body2">{post.reactions.dislikes}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={0.5} alignItems="center">
                                    <VisibilityOutlinedIcon fontSize="small" />
                                    <Typography variant="body2">{post.views || 0}</Typography>
                                </Stack>
                                {/* Edit and Delete buttons */}
                                <Button
                                  component={Link}
                                  to={`/edit/${post.id}`}
                                  size="small"
                                  startIcon={<EditIcon />}
                                  sx={{ ml: 2 }}
                                  variant="outlined"
                                >
                                  Edit
                                </Button>
                                <Button
                                    size="small"
                                    startIcon={<DeleteIcon />}
                                    color="error"
                                    variant="outlined"
                                    onClick={() => handleDelete(post.id)}
                                >
                                    Delete
                                </Button>
                            </Stack>
                        </Box>
                        {idx !== posts.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </Stack>
        </Box>
    );
}

export default Body;