import LayoutCliente from "@/Layouts/ClienteLayout/LayoutCliente.jsx";
import {ListItemButton} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import CardMedia from "@mui/material/CardMedia";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";

export default function ({eventos}) {
    return (
        <LayoutCliente>
            <div className="row justify-content-between">
                <div className="col-auto pt-4">
                    <h5>Eventos</h5>
                </div>
                {/*<div className="col-auto">*/}
                {/*    <TextField label="Pesquisar..."/>*/}
                {/*</div>*/}
            </div>

            <section>
                <List className="">
                    {eventos.map((item, index) => {
                        return (
                            <ListItemButton key={index} href={route('clientes.eventos.show', [item.token, item.id])}
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
                                            <span className="d-block mb-2">{item.descricao}</span>
                                            <small className="me-3">Galerias: {item.galerias_qtd}</small>
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
        </LayoutCliente>
    )
}
