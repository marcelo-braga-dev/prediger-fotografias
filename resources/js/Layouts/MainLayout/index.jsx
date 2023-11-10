import {useEffect, useState} from 'react';

// material-ui
import {useTheme} from '@mui/material/styles';
import {Box, Toolbar, useMediaQuery} from '@mui/material';

// project import
import Drawer from './Drawer/index.jsx';
import Header from './Header/index.jsx';

const MainLayout = (props) => {
    const theme = useTheme();
    const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));

    const [open, setOpen] = useState(true);
    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        setOpen(!matchDownLG);
    }, [matchDownLG]);

    return (
        <Box sx={{display: 'flex', width: '100%'}}>
            <Header open={open} handleDrawerToggle={handleDrawerToggle}/>
            <Drawer open={open} handleDrawerToggle={handleDrawerToggle}/>
            <Box component="main" sx={{width: '100%', flexGrow: 1, p: {xs: 2, sm: 3}}}>
                {props.children}
            </Box>
        </Box>
    );
};

export default MainLayout;
