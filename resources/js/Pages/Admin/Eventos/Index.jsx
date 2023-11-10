import LayoutAdmin from "@/Layouts/AdminLayout/LayoutAdmin.jsx";
import {ListItemButton, TextField} from "@mui/material";
import * as React from "react";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CardMedia from '@mui/material/CardMedia';

export default function ({eventos}) {

    return (
        <LayoutAdmin menu="eventos">
            <section className="mb-4">
                <div className="row justify-content-between">
                    <div className="col-auto">
                        <TextField label="Pesquisar"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-auto">
                        <a href={route('admin.eventos.create')} className="btn btn-primary">
                            Cadastrar Evento
                        </a>
                    </div>
                </div>
            </section>

            <section>
                <List>
                    {eventos.map((item, index) => {
                        return (
                            <ListItemButton key={index} href={route('admin.eventos.show', item.id)}
                                            className="border-bottom">
                                <ListItem disablePadding>
                                    <CardMedia
                                        component="img"
                                        sx={{width: 150, borderRadius: 1}}
                                        image={item.logo}
                                        alt="Imagem"
                                    />
                                    <ListItemText
                                        className="ps-3"
                                        primary={item.nome}
                                        secondary={<>
                                            <span className="d-block">{item.cidade}/{item.estado}</span>
                                            <span className="d-block">{item.descricao}</span>
                                            {/*<small className="me-3"><b>Galerias:</b></small>*/}
                                            {/*<small className="me-3">Quantidade: 5</small>*/}
                                            {/*<small className="me-3">Última atualização: 21/05/2023</small>*/}
                                        </>
                                        }
                                    />
                                </ListItem>
                            </ListItemButton>
                        )
                    })}
                </List>
            </section>
        </LayoutAdmin>
    )
}
