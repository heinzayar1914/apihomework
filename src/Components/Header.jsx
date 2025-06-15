import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" color="transparent" elevation={0} sx={{px: 8, py: 2}}>
            <Toolbar>
                <Typography variant="h4" component={Link} to="/" sx={{ fontWeight: 'bold', flexGrow: 1, cursor: "pointer", mr: 2, textDecoration: 'none', color: 'inherit' }}>
                    Posts
                </Typography>
                <Button variant="contained" onClick={() => navigate("/create")} startIcon={<AddIcon />}>Create</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;