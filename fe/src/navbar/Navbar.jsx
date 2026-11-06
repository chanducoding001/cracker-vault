import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MonitorIcon from '@mui/icons-material/Monitor';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuthenticateCheck from '../auth/useAuthenticateCheck';
import useModal from '../reusables/useModal';
import ReusableModal from '../reusables/ReusableModal';
import { navigationLocations } from '../utils/utils';
import HomeIcon from '@mui/icons-material/Home';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SettingsIcon from '@mui/icons-material/Settings';


export default function Navbar() {
    const [open, setOpen] = React.useState(false);
    const { isLoggedIn } = useAuthenticateCheck();
    const {
    showModal,
    modalData,
    modalType,
    modalNavigation,
    modalAction,
    setModalAction,
    setShowModal,
    setModalData,
    setModalType,
    setModalNavigation,
  } = useModal();
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const sidebarData = [
    {
      icon: <HomeIcon />,
      text: 'Home',
      link: navigationLocations?.home,
    },
    {
      icon: <FileUploadIcon />,
      text: 'Upload CSV Data',
      link: navigationLocations?.uploadCsv,
    },
    {
      icon: <MonitorIcon />,
      text: 'Display Crackers Data',
      link: navigationLocations?.displayCrackers,
    },
    {
      icon: <SettingsIcon />,
      text: 'Settings',
      link: navigationLocations?.settings,
    },

  ];
    
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {sidebarData.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <NavLink to={item.link} style={{ 
                // backgroundColor: 'yellow',
                width: '100%',
                textDecoration: 'none', color: 'inherit',display: 'flex', alignItems: 'center',justifyContent:'center' }}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" 
      sx={{ 
        backgroundColor: 'rgba(255, 107, 0, 1)' 
    }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cracker Vault
          </Typography>
          {
            isLoggedIn ? (
              <>
              
              <Button variant="outlined" color="inherit" onClick={() => {

                localStorage.removeItem('user');
                navigate('/login');
                // window.location.href = '/login';
                
              }}>
                Log out
              </Button>
              <Drawer open={open} onClose={toggleDrawer(false)}
          sx={{
    '& .MuiDrawer-paper': {
      backgroundColor: 'rgba(255, 248, 231, 1)',
    },
  }}
          >
        {DrawerList}
      </Drawer>
              </>
            ) : (
              <Button variant="outlined" color="inherit" onClick={() => {
              }}>
                Log in
              </Button>
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
    <Box>
      <Outlet/>
    </Box>
    <ReusableModal
      showModal={showModal}
      setShowModal={setShowModal}
      modalData={modalData}
      setModalData={setModalData}
      modalType={modalType}
      setModalType={setModalType}
      modalNavigation={modalNavigation}
      setModalNavigation={setModalNavigation}
      modalAction={modalAction}
      setModalAction={setModalAction}
    />
    </>
  );
}
