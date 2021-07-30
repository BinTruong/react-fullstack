import { useToasts } from 'react-toast-notifications';
import * as Yup from 'yup';
import { useState } from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFormik, Form, FormikProvider } from 'formik';
import { Stack, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { booksApi } from '../../../apis';

export default function BookDialogAdd({
  open,
  handleClose,
  setIsCreate,
  listCategory,
  defaultCategory
}) {
  const [category, setCategory] = useState(defaultCategory);
  const [file, setFile] = useState(null);
  const [cover, setCover] = useState(null);

  const { addToast } = useToasts();

  const fileHandler = (event) => {
    console.log(event.target.files[0]);
    const reader = new FileReader();
    reader.onload = function (e) {
      setFile(e.target.result);
    };
    setCover(event.target.files[0]);
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleAddCategory = (event) => {
    setCategory(event.target.value);
  };

  const RegisterSchema = Yup.object().shape({
    title: Yup.string().required('Title required'),
    description: Yup.string().min(2, 'Too Short!').required('Description required'),
    author: Yup.string().required('Author is required')
  });

  const addBookHandler = async (title, description, author, category) => {
    const data = {
      title,
      description,
      author,
      category
    };
    if (cover) {
      data.cover = cover;
    }
    const result = await booksApi.createBook(data);
    if (result.data.code === 200) {
      handleClose();
      setIsCreate((prev) => !prev);
      addToast('Add Book Successfully', { appearance: 'success' });
    } else {
      addToast('Something wrong, Please try again!', { appearance: 'warning' });
    }
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      author: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      await addBookHandler(values.title, values.description, values.author, category);
      setCategory(defaultCategory);
      setFile(null);
      values.title = '';
      values.description = '';
      values.author = '';
    }
  });

  const { errors, touched, handleSubmit, getFieldProps, isSubmitting } = formik;
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Book</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3} p={1}>
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
                        value={category}
                        label="Category"
                        onChange={handleAddCategory}
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
                    loading={isSubmitting}
                  >
                    Add
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
