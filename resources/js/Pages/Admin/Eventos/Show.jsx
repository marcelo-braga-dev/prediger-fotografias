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
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Modal from "@mui/material/Modal";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {router} from "@inertiajs/react";

export default function ({evento, galerias}) {
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState(evento.status === 'publica');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function alterarStatus(valor) {
        router.post(route('admin.eventos.alterar-status', evento.id), {
            status: valor,
            _method: 'put'
        })
    }

    const excluirEvento = () => {
        router.post(route('admin.eventos.destroy', evento.id), {
            _method: 'delete'
        })
        setOpen(false);
    };

    return (
        <LayoutAdmin titlePage="Informações do Evento" menu="eventos"
                     voltar={route('admin.eventos.index')}>
            <section>
                <Card sx={{justifyContent: 'space-between'}}>
                    <div className="row g-0">
                        <CardMedia
                            className="col-md-3"
                            component="img"
                            sx={{width: 250}}
                            image={evento.logo}
                            alt="Imagem"
                        />
                        <div className="col-md-9">
                            <CardContent>
                                <div className="row justify-content-between">
                                    <div className="col mb-0"><h6>{evento.nome}</h6></div>
                                    <div className="col-auto mb-0">
                                        <button>
                                            <DeleteOutlineOutlinedIcon onClick={handleOpen} color="error"/>
                                        </button>
                                    </div>
                                </div>

                                {evento.descricao &&
                                    <Typography className="mb-4" variant="subtitle1" color="text.secondary"
                                                component="div">
                                        {evento.descricao}
                                    </Typography>}
                                <Typography className="mb-4" variant="body1" color="text.secondary" component="div">
                                    Localidade: {evento.cidade}/{evento.estado}
                                </Typography>

                                <div className="d-inline">
                                    <Typography className="me-2 d-inline" variant="body1"
                                                color="text.secondary" component="span">
                                        Status:
                                    </Typography>
                                    <FormGroup className="d-inline">
                                        <FormControlLabel className="d-inline"
                                                          control={<Switch defaultChecked={status}/>}
                                                          label={evento.status === 'publica' ?
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

                                <Typography className="mb-4" variant="body1" color="text.secondary" component="div">
                                    Galerias: {evento.galerias_qtd}
                                </Typography>

                                <Typography className="mt-4 text-wrap" variant="h5" color="info" component="div">
                                    Link: <br/>
                                    {route('clientes.eventos.show', [evento.token, evento.id])}
                                </Typography>
                            </CardContent>

                        </div>
                    </div>
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


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal-primary">
                    <h6>Confirmar Exclusão desse Evento</h6>
                    <p>Deseja excluir este evento?</p>
                    <small className="text-danger">
                        Todos os aqruivos dessas gelerias deste evento serão excluídos permanentemente.<br/>
                        Essa operação é irreversível!
                    </small>
                    <div className="text-end">
                        <button className="btn btn-danger" onClick={() => excluirEvento()}>
                            Excluir
                        </button>
                    </div>
                </Box>
            </Modal>

        </LayoutAdmin>
    )
}
