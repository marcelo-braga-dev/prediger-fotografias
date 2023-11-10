import {Box} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import StatusIcons from "@/Components/Partials/StatusIcons.jsx";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import React from "react";
import {router} from "@inertiajs/react";

export default function InfosGaleria({galeria}) {

    function alterarStatus(valor) {
        router.post(route('admin.galerias.alterar-status', galeria.id), {
            status: valor,
            _method: 'put'
        })
    }

    return (
        <Card sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{flex: '1 0 auto'}}>
                    <h6>{galeria.titulo}</h6>
                    <Typography className="mb-2" variant="caption" color="text.secondary"
                                component="div">
                        {galeria.data}
                    </Typography>
                    <Typography className="mb-2" variant="body2" color="text.secondary" component="div">
                        {galeria.descricao}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Evento: {galeria.evento.nome}
                    </Typography>
                    <Typography className="mb-2" variant="body1" color="text.secondary" component="div">
                        Localidade: {galeria.evento.localidade}
                    </Typography>

                    <div className="d-inline">
                        <Typography className="me-2 d-inline" variant="body1"
                                    color="text.secondary" component="span">
                            Status:
                        </Typography>
                        <FormGroup className="d-inline">
                            <FormControlLabel className="d-inline" control={<Switch defaultChecked/>}
                                              label={galeria.status === 'publica' ?
                                                  <small className="text-muted">
                                                      <VisibilityOutlinedIcon color="success"/> Pública
                                                  </small> :
                                                  <span className="text-muted pe-5">
                                                      <VisibilityOffOutlinedIcon/> <small>Privado</small>
                                                  </span>
                                              }
                                              onChange={e => alterarStatus(e.target.checked)}/>
                        </FormGroup>
                        {galeria.status === 'privado' && <span className="">Senha: {galeria.senha}</span>}
                    </div>

                    <Typography className="mt-4" variant="h5" color="info" component="div">
                        Link: {route('clientes.galerias.show', [galeria.token, galeria.id])}
                    </Typography>
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{width: 250}}
                image={galeria.capa}
                alt="Imagem"
            />
        </Card>
    )
}
