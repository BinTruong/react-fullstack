import * as Yup from 'yup';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFormik, Form, FormikProvider } from 'formik';
import { Stack, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { categoriesApi } from '../../../apis';

export default function CategoryDialogAdd({ open, handleClose, setIsCreate }) {
  const RegisterSchema = Yup.object().shape({
    title: Yup.string()
      .max(30, 'title must be a valid title address')
      .required('Username is required')
  });

  const addUserHandler = async (title) => {
    const result = await categoriesApi.createCategory({ title });
    if (result.data.code === 200) {
      handleClose();
      setIsCreate((prev) => !prev);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      addUserHandler(values.title);
      values.title = '';
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add Category</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3} m={1}>
                  <TextField
                    fullWidth
                    // autoComplete="title"
                    type="text"
                    label="Category"
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />

                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    // loading={isSubmitting}
                  >
                    Add
                  </LoadingButton>
                </Stack>
              </Form>
            </FormikProvider>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
