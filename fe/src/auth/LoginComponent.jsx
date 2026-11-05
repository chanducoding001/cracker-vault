// import React from 'react'

// const LoginComponent = () => {
//   return (
//     <div>LoginComponent</div>
//   )
// }

// export default LoginComponent;



import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
// import UniversalModal from "../../features/UniversalModal";
// import { apiDetails, navigationLocations, ROLES } from "../../utils/utils";
import useModal from "../reusables/useModal";
import ReusableModal from "../reusables/ReusableModal";
import { baseUrlInstance } from "../app/baseUrlInstance";
// import { useDispatch } from "react-redux";
// import { inputStyle } from "../signUp/SignUp";
// import { loginApi } from "../../app/thunkApiCalls";
// import { setUser } from "../../app/apiSlicer";

const inputStyle = {
  input: { color: "white" },
  label: { color: "rgba(255,255,255,0.8)" },
};

const LoginComponent = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    showModal,
    modalData,
    modalType,
    modalNavigation,
    modalAction,
    setModalAction,
    setShowModal,
    setModalData,
    setModalType,
    setModalNavigation,
  } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const [redirectPath, setRedirectPath] = useState("");
  // const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });



  const onSubmit = async (values, { resetForm }) => {
    console.log("Submitting login form with values:", values);
    try {
      const response = await baseUrlInstance.post(
        import.meta.env.VITE_LOGIN_URL,
        values
      );
      if(response.status===200){
        localStorage.setItem("user","crackerVault");
    setModalData({
      title: "Login Attempt",
      content: `Login successful with the Email: ${values.email}`,
    });
    setModalType("success");
    
    resetForm();
      }else{
        setModalData({
      title: "Login Attempt",
      content: response.message,
    });
    setModalType("error");
      }
      
        setShowModal(true);
    
    } catch (error) {
      setModalData({
      title: "Login Attempt",
      content: error?.message,
    });
    setModalType("error");
    setShowModal(true);

    }
    
  }
  return (
    <>
      {/*  Animated Water Background */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="sm">
          {/*  Glass Card */}
          <Card
            sx={{
              // backdropFilter: "blur(20px)",
              // background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 4,
              // boxShadow: "0 25px 80px rgba(0,0,0,0.25)",
              // color: "white",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Welcome Back
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  opacity: 0.8,
                  mb: 2,
                }}
              >
                Login to continue your journey
              </Typography>

              <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 3 }} />

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ values, errors, touched, handleChange }) => (
                  <Form>
                    {/* EMAIL */}
                    <TextField
                      fullWidth
                      name="email"
                      label="Email"
                      value={values.email}
                      onChange={handleChange}
                      margin="normal"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      // sx={inputStyle}
                      sx={{
                        input: { color: "black" },
                        label: { color: "rgba(18, 2, 2, 0.8)" }
                        // label: { color: "rgba(255,255,255,0.8)" }
                      }}
                    />

                    {/* PASSWORD */}
                    <TextField
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange}
                      margin="normal"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      // sx={inputStyle}
                      sx={{
                        input: { color: "black" },
                        label: { color: "rgba(18, 2, 2, 0.8)" }
                        // label: { color: "rgba(255,255,255,0.8)" }
                      }}
                      // sx={{
                      //   input: { color: "white" },
                      //   label: { color: "rgba(255,255,255,0.8)" }
                      // }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword((p) => !p)}
                              sx={{ color: "black" }}
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    {/* LOGIN BUTTON */}
                    <Button
                      fullWidth
                      type="submit"
                      disabled={loading}
                      variant="outlined"
                      // sx={{
                      //   mt: 3,
                      //   py: 1.4,
                      //   borderRadius: 2,
                      //   fontWeight: "bold",
                      //   color: "white",
                      //   background: "linear-gradient(135deg, #00c6ff, #0072ff)",
                      //   boxShadow: "0 10px 30px rgba(0, 198, 255, 0.4)",
                      //   "&:hover": {
                      //     transform: "translateY(-2px)",
                      //     boxShadow: "0 15px 40px rgba(0, 198, 255, 0.6)",
                      //   },
                      // }}
                    >
                      {loading ? (
                        <CircularProgress size={22} sx={{ color: "white" }} />
                      ) : (
                        "Login"
                      )}
                    </Button>

                  
                    
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* MODAL */}
      <ReusableModal
        modalData={modalData}
        setModalData={setModalData}
        showModal={showModal}
        setShowModal={setShowModal}
        navigateLocation={"/"}
        modalType={modalType}
        setModalType={setModalType}
      />
    </>
  );
};

export default  LoginComponent;
