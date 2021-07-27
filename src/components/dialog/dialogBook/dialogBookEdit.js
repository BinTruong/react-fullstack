import * as Yup from 'yup';
import { useState } from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { booksApi } from '../../../apis';

export default function BookDialogEdit({
  openDialogEdit,
  handleCloseDialogEdit,
  setIsEdit,
  row,
  setIsOpen,
  listCategory
}) {
  const { _id, cover, title, category, description, author } = row;
  const [categoryChanged, setCategoryChanged] = useState(category._id);
  const [file, setFile] = useState(`https://nodejs-auth-restapi-crud.herokuapp.com/${cover}`);
  const [coverImage, setCoverImage] = useState(cover);

  const fileHandler = (event) => {
    console.log(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = function (e) {
      setFile(e.target.result);
    };
    setCoverImage(event.target.files[0]);
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleChangeCategory = (event) => {
    setCategoryChanged(event.target.value);
  };
  const RegisterSchema = Yup.object().shape({
    title: Yup.string().required('Title required'),
    description: Yup.string().min(2, 'Too Short!').required('Description required'),
    author: Yup.string().required('Author is required')
  });

  const updateBookHandler = async (_id, title, description, author, categoryChanged) => {
    const data = {
      title,
      category: categoryChanged,
      description,
      author
    };
    if (coverImage) {
      data.cover = coverImage;
    }
    const result = await booksApi.updateBook(_id, data);
    if (result.data.code === 200) {
      handleCloseDialogEdit();
      setIsEdit((prev) => !prev);
      setIsOpen(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title,
      description,
      author
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      updateBookHandler(_id, values.title, values.description, values.author, categoryChanged);
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <div>
      <Dialog
        open={openDialogEdit}
        onClose={handleCloseDialogEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Book</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3} m={1}>
                  <Stack>
                    {file && <img src={file} style={{ height: '200px' }} alt="cover" />}
                    <input type="file" onChange={fileHandler} />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <TextField
                      fullWidth
                      label="Title"
                      {...getFieldProps('title')}
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Category</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={categoryChanged}
                        label="Category"
                        onChange={handleChangeCategory}
                      >
                        {listCategory.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item.title}
                          </MenuItem>
                        ))}

                        {/* <MenuItem value="contributor">Contributor</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem> */}
                      </Select>
                    </FormControl>
                  </Stack>

                  <TextField
                    fullWidth
                    // autoComplete="author"
                    type="text"
                    label="Author"
                    {...getFieldProps('author')}
                    error={Boolean(touched.author && errors.author)}
                    helperText={touched.author && errors.author}
                  />

                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={4}
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />

                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    // loading={isSubmitting}
                  >
                    Update
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleCloseDialogEdit}>Disagree</Button>
          <Button onClick={handleCloseDialogEdit} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
