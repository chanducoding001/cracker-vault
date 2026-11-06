
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UnAuthorized = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f6fa",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 450,
          width: "100%",
          p: 5,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <BlockIcon
          sx={{
            fontSize: 75,
            color: "#e53935",
            mb: 2,
          }}
        />

        <Typography variant="h4" fontWeight={700} gutterBottom>
          Access Denied
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Sorry! You don't have permission to access this page.
          Please contact the administrator if you believe this is a mistake.
        </Typography>

        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Go Back
        </Button>
      </Paper>
    </Box>
  );
};

export default UnAuthorized;
