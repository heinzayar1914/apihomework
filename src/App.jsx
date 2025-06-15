import React, { useState, useEffect } from "react";
import { Box, CssBaseline } from "@mui/material";
import Header from "./Components/Header";
import Body from "./Components/Body";
import CreatePost from "./Components/CreatePost";
import PostDetail from "./Components/PostDetail";
import EditPost from "./Components/EditPost";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("posts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (posts.length === 0) {
      fetch("https://dummyjson.com/posts?limit=10")
        .then((response) => response.json())
        .then((data) => setPosts(data.posts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  return (
    <>
      <CssBaseline />
      <Router>
        <Box
          sx={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            alignItems: "center",
          }}
        >
          <Header />
          <Box component="main" sx={{ flexGrow: 1, mt: 2 }}>
            <Routes>
              <Route path="/" element={<Body posts={posts} setPosts={setPosts} />} />
              <Route path="/posts/:id" element={<PostDetail posts={posts} />} />
              <Route path="/create" element={<CreatePost setPosts={setPosts} />} />
              <Route path="/edit/:id" element={<EditPost posts={posts} setPosts={setPosts} />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </>
  );
}

export default App;