import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Stack, AppBar, Toolbar } from '@material-ui/core';
// components
//
// import Searchbar from './Searchbar';
import Logo from '../../components/Logo';
import AccountPopover from './AccountPopover';
// import LanguagePopover from './LanguagePopover';
// import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {};

export default function DashboardNavbar() {
  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ px: 2.5, py: 3 }}>
          <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <Logo />
          </Box>
        </Box>

        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={{ xs: 0.5, sm: 1.5 }}>
          {/* <LanguagePopover />
          <NotificationsPopover /> */}
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
