import Card from "@mui/material/Card";
import {ListItemButton, ListItemIcon, TextField} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {MuiFileInput} from "mui-file-input";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import React, {useState} from "react";
import {router, useForm} from "@inertiajs/react";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FolderIcon from '@mui/icons-material/Folder';

import {covertDataNumber, covertTamanhoArquivo} from "@/helpers/conversoes.js";
import {verificaTipoArquivo} from "@/helpers/dados.js";

import CircularProgress from '@mui/material/CircularProgress';

export default function Pastas({galeria, pastas}) {
    const {setData, data, post} = useForm({
        galeria_id: galeria.id,
        id_pasta: pastas.atual,
        arquivos: []
    })

    const [btnUpload, setBtnUpload] = useState(false)
    const [open, setOpen] = React.useState(false);

    async function submit(e) {
        e.preventDefault()
        router.post(route('admin.galerias.upload', galeria.id),
            {_method: 'put', ...data,})

        setOpen(true);
    }

    router.on('success', (event) => {
        data.arquivos = {}
        setBtnUpload(false)
        setOpen(false);
    })


    const selecionaPasta = (idPasta) => {

        router.get(route('clientes.galerias.show', [galeria.token, galeria.id]), {
            'id_pasta': idPasta,
        })
    }

    return (
        <section>
            {/*Pastas*/}
            <div className="row justify-content-between border-bottom">
                <div className="col-auto mb-0">
                    <ListItemButton className="" onClick={() => selecionaPasta(pastas?.superior)}>
                        <ListItem className="p-0">
                            <ListItemIcon>
                                {pastas?.nivel ? <ArrowBackIcon fontSize="small" className="me-2"/> : <HomeOutlinedIcon className="me-1"/>}

                            </ListItemIcon>
                            <ListItemText
                                primary={pastas?.nivel ? `${pastas?.superior_nome}` : '/'}
                            />
                        </ListItem>
                    </ListItemButton>
                </div>
            </div>

            <div className="row row-cols-3 mb-4 border-bottom">
                {pastas.pastas.map((item, index) => {
                    return (
                        item.nivel > 0 &&
                        <div key={index} className="col mb-0">
                            <ListItemButton onClick={() => selecionaPasta(item.id)}>
                                <ListItem className="p-0">

                                    <ListItemIcon className="me-2">
                                        <Avatar sx={{ width: 30, height: 30 }}>
                                            <FolderIcon fontSize="small" />
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <span style={{fontSize: 14}}>{item.nome}</span>}
                                    />
                                </ListItem>
                            </ListItemButton>

                        </div>
                    )
                })}
                {pastas.pastas.length === 0 &&
                    <div className="col ms-5 mb-2">...</div>
                }
            </div>


            {/*Form Upload*/}
            {btnUpload &&
                <Card className="p-3 mb-4">
                    <div className="row">
                        <div className="col mb-0">
                                <span>
                                    Selecione os arquivos para a pasta {pastas?.superior_nome ?
                                    <b>{pastas?.superior_nome}</b> : 'inicial'}.
                                </span>
                            <form onSubmit={submit}>
                                <div className="row mt-4">
                                    <div className="col-md-6">
                                        <MuiFileInput className="p-2" fullWidth label="Selecionar Arquivos"
                                                      value={data?.arquivos}
                                                      multiple
                                                      onChange={e => setData('arquivos', e)}/>
                                    </div>
                                    <div className="col-md-auto pt-2">
                                        <button className="btn btn-primary">Salvar Arquivos</button>
                                    </div>
                                    <div className="col">
                                        {open && <CircularProgress/>}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <List>
                                {Object.keys(data.arquivos ?? []).map((item, index) => {
                                    const file = data.arquivos[item]
                                    return (
                                        <ListItem key={index}
                                                  secondaryAction={
                                                      <IconButton edge="end" aria-label="delete">
                                                          <DeleteIcon/>
                                                      </IconButton>
                                                  }
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    {verificaTipoArquivo(file.name)}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={file.name}
                                                secondary={<>
                                                    <span className="me-4">
                                                        {covertDataNumber(file.lastModified)}
                                                    </span>
                                                    <span className="me-4">{covertTamanhoArquivo(file.size)}</span>
                                                </>
                                                }
                                            />
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </div>
                    </div>
                </Card>
            }
        </section>
    )
}
