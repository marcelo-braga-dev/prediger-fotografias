import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import React, {useEffect, useState} from "react";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import WaterDropOutlinedIcon from '@mui/icons-material/WaterDropOutlined';

import {router} from "@inertiajs/react";
import {Box, useMediaQuery} from "@mui/material";
import Modal from "@mui/material/Modal";
import {useTheme} from "@mui/material/styles";


const Lightbox = ({imageUrl, onClose, tipoArquivo}) => {
    return (
        <div className="lightbox-overlay" onClick={onClose}>{console.log(tipoArquivo)}
            <div className="lightbox-content">
                {tipoArquivo === 'imagem' && <>
                    <img src={imageUrl} alt="Imagem"/>
                    <button onClick={onClose} className="close-button">
                        Fechar
                    </button>
                </>}
                {tipoArquivo === 'video' && <>
                    <video controls muted preload="metadata">
                        <source src={imageUrl} type="video/mp4"/>
                        <source src={imageUrl} type="video/ogg"/>
                    </video>
                    <button onClick={onClose} className="close-button">
                        Fechar
                    </button>
                </>}
            </div>
        </div>
    );
};

export default function Galeria({arquivos}) {
    const [valueObject, setValueObject] = useState({});
    const [inputValue, setInputValue] = useState();

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [urlImage, setUrlImage] = useState('');
    const [idArquivoExcluir, setIdArquivoExcluir] = useState();
    const [tipoArquivo, setTipoArquivo] = useState('');

    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    const excluirArquivoModal = (id) => {
        setIdArquivoExcluir(id)
        handleOpen(true)
    };

    const excluirArquivo = () => {
        router.post(route('admin.galerias-arquivos.destroy', idArquivoExcluir), {
            _method: 'delete'
        })
        handleClose(false)
        setIdArquivoExcluir(undefined)
    };

    const openLightbox = (url, tipo) => {
        setUrlImage(url)
        setTipoArquivo(tipo)
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const toggleValue = () => {
        if (valueObject[inputValue]) {
            const updatedValueObject = {...valueObject};
            delete updatedValueObject[inputValue];
            setValueObject(updatedValueObject);
        } else {
            setValueObject((prevValue) => ({
                ...prevValue,
                [inputValue]: inputValue,
            }));
        }
        setInputValue();
    };

    useEffect(function () {
        if ((inputValue)?.toString()) toggleValue()
    }, [inputValue])

    return (<>
        <div className="row justify-content-end">
            <div className="col-auto mb-0"><small>Total: {arquivos.length}</small></div>
        </div>
        {arquivos.length ?
            <div className="row">
                <div className="col">
                    <span>{Object.keys(valueObject).length} Arquivos Selecionados:</span>
                    {Object.keys(valueObject).map((value) => (
                        <span className="ms-2" key={value}> ID: {value},</span>
                    ))}
                    <span className="ms-2">
                                {(Object.values(valueObject)).length > 0 ? '' : 'Nenhum'}
                            </span>
                </div>
            </div>
            : 'Não há arquivos nessa pasta.'}

        <ImageList sx={{minHeight: 500}} rowHeight={150} gap={8} cols={matchDownMD ? 1 : 3}>
            {arquivos.map((item) => {
                return (
                    <ImageListItem key={item.id} cols={1} rows={2}
                                   className={valueObject[item.nome] ? "border-2 border-success bg-dark" : ''}>
                        {item.tipo === 'imagem' &&
                            <img
                                onClick={() => setInputValue(item.nome)}
                                srcSet={`${item.url_miniatura}?w=348&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.url_miniatura}?w=348&fit=crop&auto=format`}
                                alt={item.title}
                                loading="lazy"

                            />}

                        {item.tipo === 'video' &&
                            <video controls muted preload="metadata"
                                   onClick={() => setInputValue(item.nome)}>
                                <source src={item.url_miniatura} type="video/mp4"/>
                                <source src={item.url_miniatura} type="video/ogg"/>
                            </video>}

                        <ImageListItemBar
                            sx={{
                                background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 10%, ' +
                                    'rgba(0,0,0,0.3) 80%, rgba(0,0,0,0.3) 100%)',
                            }}

                            title={<small className="d-block">ID: {item.nome}</small>}
                            position="top"
                            actionIcon={<>
                                <div className="row">
                                    <div className="col mb-0">
                                        {item.tipo === 'video' && <>
                                            <IconButton sx={{color: 'white'}}
                                                        onClick={() => openLightbox(item.url_miniatura, item.tipo)}>
                                                <VisibilityOutlinedIcon fontSize="small"/>
                                            </IconButton>
                                            {lightboxOpen && (
                                                <Lightbox imageUrl={urlImage} onClose={closeLightbox}
                                                          tipoArquivo={tipoArquivo}/>
                                            )}
                                        </>}
                                        {item.tipo === 'imagem' && <>
                                            <IconButton sx={{color: 'white'}}
                                                        onClick={() => openLightbox(item.url_comprimida, item.tipo)}>
                                                <VisibilityOutlinedIcon fontSize="small"/>
                                            </IconButton>
                                        </>}
                                        <IconButton sx={{color: 'white'}}
                                                    onClick={() => setInputValue(item.nome)}>
                                            {valueObject[item.nome] ? <StarIcon fontSize="small"/> :
                                                <StarBorderIcon fontSize="small"/>}
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col mb-0">
                                        {item.tipo === 'video' && <>
                                            <IconButton sx={{color: 'white'}}
                                                        onClick={() =>
                                                            openLightbox(item.url_miniatura_marca, item.tipo)}>
                                                <WaterDropOutlinedIcon fontSize="small"/>
                                            </IconButton>
                                        </>}
                                        {item.tipo === 'imagem' && <>
                                            <IconButton sx={{color: 'white'}}
                                                        onClick={() =>
                                                            openLightbox(item.url_comprimida_marca, item.tipo)}>
                                                <WaterDropOutlinedIcon fontSize="small"/>
                                            </IconButton>

                                        </>}
                                        <IconButton sx={{color: 'white'}} className="m-0 p-0"
                                                    onClick={() => excluirArquivoModal(item.id)}>
                                            <DeleteOutlineOutlinedIcon fontSize="small"/>
                                        </IconButton>

                                    </div>
                                </div>
                            </>
                            }
                            actionPosition="right"
                        />
                    </ImageListItem>
                );
            })}
        </ImageList>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="modal-primary">
                <h6>Confirmar Exclusão do Arquivo</h6>
                <p>Deseja excluir essa galeria?</p>
                <small className="text-danger">
                    O aqruivo será excluído permanentemente.<br/>
                    Essa operação é irreversível!</small>
                <div className="text-end">
                    <button className="btn btn-danger" onClick={() => excluirArquivo()}>
                        Excluir
                    </button>
                </div>
            </Box>
        </Modal>
    </>)
}
