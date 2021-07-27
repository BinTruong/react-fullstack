// import * as Yup from 'yup';
// import { useState } from 'react';
// // import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// // import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import { Icon } from '@iconify/react';
// import { useFormik, Form, FormikProvider } from 'formik';
// import eyeFill from '@iconify/icons-eva/eye-fill';
// import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
// import { LoadingButton } from '@material-ui/lab';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import { booksApi } from '../../../apis';

// export default function BookDialogEdit({
//   openDialogEdit,
//   handleCloseDialogEdit,
//   setIsEdit,
//   row,
//   setIsOpen
// }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const { _id, cover, title, category, description, author, owner } = row;
//   const [categoryChanged, setCategoryChanged] = useState(category._id);

//   const handleChangeCategory = (event) => {
//     setCategoryChanged(event.target.value);
//   };
//   const RegisterSchema = Yup.object().shape({
//     title: Yup.string().required('Title name required'),
//     description: Yup.string()
//       .min(2, 'Too Short!')
//       .max(50, 'Too Long!')
//       .required('Description required'),
//     author: Yup.string().max(30, 'author must be a valid').required('Author is required')
//     // password: Yup.string().required('Password is required')
//   });

//   const updateBookHandler = async (_id, cover, title, category, description, author) => {
//     const data = {
//       title,
//       category,
//       description,
//       author
//     };
//     const result = await booksApi.updateBook(_id, data);
//     if (result.data.code === 200) {
//       handleCloseDialogEdit();
//       setIsEdit((prev) => !prev);
//       setIsOpen(false);
//     }
//   };

//   const formik = useFormik({
//     initialValues: {
//       title,
//       description,
//       author
//     },
//     validationSchema: RegisterSchema,
//     onSubmit: (values) => {
//       updateBookHandler(
//         _id,
//         values.cover,
//         values.title,
//         values.description,
//         values.firstName,
//         values.author,
//         roleUser
//       );
//     }
//   });

//   const { errors, touched, handleSubmit, getFieldProps } = formik;
//   return (
//     <div>
//       <Dialog
//         open={openDialogEdit}
//         onClose={handleCloseDialogEdit}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">Edit User</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             <FormikProvider value={formik}>
//               <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
//                 <Stack spacing={3} m={1}>
//                   <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
//                     <TextField
//                       fullWidth
//                       label="First name"
//                       {...getFieldProps('firstName')}
//                       error={Boolean(touched.firstName && errors.firstName)}
//                       helperText={touched.firstName && errors.firstName}
//                     />

//                     <TextField
//                       fullWidth
//                       label="Last name"
//                       {...getFieldProps('lastName')}
//                       error={Boolean(touched.lastName && errors.lastName)}
//                       helperText={touched.lastName && errors.lastName}
//                     />
//                   </Stack>

//                   <TextField
//                     fullWidth
//                     // autoComplete="username"
//                     type="text"
//                     label="User name"
//                     {...getFieldProps('username')}
//                     error={Boolean(touched.username && errors.username)}
//                     helperText={touched.username && errors.username}
//                   />

//                   <TextField
//                     fullWidth
//                     autoComplete="current-password"
//                     type={showPassword ? 'text' : 'password'}
//                     label="Password"
//                     {...getFieldProps('password')}
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
//                             <Icon icon={showPassword ? eyeFill : eyeOffFill} />
//                           </IconButton>
//                         </InputAdornment>
//                       )
//                     }}
//                     // error={Boolean(touched.password && errors.password)}
//                     // helperText={touched.password && errors.password}
//                   />

//                   <FormControl fullWidth>
//                     <InputLabel id="demo-simple-select-label">Role</InputLabel>
//                     <Select
//                       labelId="demo-simple-select-label"
//                       id="demo-simple-select"
//                       value={roleUser}
//                       label="Role"
//                       onChange={handleChangeCategory}
//                     >
//                       <MenuItem value="normal">Normal</MenuItem>
//                       <MenuItem value="contributor">Contributor</MenuItem>
//                       <MenuItem value="admin">Admin</MenuItem>
//                     </Select>
//                   </FormControl>

//                   <LoadingButton
//                     fullWidth
//                     size="large"
//                     type="submit"
//                     variant="contained"
//                     // loading={isSubmitting}
//                   >
//                     Update
//                   </LoadingButton>
//                 </Stack>
//               </Form>
//             </FormikProvider>
//           </DialogContentText>
//         </DialogContent>
//         {/* <DialogActions>
//           <Button onClick={handleCloseDialogEdit}>Disagree</Button>
//           <Button onClick={handleCloseDialogEdit} autoFocus>
//             Agree
//           </Button>
//         </DialogActions> */}
//       </Dialog>
//     </div>
//   );
// }
