import { useToasts } from 'react-toast-notifications';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import UserDialogEdit from '../../dialog/dialogUser/dialogUserEdit';
import { usersApi } from '../../../apis';
// ----------------------------------------------------------------------

export default function UserMoreMenu({ _id, setIsRemove, setIsEdit, row }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);

  const { addToast } = useToasts();

  const handleClickOpenDialogDelete = () => {
    setOpenDialogDelete(true);
  };

  const handleCloseDialogDelete = () => {
    setOpenDialogDelete(false);
  };

  const handleClickOpenDialogEdit = () => {
    setOpenDialogEdit(true);
  };

  const handleCloseDialogEdit = () => {
    setOpenDialogEdit(false);
  };

  const removeUserHandler = async () => {
    const result = await usersApi.deleteUser(_id);
    if (result.data.code === 200) {
      handleCloseDialogDelete();
      setIsRemove((prev) => !prev);
      addToast('Remove User Successfully', { appearance: 'success' });
    } else {
      addToast('Something wrong, Please try again!', { appearance: 'warning' });
    }
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={handleClickOpenDialogDelete}
          onClose={() => setIsOpen(false)}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          onClick={handleClickOpenDialogEdit}
          onClose={() => setIsOpen(false)}
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>

      <Dialog
        open={openDialogDelete}
        onClose={handleCloseDialogDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to Remove this user ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialogDelete}>Cancel</Button>
          <Button onClick={removeUserHandler} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <UserDialogEdit
        openDialogEdit={openDialogEdit}
        handleCloseDialogEdit={handleCloseDialogEdit}
        setIsEdit={setIsEdit}
        row={row}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
