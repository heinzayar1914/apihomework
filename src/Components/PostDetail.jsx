import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Box, Typography, Stack, Chip, Avatar, Button } from "@mui/material";
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function PostDetail({ posts, setPosts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find(p => String(p.id) === String(id));

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    await fetch(`https://dummyjson.com/posts/${id}`, { method: "DELETE" });
    alert("Post deleted!");
    navigate(`/posts/${form.id}`);
  };

  if (!post) return <p>Post not found</p>;

  return (
    <Box sx={{ width: '500', mx: 'auto', padding: 2, justifyContent: 'center', alignItems: 'center' }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: "#eee", color: "#333", fontSize: 16 }}>
          {post.userId}
        </Avatar>
        <Typography variant="subtitle2" color="text.secondary">
          u/user{post.userId}
        </Typography>
        <Stack direction="row" spacing={0.5} ml={2}>
          {post.tags && post.tags.map((tag, idx) => (
            <Chip key={idx} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>
      </Stack>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        {post.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {post.body}
      </Typography>
      <Stack direction="row" spacing={3} alignItems="center" sx={{ mb: 2 }}>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <ThumbUpAltOutlinedIcon fontSize="small" />
          <Typography variant="body2">{post.reactions?.likes}</Typography>
        </Stack>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <ThumbDownAltOutlinedIcon fontSize="small" />
          <Typography variant="body2">{post.reactions?.dislikes}</Typography>
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
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Stack>
    </Box>
  );
}

export default PostDetail;