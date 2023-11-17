import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import React, {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";

const Lightbox = ({imageUrl, onClose, tipoArquivo, nome}) => {
    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <div className="lightbox-content" onClick={() => {}}>
                {tipoArquivo === 'imagem' && <>
                    <img src={imageUrl} alt="Imagem"/>
                    <button className="close-button">
                        <span className="me-4 bg-dark px-2 py-1">ID: {nome}</span>
                        <span onClick={onClose} className=" bg-dark px-2 py-1">Fechar</span>
                    </button>
                </>}
                {tipoArquivo === 'video' && <>
                    <video controls muted preload="metadata">
                        <source src={imageUrl} type="video/mp4"/>
                        <source src={imageUrl} type="video/ogg"/>
                    </video>
                    <button onClick={onClose} className="close-button">
                        <span className="me-4 bg-dark px-2 py-1">ID: {nome}</span>
                        <span className=" bg-dark px-2 py-1">Fechar</span>
                    </button>
                </>}
            </div>
        </div>
    );
};
//
export default function Galeria({arquivos}) {
    const [valueObject, setValueObject] = useState({});
    const [inputValue, setInputValue] = useState();

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [urlImage, setUrlImage] = useState('');
    const [tipoArquivo, setTipoArquivo] = useState('');

    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    const openLightbox = (url, tipo) => {
        setUrlImage(url)
        setTipoArquivo(tipo)
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

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

        <ImageList sx={{minHeight: 500}} gap={8} cols={matchDownMD ? 1 : 3}>
            {arquivos.map((item) => {
                return (
                    <ImageListItem key={item.id} cols={1} rows={2}
                                   className={valueObject[item.nome] ? "border-2 border-success" : ''}
                    >
                        {item.tipo === 'imagem' &&
                            <img
                                srcSet={`${item.url_miniatura_marca}?w=348&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.url_miniatura_marca}?w=348&fit=crop&auto=format`}
                                alt={item.title}
                                loading="lazy"
                                onClick={() => setInputValue(item.nome)}
                            />}

                        {item.tipo === 'video' &&
                            <video controls muted
                                   onClick={() => setInputValue(item.nome)}>
                                <source src={item.url_miniatura_marca} type="video/mp4"/>
                                <source src={item.url_miniatura_marca} type="video/ogg"/>
                            </video>}

                        <ImageListItemBar
                            sx={{
                                background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                            }}
                            // title={item.title}
                            title={<small>ID: {item.nome}</small>}
                            position="top"
                            actionIcon={<>
                                {item.tipo === 'imagem' &&
                                    <IconButton sx={{color: 'white'}}
                                                onClick={() => openLightbox(item.url_comprimida_marca, item.tipo)}>
                                        <VisibilityOutlinedIcon/>
                                    </IconButton>
                                }
                                {item.tipo === 'video' &&
                                    <IconButton sx={{color: 'white'}}
                                                onClick={() => openLightbox(item.url_miniatura_marca, item.tipo)}>
                                        <VisibilityOutlinedIcon/>
                                    </IconButton>
                                }
                                {lightboxOpen && (
                                    <Lightbox imageUrl={urlImage} onClose={closeLightbox}
                                              tipoArquivo={tipoArquivo} nome={item.nome}/>
                                )}
                                <IconButton sx={{color: 'white'}}
                                            onClick={() => setInputValue(item.nome)}>
                                    {valueObject[item.nome] ? <StarIcon/> : <StarBorderIcon/>}
                                </IconButton>
                            </>
                            }
                            actionPosition="right"
                        />
                    </ImageListItem>
                );
            })}
        </ImageList>
    </>)
}
