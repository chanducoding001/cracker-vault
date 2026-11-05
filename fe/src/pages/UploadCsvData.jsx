import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Paper,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useModal from "../reusables/useModal";
import ReusableModal from "../reusables/ReusableModal";
import { baseUrlInstance } from "../app/baseUrlInstance";
// import { baseUrlInstance } from "../../app/appUtils";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB

const UploadCsvData = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    showModal,
    modalData,
    modalType,
    modalNavigation,
    setShowModal,
    setModalData,
    setModalType,
    setModalNavigation,
  } = useModal();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setError("");
    setSelectedFile(null);

    if (!file) return;

    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
    ];

    const extension = file.name
      .split(".")
      .pop()
      .toLowerCase();

    if (
      !allowedTypes.includes(file.type) &&
      extension !== "csv"
    ) {
      setError("Only CSV files (.csv) are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(
        `File size exceeds the maximum limit of ${
          MAX_FILE_SIZE / (1024 * 1024)
        } MB.`
      );
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
  };

const handleUpload = async () => {
  if (!selectedFile || loading) return;

  try {
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", selectedFile);
    // const { data, status } = {data:"",status:""}
    console.log("selected file",selectedFile);
    const { data, status } =
      await baseUrlInstance.post(
        import.meta.env.VITE_UPLOAD_CSV_URL,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    // console.log(data);

    if (status === 200||status === 201) {
      setModalData({
        title: "Success",
        content:
          data?.message ||
          "Uploaded successfully!",
      });

      setModalType("success");
      setSelectedFile(null);
      return;
    } else {
      setModalData({
        title: "Failed",
        content:
          data?.message ||
          "Failed to upload CSV file.",
      });

      setModalType("error");
    }
  } catch (err) {
    console.error(err);

    const message =
      err?.response?.data?.message ||
      "Failed to upload CSV file.";

    setError(message);

    setModalData({
      title: "Failed",
      content: message,
    });

    setModalType("error");
  } finally {
    setLoading(false);
    setShowModal(true);
  }
};




return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 650,
          p: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 3,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={600}
        >
          Upload CSV Data
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
        >
          Supported format:
          <strong> .csv</strong>
          <br />
          Maximum allowed file size:
          <strong> 100 MB</strong>
        </Typography>

        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          size="large"
          disabled={loading}
        >
          Choose CSV File

          <input
            hidden
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            disabled={loading}
          />
        </Button>

        {selectedFile && (
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              width: "100%",
              maxWidth: 450,
              backgroundColor: "#fafafa",
            }}
          >
            <Typography>
              <strong>
                Selected File:
              </strong>
            </Typography>

            <Typography sx={{ mt: 1 }}>
              {selectedFile.name}
            </Typography>

            <Typography sx={{ mt: 1 }}>
              <strong>Size:</strong>{" "}
              {(
                selectedFile.size /
                (1024 * 1024)
              ).toFixed(2)}{" "}
              MB
            </Typography>
          </Paper>
        )}

        {error && (
          <Alert
            severity="error"
            sx={{
              width: "100%",
              maxWidth: 450,
            }}
          >
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 3 }}>
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <Button
        variant="contained"
        color="success"
        size="medium"
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        startIcon={
          loading ? (
            <CircularProgress size={18} color="inherit" />
          ) : null
        }
        sx={{
          px: 3,
          py: 1,
          minWidth: 220,
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 2,
          boxShadow: 2,
          "&:hover": {
            boxShadow: 4,
          },
        }}
      >
        {loading ? "Uploading..." : "Upload CSV Data"}
      </Button>
    {/* ))} */}
  </Stack>
</Box>
      </Paper>
      <ReusableModal
    showModal={showModal}
    setShowModal={setShowModal}
    modalData={modalData}
    setModalData={setModalData}
    type={modalType}
    setModalType={setModalType}
    // navigateLocation={modalNavigation}
    />
    </Box>
  );
};

export default UploadCsvData;
