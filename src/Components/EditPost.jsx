import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

function EditPost({ posts, setPosts }) {
  const { id } = useParams();
  const [form, setForm] = useState({ id: "", title: "", body: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const post = posts.find((p) => String(p.id) === String(id));
    if (post) {
      setForm({ id: post.id, title: post.title, body: post.body });
    }
    setLoading(false);
  }, [id, posts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosts((prev) =>
      prev.map((p) =>
        String(p.id) === String(id)
          ? { ...p, title: form.title, body: form.body }
          : p
      )
    );
    navigate(`/posts/${form.id}`); // Redirect to PostDetail page
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Box sx={{ width: 500, mx: 'auto', padding: 2, justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h5" mb={2}>
        Edit Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="ID" name="id" value={form.id} disabled fullWidth />
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Body"
            name="body"
            value={form.body}
            onChange={handleChange}
            required
            multiline
            rows={4}
            fullWidth
          />
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default EditPost;