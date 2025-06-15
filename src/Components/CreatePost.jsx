import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CreatePost({ setPosts }) {
  const [form, setForm] = useState({ id: "", title: "", body: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosts(prev => [{ ...form, reactions: { likes: 0, dislikes: 0 }, tags: [] }, ...prev]);
    navigate("/");
  };

  return (
    <Box sx={{ width: 500, mx: 'auto', padding: 2, justifyContent: 'center', alignItems: 'center'  }}>
      <Typography variant="h5" mb={2}>Create New Post</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="ID" name="id" value={form.id} onChange={handleChange} required fullWidth />
          <TextField label="Title" name="title" value={form.title} onChange={handleChange} required fullWidth />
          <TextField label="Body" name="body" value={form.body} onChange={handleChange} required multiline rows={4} fullWidth />
          <Button type="submit" variant="contained">Create</Button>
        </Stack>
      </form>
    </Box>
  );
}

export default CreatePost;