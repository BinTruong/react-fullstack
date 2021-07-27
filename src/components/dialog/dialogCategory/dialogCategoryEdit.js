import { useToasts } from 'react-toast-notifications';
import * as Yup from 'yup';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFormik, Form, FormikProvider } from 'formik';
import { Stack, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { categoriesApi } from '../../../apis';

export default function CategoryDialogEdit({
  openDialogEdit,
  handleCloseDialogEdit,
  setIsEdit,
  row,
  setIsOpen
}) {
  const { _id, title } = row;

  const { addToast } = useToasts();

  const RegisterSchema = Yup.object().shape({
    title: Yup.string().max(30, 'title must be a valid').required('title is required')
    // password: Yup.string().required('Password is required')
  });

  const updateUserHandler = async (_id, title) => {
    const result = await categoriesApi.updateCategory(_id, {
      title
    });
    if (result.data.code === 200) {
      handleCloseDialogEdit();
      setIsEdit((prev) => !prev);
      setIsOpen(false);
      addToast('Edit Category  Successfully', { appearance: 'success' });
    } else {
      addToast('Something wrong, Please try again!', { appearance: 'warning' });
    }
  };

  const formik = useFormik({
    initialValues: {
      title
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      updateUserHandler(_id, values.title);
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
        <DialogTitle id="alert-dialog-title">Edit Category</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3} m={1}>
                  <TextField
                    fullWidth
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
                    Update
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
