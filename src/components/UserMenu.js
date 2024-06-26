// UserMenu.js
import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router-dom';


const UserMenu = () => {
  const navigate = useNavigate();

  return (
    <Drawer variant='permanent'>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/home')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/transactions')}>
            <ListItemIcon>
              <AppRegistrationIcon />
            </ListItemIcon>
            <ListItemText primary={'Registro de Transações'} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/history')}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary={'Histórico de Transações'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default UserMenu;
