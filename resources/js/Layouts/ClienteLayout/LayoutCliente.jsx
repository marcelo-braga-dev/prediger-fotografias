import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {Container} from "@mui/material";
import {Head} from "@inertiajs/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import MenuPrincipal from "@/Layouts/ClienteLayout/Menus/MenuPrincipal/MenuPrincipal";

export default function LayoutCliente({titlePage, voltar, children}) {

    return (<>
            <AppBar position="static" sx={{bgcolor: 'var(--main-color)', color: 'var(--main-text-color)'}}>
                <Container maxWidth="md">
                    <Toolbar disableGutters sx={{display: 'flex'}}>
                        <MenuPrincipal/>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box sx={{display: 'flex', width: '100%', minHeight: '78vh'}}>
                <Head title={titlePage}/>
                <Box component="main" sx={{display: 'block', width: '100%', flexGrow: 1}}>
                    <Container maxWidth="md" className="pt-3">
                        {voltar &&
                            <div className="row justify-content-between border-bottom mb-4">
                                <div className="col-auto mb-1">
                                    <b>{titlePage}</b>
                                </div>
                                <div className="col-auto mb-1">
                                    <a className="text-muted text-decoration-none" href={voltar}>
                                        <ArrowBackIcon sx={{fontSize: 15}}/> voltar
                                    </a>
                                </div>
                            </div>
                        }
                        {children}
                    </Container>
                </Box>
            </Box>

            <div className="text-center bg-dark pt-3 pb-3 mt-5">
                <a href={route('login')} style={{textDecoration: "none", color: 'white'}}>Login</a>
            </div>
        </>
    );
}
