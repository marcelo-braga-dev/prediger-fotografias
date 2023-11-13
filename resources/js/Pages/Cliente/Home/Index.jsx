import LayoutCliente from "@/Layouts/ClienteLayout/LayoutCliente.jsx";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ({galerias}) {

    return (
        <LayoutCliente>
            <div className="row justify-content-between">
                <div className="col-auto pt-4 mb-0">
                    <h6>Galerias</h6>
                </div>
                {/*<div className="col-auto">*/}
                {/*    <TextField label="Pesquisar..."/>*/}
                {/*</div>*/}
            </div>
            <div className="row row-cols-1 row-cols-md-3">
                {galerias.map((item, index) => {
                    return <div key={index} className="col">
                        <Card sx={{maxWidth: 345}}>
                            <a href={route('clientes.galerias.show', [item.token, item.id])}>
                                <CardMedia
                                    sx={{height: 200}}
                                    image={item.capa}
                                    title={item.titulo}
                                />
                            </a>
                            <CardContent className="pb-0">
                                <Typography variant="subtitle1" sx={{color: 'black', textDecoration: 'none'}}
                                            href={route('clientes.galerias.show', [item.token, item.id])}
                                            component="a">
                                    {item.titulo}
                                </Typography>
                                {/*</a>*/}
                                <Typography gutterBottom variant="subtitle2" component="div">
                                    {item.data}
                                </Typography>

                                <Typography variant="body1">
                                    Evento: {item.evento.nome}
                                </Typography>
                                <Typography gutterBottom variant="body2">
                                    Localidade: {item.evento.localidade}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.qtd_arquivos} Arquivos
                                </Typography>
                            </CardContent>
                            <CardActions sx={{display: "flex", justifyContent: "flex-end"}}>
                                <Button sx={{color: 'var(--main-color)'}}
                                        href={route('clientes.galerias.show', [item.token, item.id])}
                                        size="small">Abrir</Button>
                            </CardActions>
                        </Card>
                    </div>
                })}
                {galerias.length === 0 && <span>Não há galerias.</span>}
            </div>
        </LayoutCliente>
    )
}
