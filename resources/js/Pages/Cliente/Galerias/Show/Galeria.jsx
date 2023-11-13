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

const Lightbox = ({imageUrl, onClose}) => {
    return (
        <div className="lightbox-overlay" onClick={onClose}>
            <div className="lightbox-content">
                <img src={imageUrl} alt="Imagem"/>
                <button onClick={onClose} className="close-button">
                    Fechar
                </button>
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

    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    const openLightbox = (url) => {
        setUrlImage(url)
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
                                {item.tipo !== 'video' && <IconButton sx={{color: 'white'}}
                                                                      onClick={() => openLightbox(item.url_comprimida_marca)}>
                                    <VisibilityOutlinedIcon/>
                                </IconButton>}
                                {lightboxOpen && (
                                    <Lightbox imageUrl={urlImage} onClose={closeLightbox}/>
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
