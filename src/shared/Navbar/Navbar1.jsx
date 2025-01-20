// import * as React from 'react';
// import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import { NavLink } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
// import useAxiosPublic from '../../hooks/useAxiosPublic';
// import { useQuery } from '@tanstack/react-query';

// function Navbar() {
//   const axiosPublic = useAxiosPublic();
//   const { user, logOut } = useAuth(); // Assuming `logout` is a function from `useAuth` to handle user logout.

//   // Fetch user data
  const { data: navUser = null, refetch } = useQuery({
    queryKey: ['navUser', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosPublic.get(`/users?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });
  

//   // Logout handler
//   const handleLogout = () => {
//     logOut(); // Replace with your actual logout logic (e.g., clearing tokens).
//     console.log('User logged out');
//   };

//   // Define navigation pages
//   const pages = [
//     { label: 'Home', path: '/' },
//   ];

//   if (!navUser) {
//     pages.push(
//       { label: 'Join as HR Manager', path: '/joinhrmanager' },
//       { label: 'Join as Employee', path: '/joinemployee' },
//       { label: 'Login', path: '/login' }
//     );
//   } else if (navUser.role === 'employee') {
//     pages.push(
//       { label: 'My Asset', path: '/myasset' },
//       { label: 'My Team', path: '/myteam' },
//       { label: 'Request for Asset', path: '/assetrequest' },
//       { label: 'Profile', path: '/myprofile' },
//       { label: 'Log Out', path: '/logout', onClick: handleLogout }
//     );
//   } else if (navUser.role === 'admin') {
//     pages.push(
//       { label: 'Asset List', path: '/assetlist' },
//       { label: 'Add Asset', path: '/addasset' },
//       { label: 'All Request', path: '/allrequest' },
//       { label: 'Employee List', path: '/myemployeelist' },
//       { label: 'Add Employee', path: '/addemployee' },
//       { label: 'Log Out', path: '/logout', onClick: handleLogout }
//     );
//   }

//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static" sx={{ backgroundColor: '#f2f2f2', color: 'black', boxShadow: 'none' }}>
//       <Container maxWidth="2xl">
//         <Toolbar disableGutters>
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               color: 'black',
//               textDecoration: 'none',
//             }}
//           >
//             {user?.role === 'admin' ? 'Company Logo' : 'Company Photo'}
//           </Typography>

//           {/* Mobile Menu */}
//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//               keepMounted
//               transformOrigin={{ vertical: 'top', horizontal: 'left' }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{ display: { xs: 'block', md: 'none' } }}
//             >
//               {pages.map(({ label, path, onClick }) => (
//                 <MenuItem
//                   key={label}
//                   onClick={(e) => {
//                     if (onClick) {
//                       e.preventDefault();
//                       onClick();
//                     }
//                     handleCloseNavMenu();
//                   }}
//                 >
//                   <Typography textAlign="center">
//                     <NavLink
//                       to={path}
//                       style={({ isActive }) => ({
//                         textDecoration: 'none',
//                         color: isActive ? 'blue' : 'black',
//                       })}
//                     >
//                       {label}
//                     </NavLink>
//                   </Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>

//           {/* Desktop Menu */}
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
//             {pages.map(({ label, path, onClick }) => (
//               <Button
//                 key={label}
//                 onClick={(e) => {
//                   if (onClick) {
//                     e.preventDefault();
//                     onClick();
//                   }
//                   handleCloseNavMenu();
//                 }}
//                 component={NavLink}
//                 to={path}
//                 style={({ isActive }) => ({
//                   textDecoration: 'none',
//                   color: isActive ? 'orange' : 'black',
//                 })}
//                 sx={{
//                   my: 2,
//                   display: 'block',
//                   marginRight: '4px',
//                   '&:hover': {
//                     backgroundColor: 'lightgray',
//                     color: 'blue',
//                   },
//                 }}
//               >
//                 {label}
//               </Button>
//             ))}
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                 <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
//               keepMounted
//               transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               <MenuItem onClick={handleCloseUserMenu}>
//                 <Typography textAlign="center">Profile</Typography>
//               </MenuItem>
//               <MenuItem onClick={handleCloseUserMenu}>
//                 <Typography textAlign="center">Account</Typography>
//               </MenuItem>
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default Navbar;
