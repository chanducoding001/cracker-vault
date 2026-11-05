
import React from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import {
  LightMode,
  Celebration,
  LocalFireDepartment,
} from "@mui/icons-material";

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #FFF8E1 0%, #FFE0B2 50%, #FFCCBC 100%)",
        p: 3,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={4}
          sx={{
            textAlign: "center",
            p: { xs: 4, md: 7 },
            borderRadius: 5,
            background:
              "linear-gradient(135deg, #7F1D1D, #C2410C, #F57C00)",
            color: "#FFF8E1",
            border: "2px solid #FFD54F",
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            mb={3}
          >
            <LightMode sx={{ fontSize: 45, color: "#FFD54F" }} />
            <LocalFireDepartment
              sx={{ fontSize: 45, color: "#FFCA28" }}
            />
            <Celebration sx={{ fontSize: 45, color: "#FFD54F" }} />
          </Stack>

          <Typography
            variant="h3"
            fontWeight={800}
            sx={{
              color: "#FFD54F",
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            शुभ दीपावली
          </Typography>

          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ mb: 3 }}
          >
            Happy Diwali!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: 600,
              mx: "auto",
              lineHeight: 2,
              color: "#FFF3E0",
            }}
          >
            Celebrate the festival of lights, happiness and prosperity.
            May every diya bring new opportunities, every spark
            bring joy, and every celebration create beautiful memories.
          </Typography>

          <Box
            sx={{
              width: 100,
              height: 3,
              bgcolor: "#FFD54F",
              mx: "auto",
              my: 4,
              borderRadius: 5,
            }}
          />

          <Typography
            variant="h6"
            fontWeight={700}
            sx={{ color: "#FFD54F" }}
          >
            Lights • Happiness • Prosperity
          </Typography>

          <Typography
            variant="body2"
            sx={{ mt: 2, color: "#FFE0B2" }}
          >
            A celebration of traditions, colours and togetherness.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
