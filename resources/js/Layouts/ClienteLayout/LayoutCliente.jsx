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
                    <Toolbar disableGutters>
                        <img className="me-5" alt="logo" style={{maxWidth: 150}} src="/storage/app/logo.jpg"/>

                        <MenuPrincipal/>

                        <Box sx={{flexGrow: 0}}>
                            <a className="btn" href={route('clientes.contato')}
                                    style={{background: 'var(--main-text-color)', color: 'var(--main-color)'}}>
                                Contato
                            </a>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>


            <Box sx={{display: 'flex', width: '100%', minHeight: '84vh'}}>
                <Head title={titlePage}/>
                <Box component="main" sx={{display: 'block', width: '100%', flexGrow: 1, p: {xs: 2, sm: 3}}}>
                    <Container maxWidth="md">
                        {voltar &&
                            <div className="row justify-content-between mb-2 border-bottom mb-4">
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
            <div className="row justify-content-center bg-dark pt-3 ">
                <div className="col-auto mb-3">
                    <a href={route('login')} style={{textDecoration: "none", color: 'white'}}>Login</a>
                </div>
            </div>
        </>
    );
}
