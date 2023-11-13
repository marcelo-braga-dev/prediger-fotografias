import {Box} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import React, {useState} from "react";
import {router} from "@inertiajs/react";

import Modal from '@mui/material/Modal';

export default function InfosGaleria({galeria}) {
    const [status, setStatus] = useState(galeria.status === 'publica');

    function alterarStatus(valor) {
        router.post(route('admin.galerias.alterar-status', galeria.id), {
            status: valor,
            _method: 'put'
        })
    }

    const excluirGaleria = () => {
        router.post(route('admin.galerias.destroy', galeria.id), {
            _method: 'delete'
        })
        setOpen(false);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Card sx={{justifyContent: 'space-between'}}>
            <div className="row g-0">
                <CardMedia
                    className="col-md-3"
                    component="img"
                    sx={{width: 250}}
                    image={galeria.capa}
                    alt="Imagem"
                />
                <div className="col-md-9">
                    <CardContent>
                        <h6>{galeria.titulo}</h6>

                        <Typography className="mb-2" variant="caption" color="text.secondary" component="div">
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
                    </CardContent>
                </div>
            </div>
        </Card>
    )
}
