import LayoutAdmin from "@/Layouts/AdminLayout/LayoutAdmin.jsx";
import {Box, Card, CardContent, ListItemButton, Typography} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import StatusIcons from "@/Components/Partials/StatusIcons";

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function ({evento, galerias}) {
    return (
        <LayoutAdmin titlePage="Informações do Evento" menu="eventos"
                     voltar={route('admin.eventos.index')}>
            <section>
                <Card sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <Typography component="div" variant="h5">
                                {evento.nome}
                            </Typography>
                            <Typography className="mb-4" variant="subtitle1" color="text.secondary" component="div">
                                {evento.descricao}
                            </Typography>
                            <Typography className="mb-4" variant="body1" color="text.secondary" component="div">
                                Localidade: {evento.cidade}/{evento.estado}
                            </Typography>
                        </CardContent>
                    </Box>
                    <CardMedia
                        component="img"
                        sx={{width: 200}}
                        image={evento.logo}
                        alt="Imagem"
                    />
                </Card>
            </section>

            <section>
                <div className="row mt-5">
                    <div className="col-4 mb-2"><h6>Galerias do Evento</h6></div>
                    <div className="col-auto mb-2">
                        <a className="btn btn-primary btn-sm" href={route('admin.galerias.create')}>
                            <AddOutlinedIcon fontSize="small"/> Criar Galeria
                        </a>
                    </div>
                </div>

                <List>
                    {galerias.map((item, index) => {
                        return (
                            <ListItemButton key={index} href={route('admin.galerias.show', item.id)}
                                            className="border-bottom">
                                <ListItem disablePadding>
                                    <ListItemAvatar>
                                        <Avatar sx={{width: 100, height: 80}} variant="rounded" alt={item.nome}
                                                src={item.capa}/>
                                    </ListItemAvatar>
                                            <div className="row ms-3" style={{width: '100%'}}>
                                                <div className="col-12"><h6>{item.titulo}</h6></div>
                                                <div className="col-md-3 text-muted">{item.data}</div>
                                                <div className="col-md-3">
                                                    <StatusIcons status={item.status}/>
                                                </div>
                                            </div>
                                </ListItem>
                            </ListItemButton>
                        )
                    })}
                </List>
            </section>

        </LayoutAdmin>
    )
}
