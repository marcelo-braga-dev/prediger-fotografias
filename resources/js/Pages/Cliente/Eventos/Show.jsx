import LayoutCliente from "@/Layouts/ClienteLayout/LayoutCliente.jsx";
import {Card, CardContent, ListItemButton, Typography} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import * as React from "react";

export default function ({evento, galerias}) {
    return (
        <LayoutCliente titlePage="Evento" voltar={route('clientes.eventos.index', 'fdsx')}>
            <section>
                <Card sx={{justifyContent: 'space-between'}}>
                    <div className="row p-2 justify-content-center">

                        <CardMedia
                            className="col-md-4"
                            component="img"
                            image={evento.logo}
                            alt="Imagem"
                        />

                        <div className="col mb-0 align-items-center">
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
                                <Typography variant="body2" color="text.secondary" component="div">
                                    Galerias: {evento.galerias_qtd}
                                </Typography>
                            </CardContent>
                        </div>
                    </div>
                </Card>
            </section>

            <section>
                <h6 className="mt-5">Galerias do Evento</h6>

                <List>
                    {galerias.map((item, index) => {
                        return (
                            <ListItemButton key={index} href={route('clientes.galerias.show', [item.token, item.id])}
                                            className="border-bottom">
                                <ListItem disablePadding>
                                    <ListItemAvatar>
                                        <Avatar sx={{width: 100, height: 80}} variant="rounded" alt={item.nome}
                                                src={item.capa}/>
                                    </ListItemAvatar>
                                    <div className="row ms-3" style={{width: '100%'}}>
                                        <div className="col-12"><h6>{item.titulo}</h6></div>
                                        <div className="col-md-3 text-muted">{item.data}</div>
                                    </div>
                                </ListItem>
                            </ListItemButton>
                        )
                    })}
                </List>
                {galerias.length === 0 && <span>Não há galerias.</span>}
            </section>
        </LayoutCliente>
    )
}
