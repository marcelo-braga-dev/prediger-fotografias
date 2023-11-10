import LayoutAdmin from "@/Layouts/AdminLayout/LayoutAdmin.jsx";
import {Box, Grid, ListItemButton, ListItemIcon, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import StatusIcons from "@/Components/Partials/StatusIcons";
import {router, useForm} from "@inertiajs/react";

import ImageIcon from '@mui/icons-material/Image';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import VideocamIcon from '@mui/icons-material/Videocam';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import {MuiFileInput} from 'mui-file-input'

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

let totalTamanho = 0


function Page({galeria, pastas}) {
    const {setData, data, post, get} = useForm({
        galeria_id: galeria.id,
        id_pasta: pastas.atual
    })
    const [novaPasta, setNovaPasta] = useState(false)

    const submit = (e) => {
        e.preventDefault()
        router.post(route('admin.galerias.upload', galeria.id),
            {_method: 'put', ...data})
    }

    const criarPasta = (e) => {
        e.preventDefault()
        post(route('admin.galerias-pastas.store'), {
            onSuccess: () => setNovaPasta(false),
            preserveScroll: true,
        })
    }

    const selecionaPasta = (idPasta) => {
        router.get(route('admin.galerias.edit', galeria.id), {
            'id_pasta': idPasta,
        })
    }

    const verificaTipoArquivo = (item) => {
        let img = /(\.jpg|\.png|\.gif|\.pdf|\.txt|\.doc|\.docx)$/i;
        let video = /(\.mp4|\.mp4)$/i;

        if (img.test(item)) {
            return <ImageIcon sx={{color: 'black'}}/>
        }
        if (video) {
            return <VideocamIcon sx={{color: 'black'}}/>
        }
    }

    function covert_data_number(valor) {
        return new Date(valor).toLocaleDateString() + ' ' + new Date(valor).toLocaleTimeString()
    }

    function covert_tamanho_arquivo(valor) {
        if (valor > (1000 * 1000 * 1000)) return (valor / (1000 * 1000 * 1000)).toFixed(2) + ' GB'
        if (valor > (1000 * 1000)) return (valor / (1000 * 1000)).toFixed(2) + ' MB'
        if (valor > 1000) return Math.round((valor / 1000)) + ' kB'
    }

    return (
        <LayoutAdmin titlePage="Upload Arquivos para Galeria" menu="galerias"
                     voltar={route('admin.galerias.show', galeria.id)}>

            <section>
                <Card sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <h6>{galeria.titulo}</h6>
                            <Typography className="mb-2" variant="caption" color="text.secondary"
                                        component="div">
                                {galeria.data}
                            </Typography>
                            <Typography className="mb-2" variant="subtitle1" color="text.secondary"
                                        component="div">
                                {galeria.descricao}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" component="div">
                                Evento: {galeria.evento.nome}
                            </Typography>
                            <Typography className="mb-2" variant="body1" color="text.secondary" component="div">
                                Localidade: {galeria.evento.localidade}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" component="div">
                                Status: {galeria.status_nome} <StatusIcons status={galeria.status}/>
                            </Typography>

                            <Typography className="mt-4" variant="h5" color="text.secondary" component="div">
                                Link: {route('admin.galerias.index')}
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
            </section>

            <section>
                <Card className="mt-5 p-3">
                    {/*Criar Pasta*/}
                    <div className="row">
                        <div className="col-md-3"><h6>Upload</h6></div>
                        <div className="col">
                            <button onClick={() => setNovaPasta(!novaPasta)}>
                                <CreateNewFolderOutlinedIcon className="text-muted"/> Nova Pasta
                            </button>
                        </div>
                    </div>
                    {novaPasta &&
                        <form onSubmit={criarPasta}>
                            <TextField label="Nome da Pasta" required
                                       onChange={e => setData('nome_pasta', e.target.value)}/>
                            <button className="btn btn-success ms-2">Salvar</button>
                        </form>
                    }

                    {/*Pastas*/}
                    <div className="row">
                        <div className="col-auto mb-0">
                            <ListItemButton className="" onClick={() => selecionaPasta(pastas?.superior)}>
                                <ListItem className="p-0">
                                    <ListItemIcon>
                                        <HomeOutlinedIcon className="me-1"/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={pastas?.nivel  ? `.../${pastas?.superior_nome}/` : '/'}
                                    />
                                </ListItem>
                            </ListItemButton>
                        </div>
                    </div>
                    <div className="row row-cols-4 mb-4">
                        {pastas.pastas.map((item, index) => {
                            return (
                                <div key={index} className="col mb-0">
                                    <ListItemButton onClick={() => selecionaPasta(item.id)}>
                                        <ListItem className="p-0">
                                            <ListItemIcon>
                                                <FolderOpenOutlinedIcon className="me-1"/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.nome}
                                            />
                                        </ListItem>
                                    </ListItemButton>
                                </div>
                            )
                        })}
                    </div>
                    {pastas.pastas.length === 0 &&
                        <div className="row">
                            <div className="col ms-5 mb-5">Não há pastas.</div>
                        </div>
                    }

                    <span>Selecione os arquivos para a pasta {pastas?.superior_nome ?
                        <b>{pastas?.superior_nome}</b> : 'inicial'}.</span>
                    <form onSubmit={submit}>
                        <div className="row mt-4">
                            <div className="col-md-6 mb-4">
                                <MuiFileInput className="p-2" fullWidth label="Selecionar Arquivos"
                                              value={data?.arquivos}
                                              multiple
                                              onChange={e => setData('arquivos', e)}/>
                            </div>
                            <div className="col-md-6 mb-4">
                                <button className="btn btn-primary">Salvar Arquivos</button>
                            </div>
                        </div>
                    </form>
                    <div className="row">
                        <div className="col">
                            <List>
                                {Object.keys(data.arquivos ?? []).map((item, index) => {
                                    const file = data.arquivos[item]
                                    totalTamanho += file.size

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
                                                        {covert_data_number(file.lastModified)}
                                                    </span>
                                                    <span className="me-4">{covert_tamanho_arquivo(file.size)}</span>
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
            </section>
        </LayoutAdmin>
    )
}

export default Page
