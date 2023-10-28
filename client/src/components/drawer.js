import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from 'react-router-dom';
import Avatar from '@mui/joy/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import HistoryIcon from '@mui/icons-material/History';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



export default function MiniDrawer({role, pageTitle}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [userRole, setUserRole] = React.useState(role);
  console.log(userRole === 'Admin')
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const LogOut = () => {
    console.log("logout");
    
    localStorage.setItem('user', {})
    localStorage.setItem('token', "")
    window.history.pushState({}, document.title, window.location.pathname);

    navigate("/");
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
  <Toolbar>
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={handleDrawerOpen}
      edge="start"
      sx={{
        marginRight: 5,
        ...(open && { display: 'none' }),
      }}
    >
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" noWrap component="div">

      {pageTitle}

    </Typography>
    
    {/* Add custom styling to the Avatar to move it to the far right */}
    <>
    <Avatar
      color="neutral"
      size="sm"
      variant="soft"
      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
      aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
      sx={{
        marginLeft: 'auto', // Move the Avatar to the right
      }}
    />
    <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={LogOut}>Logout</MenuItem>
              </Menu>
    </>
  </Toolbar>
</AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
      {/* Use the Link component to specify the "to" prop */}
      <Link to="/home" style={{ textDecoration: 'none' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <HomeIcon/>
          </ListItemIcon>
          <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </Link>
    </ListItem>

    

    {/* { localStorage.getItem('type') === 'Admin' ? ( */}
    { userRole === 'Admin' ? (
  <>
    <ListItem disablePadding sx={{ display: 'block' }}>
      {/* Use the Link component to specify the "to" prop */}
      <Link to="/all-professors" style={{ textDecoration: 'none' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <GroupIcon/>
          </ListItemIcon>
          <ListItemText primary="add professor" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </Link>
    </ListItem>

    <ListItem disablePadding sx={{ display: 'block' }}>
      {/* Use the Link component to specify the "to" prop */}
      <Link to="/add-professor" style={{ textDecoration: 'none' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <PersonAddIcon/>
          </ListItemIcon>
          <ListItemText primary="all professors" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </Link>
    </ListItem>

    <ListItem disablePadding sx={{ display: 'block' }}>
      {/* Use the Link component to specify the "to" prop */}
      <Link to="/admin-demandes" style={{ textDecoration: 'none' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <RuleFolderIcon/>
          </ListItemIcon>
          <ListItemText primary="Demandes" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </Link>
    </ListItem>
  </>
) : localStorage.getItem('type') === 'Professeur' ? (
  /* Content for Professors */
  <ListItem disablePadding sx={{ display: 'block' }}>
    {/* Use the Link component to specify the "to" prop */}
    <Link to="/demandes" style={{ textDecoration: 'none' }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary="Demandes" sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </Link>
  </ListItem>
) : null}

 {/* <<<<<<< HEAD */}
 
 {/* ======= */}
{/* { localStorage.getItem('type') === 'Professeur' ? ( */}

 
  { userRole === 'Professeur' ? ( 
  <>
    <ListItem disablePadding sx={{ display: 'block' }}>
      {/* Use the Link component to specify the "to" prop */}
      <Link to="/historiques" style={{ textDecoration: 'none' }}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <HistoryIcon/>
          </ListItemIcon>
          <ListItemText primary="historiques" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </Link>
    </ListItem>
    <ListItem disablePadding sx={{ display: 'block' }}>
    {/* Use the Link component to specify the "to" prop */}
    <Link to="/prof-demandes" style={{ textDecoration: 'none' }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          <CollectionsBookmarkIcon />
        </ListItemIcon>
        <ListItemText primary="All Demandes" sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </Link>
  </ListItem>

  
  </>
) : null}

        
    
          
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      
    </Box>
  );
}