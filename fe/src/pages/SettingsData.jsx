
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

import { baseUrlInstance } from "../app/baseUrlInstance";
import useModal from "../reusables/useModal";
import ReusableModal from "../reusables/ReusableModal";

// -------------------- CONSTANTS --------------------

const INITIAL_VALUES = {
  name: "",
  email: "",
  mobile: "",
  address: "",
  password: "",
};

const VALIDATION_SCHEMA = Yup.object({
  name: Yup.string().required("Name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  mobile: Yup.string()
    .required("Mobile is required"),

  address: Yup.string()
    .required("Address is required"),

  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

const FIELD_CONFIG = [
  { name: "name", label: "Change Name" },
  { name: "email", label: "Change Email", type: "email" },
  { name: "mobile", label: "Change Mobile", type: "tel" },
  { name: "address", label: "Change Address" },
];

// -------------------- COMPONENT --------------------

const SettingsData = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    showModal,
    modalData,
    modalType,
    setShowModal,
    setModalData,
    setModalType,
  } = useModal();

  // -------------------- API SUBMISSION --------------------

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);

    try {
      const response = await baseUrlInstance.post(
        import.meta.env.VITE_SETTINGS_URL,
        values
      );

      if (response.status >= 200 && response.status < 300) {
        setModalData({
          title: "Settings Updated",
          content: `Settings successfully updated for ${values.email}`,
        });

        setModalType("success");
        resetForm();
      }
    } catch (error) {
      setModalData({
        title: "Settings Update Failed",
        content:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      });

      setModalType("error");
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  // -------------------- FIELD STYLES --------------------

  const fieldStyles = {
    input: {
      color: "black",
    },
    label: {
      color: "rgba(18, 2, 2, 0.8)",
    },
  };

  // -------------------- RENDER --------------------

  return (
    <>
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
          <Card
            sx={{
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 4,
              marginTop:"10px"

            }}
          >
            <CardContent sx={{ p: 3 }}>

              {/* HEADER */}

              <Typography
                variant="h5"
                fontWeight={700}
                textAlign="center"
              >
                Settings
              </Typography>

              <Typography
                variant="body2"
                textAlign="center"
                sx={{ opacity: 0.8, mb: 2 }}
              >
                Modify your account information
              </Typography>

              <Divider sx={{ mb: 3 }} />

              {/* FORM */}

              <Formik
                initialValues={INITIAL_VALUES}
                validationSchema={VALIDATION_SCHEMA}
                onSubmit={onSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                }) => (
                  <Form>

                    {/* GENERAL FIELDS */}

                    {FIELD_CONFIG.map((field) => (
                      <TextField
                        key={field.name}
                        fullWidth
                        name={field.name}
                        label={field.label}
                        type={field.type || "text"}
                        value={values[field.name]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        error={
                          touched[field.name] &&
                          Boolean(errors[field.name])
                        }
                        helperText={
                          touched[field.name] &&
                          errors[field.name]
                        }
                        sx={fieldStyles}
                      />
                    ))}

                    {/* PASSWORD FIELD */}

                    <TextField
                      fullWidth
                      name="password"
                      label="Change Password"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="normal"
                      error={
                        touched.password &&
                        Boolean(errors.password)
                      }
                      helperText={
                        touched.password && errors.password
                      }
                      sx={fieldStyles}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                setShowPassword((prev) => !prev)
                              }
                              edge="end"
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

                    {/* SUBMIT BUTTON */}

                    <Button
                      fullWidth
                      type="submit"
                      disabled={loading}
                      variant="outlined"
                      sx={{ mt: 2 }}
                    >
                      {loading ? (
                        <CircularProgress size={22} />
                      ) : (
                        "Change the Data"
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
        navigateLocation="/"
        modalType={modalType}
        setModalType={setModalType}
      />
    </>
  );
};

export default SettingsData;





// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Container,
//   TextField,
//   Typography,
//   CircularProgress,
//   IconButton,
//   InputAdornment,
//   Divider,
// } from "@mui/material";

// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { Formik, Form } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import useModal from "../reusables/useModal";
// import { baseUrlInstance } from "../app/baseUrlInstance";
// import ReusableModal from "../reusables/ReusableModal";


// const inputStyle = {
//   input: { color: "white" },
//   label: { color: "rgba(255,255,255,0.8)" },
// };

// const SettingsData = () => {
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);

//   const {
//     showModal,
//     modalData,
//     modalType,
//     modalNavigation,
//     modalAction,
//     setModalAction,
//     setShowModal,
//     setModalData,
//     setModalType,
//     setModalNavigation,
//   } = useModal();
//   const [showPassword, setShowPassword] = useState(false);
//   const [redirectPath, setRedirectPath] = useState("");
//   // const dispatch = useDispatch();

//   const initialValues = {
//     name:"",
//     email: "",
//     password: "",
//     mobile:"",
//     address:""
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string().email("Invalid name").required("Name is required"),
//     address: Yup.string().required("Address is required"),
//     mobile: Yup.string().required("Mobile is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string()
//       .min(6, "Minimum 6 characters")
//       .required("Password is required"),
//   });



//   const onSubmit = async (values, { resetForm }) => {
//     console.log("Submitting login form with values:", values);
//     try {
//       const response = await baseUrlInstance.post(
//         import.meta.env.VITE_SETTINGS_URL,
//         values
//       );
//       if(response.status===200){
//     setModalData({
//       title: "Settings Attempt",
//       content: `Settings successful with the Email: ${values.email}`,
//     });
//     setModalType("success");
    
//     resetForm();
//       }else{
//         setModalData({
//       title: "Settings Attempt",
//       content: response.message,
//     });
//     setModalType("error");
//       }
      
//         setShowModal(true);
    
//     } catch (error) {
//       setModalData({
//       title: "Login Attempt",
//       content: error?.message,
//     });
//     setModalType("error");
//     setShowModal(true);

//     }
    
//   }
//   const names = ['name','email','mobile','address'];
//   return (
//     <>
//       {/*  Animated Water Background */}
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         <Container maxWidth="sm">
//           {/*  Glass Card */}
//           <Card
//             sx={{
//               // backdropFilter: "blur(20px)",
//               // background: "rgba(255,255,255,0.15)",
//               border: "1px solid rgba(255,255,255,0.3)",
//               borderRadius: 4,
//               // boxShadow: "0 25px 80px rgba(0,0,0,0.25)",
//               // color: "white",
//             }}
//           >
//             <CardContent>
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontWeight: 700,
//                   textAlign: "center",
//                 }}
//               >
//                 Welcome Back
//               </Typography>

//               <Typography
//                 variant="body2"
//                 sx={{
//                   textAlign: "center",
//                   opacity: 0.8,
//                   mb: 2,
//                 }}
//               >
//                 Modify the data
//               </Typography>

//               <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)", mb: 3 }} />

//               <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={onSubmit}
//               >
//                 {({ values, errors, touched, handleChange }) => (
//                   <Form>
//                     {/* EMAIL */}
//                     {
//                         names.map((eachName,item)=>(
//                             <TextField
//                             key={eachName}
//                       fullWidth
//                       name={initialValues[eachName]}
//                       label={`Change ${eachName}`}
//                       value={values[eachName]}
//                       onChange={handleChange}
//                       margin="normal"
//                       error={touched[eachName] && Boolean(errors[eachName])}
//                       helperText={touched[eachName] && errors[eachName]}
//                       // sx={inputStyle}
//                       sx={{
//                         input: { color: "black" },
//                         label: { color: "rgba(18, 2, 2, 0.8)" }
//                         // label: { color: "rgba(255,255,255,0.8)" }
//                       }}
//                     />
//                         ))
//                     }

//                     {/* PASSWORD */}
//                     <TextField
//                       fullWidth
//                       name="password"
//                       label="Change Password"
//                       type={showPassword ? "text" : "password"}
//                       value={values.password}
//                       onChange={handleChange}
//                       margin="normal"
//                       error={touched.password && Boolean(errors.password)}
//                       helperText={touched.password && errors.password}
//                       // sx={inputStyle}
//                       sx={{
//                         input: { color: "black" },
//                         label: { color: "rgba(18, 2, 2, 0.8)" }
//                       }}
                      
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <IconButton
//                               onClick={() => setShowPassword((p) => !p)}
//                               sx={{ color: "black" }}
//                             >
//                               {showPassword ? (
//                                 <VisibilityOff />
//                               ) : (
//                                 <Visibility />
//                               )}
//                             </IconButton>
//                           </InputAdornment>
//                         ),
//                       }}
//                     />

//                     {/* LOGIN BUTTON */}
//                     <Button
//                       fullWidth
//                       type="submit"
//                       disabled={loading}
//                       variant="outlined"
//                     >
//                       {loading ? (
//                         <CircularProgress size={22} sx={{ color: "white" }} />
//                       ) : (
//                         "Change the data"
//                       )}
//                     </Button>
//                   </Form>
//                 )}
//               </Formik>
//             </CardContent>
//           </Card>
//         </Container>
//       </Box>

//       {/* MODAL */}
//       <ReusableModal
//         modalData={modalData}
//         setModalData={setModalData}
//         showModal={showModal}
//         setShowModal={setShowModal}
//         navigateLocation={"/"}
//         modalType={modalType}
//         setModalType={setModalType}
//       />
//     </>
//   );
// };

// export default  SettingsData;
