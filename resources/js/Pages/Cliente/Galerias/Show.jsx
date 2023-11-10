import LayoutCliente from "@/Layouts/ClienteLayout/LayoutCliente.jsx";
import Galeria from "@/Pages/Cliente/Galerias/Show/Galeria.jsx";
import Pastas from "@/Pages/Cliente/Galerias/Show/Pastas.jsx";
import React from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

export default function ({arquivos, pastas, galeria}) {
    return (
        <LayoutCliente titlePage="Galeria" voltar={route('home')}>
            <section className="mb-4">
                <Card sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <Typography component="div" variant="h5">
                                {galeria.titulo}
                            </Typography>
                            <Typography className="mb-4" variant="body1" color="text.secondary" component="div">
                                {galeria.data}
                            </Typography>
                            <Typography className="mb-4" variant="subtitle1" color="text.secondary" component="div">
                                {galeria.descricao}
                            </Typography>

                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Evento: {galeria.evento.nome}
                            </Typography>
                            <Typography className="mb-2" variant="subtitle2" color="text.secondary" component="div">
                                Localidade: {galeria.evento.localidade}
                            </Typography>
                        </CardContent>
                    </Box>
                    <CardMedia
                        component="img"
                        sx={{width: 200}}
                        image={galeria.capa}
                        alt="Imagem"
                    />
                </Card>
            </section>

            <Pastas pastas={pastas} galeria={galeria}/>
            <Galeria arquivos={arquivos}/>
        </LayoutCliente>
    )
}
