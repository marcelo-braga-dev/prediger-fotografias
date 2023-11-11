import React, {useEffect, useState} from 'react';

// material-ui
import {useTheme} from '@mui/material/styles';
import {Box, Container, Toolbar, useMediaQuery} from '@mui/material';

// project import
import Drawer from './Drawer/index.jsx';
import Header from './Header/index.jsx';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Head} from "@inertiajs/react";
import Card from "@mui/material/Card";
import ModalsAllerts from "@/Components/Modals/AlertsModals.jsx";
import ModalsAlerts from "@/Components/Modals/AlertsModals.jsx";

const MainLayout = ({titlePage, card, menu, children, voltar}) => {
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
            <Head title={titlePage}/>
            <ModalsAlerts/>
            <Header open={open} titlePage={titlePage} handleDrawerToggle={handleDrawerToggle}/>
            <Drawer open={open} menu={menu} handleDrawerToggle={handleDrawerToggle}/>
            <Box component="main" sx={{display: 'block', width: '100%', flexGrow: 1, p: {xs: 2, sm: 3}}}>
                <Container maxWidth="md" className="p-0 mt-5">
                    {voltar &&
                        <div className="row justify-content-between mb-2">
                            <div className="col-auto mb-1">
                                {/*<b>{titlePage}</b>*/}
                            </div>
                            <div className="col-auto mb-1">
                                <a className="text-muted" href={voltar}><ArrowBackIcon sx={{fontSize: 15}}/></a>
                            </div>
                        </div>
                    }
                    {card ? <Card className="p-3 pt-4">{children}</Card> : children}
                </Container>
            </Box>
        </Box>
    );
};

export default MainLayout;
