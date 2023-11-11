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
                        <div className="row justify-content-between">
                            <div className="col"><h6>{galeria.titulo}</h6></div>
                            <div className="col-auto">
                                <button>
                                    <DeleteOutlineOutlinedIcon onClick={handleOpen} color="error"/>
                                </button>

                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box className="modal-primary">
                                        <h6>Confirmar Exclusão da Galeria</h6>
                                        <p>Deseja excluir essa galeria?</p>
                                        <small className="text-danger">Todos os aqruivos dessa geleria serão excluídos
                                            permanentemente.<br/>
                                            Essa operação é irreversível!</small>
                                        <div className="text-end">
                                            <button className="btn btn-danger" onClick={() => excluirGaleria()}>
                                                Excluir
                                            </button>
                                        </div>
                                    </Box>
                                </Modal>
                            </div>
                        </div>

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

                        <div className="d-inline">
                            <Typography className="me-2 d-inline" variant="body1"
                                        color="text.secondary" component="span">
                                Status:
                            </Typography>
                            <FormGroup className="d-inline">
                                <FormControlLabel className="d-inline" control={<Switch defaultChecked={status}/>}
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
                            {/*{galeria.status === 'privado' && <span className="d-block d-md-inline">Senha: {galeria.senha}</span>}*/}
                        </div>

                        <Typography className="mt-4 text-wrap" variant="h5" color="info" component="div">
                            Link: <br/>{route('clientes.galerias.show', [galeria.token, galeria.id])}
                        </Typography>
                    </CardContent>

                </div>
            </div>
        </Card>
    )
}
