import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';

let user = "";
const pages = [];
if(user == ""){
  pages.push( { label: 'Home', path: '/' },
    { label: 'Join as HR Manager', path: '/joinhrmanager' },
    { label: 'Join as Employee', path: '/joinemployee' },
    { label: 'Login', path: '/login'},
   )
}

if (user == "employee") {
  pages.push({ label: 'Home', path: '/' },
    { label: 'My Asset', path: '/myasset' },
    { label: 'My Team', path: '/myteam' },
    { label: 'Request for Asset', path: '/assetrequest' },
    { label: 'Profile', path: '/myprofile' },
    { label: 'Log Out', path: '/logout' })
}
if (user == "admin") {
  pages.push({ label: 'Home', path: '/' },
    { label: 'Asset List', path: '/assetlist' },
    { label: 'Add Asset', path: '/addasset' },
    { label: 'All Request', path: '/allrequest' },
    { label: 'Employee List', path: '/myemployeelist' },
    { label: 'Add Employee', path: '/addemployee' },
    { label: 'Log Out', path: '/logout' })
}






const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{
      backgroundColor: '#f2f2f2', // Set background to white
      color: 'red',          // Adjust text color for contrast
      boxShadow: 'none',
      // Optional: Remove shadow for a flat design
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,

              color: 'black',
              textDecoration: 'none',
            }}
          >
            {user == "admin" ? "Company Logo" : "Company Photo"}
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map(({ label, path }) => (
                <MenuItem key={label} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink
                      to={path}
                      style={({ isActive }) => ({
                        textDecoration: 'none',
                        color: isActive ? 'blue' : 'black',
                      })}
                    >
                      {label}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map(({ label, path }) => (
              <Button
                key={label}
                onClick={handleCloseNavMenu}
                component={NavLink}
                to={path}
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: isActive ? 'orange' : 'black',
                })}
                sx={{
                  my: 2, display: 'block', marginRight: "4px", '&:hover': {
                    backgroundColor: 'lightgray', // Change background color on hover
                    color: 'blue', // Change text color on hover
                    borderBottom: '3px solid #fff7ed', // Change border color on hover
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
