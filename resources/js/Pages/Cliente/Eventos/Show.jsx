import LayoutCliente from "@/Layouts/ClienteLayout/LayoutCliente.jsx";
import {Box, Card, CardContent, ListItemButton, Typography} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import StatusIcons from "@/Components/Partials/StatusIcons.jsx";
import * as React from "react";

export default function ({evento, galerias}) {
    return (
        <LayoutCliente voltar={route('clientes.eventos.index', 'fdsx')}>
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
                </div>

                <List>
                    {galerias.map((item, index) => {
                        return (
                            <ListItemButton key={index}  href={route('clientes.galerias.show', [item.token, item.id])}
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
        </LayoutCliente>
    )
}
