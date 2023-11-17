import LayoutAdmin from "@/Layouts/AdminLayout/LayoutAdmin.jsx";
import {MenuItem, TextField} from "@mui/material";
import {MuiFileInput} from "mui-file-input";
import React from "react";
import {router, useForm} from "@inertiajs/react";

export default function ({galeria, eventos}) {
    const {post, data, setData} = useForm({
        titulo: galeria.titulo,
        evento: galeria.evento.id,
        data: galeria.data_string,
        descricao: galeria.descricao,
    })

    const submit = (e) => {
        e.preventDefault()
        router.post(route('admin.galerias.update', galeria.id), {
            _method: 'put', ...data
        })
    }
    return (
        <LayoutAdmin titlePage="Editar Galeria" voltar={route('admin.galerias.show', galeria.id)}>
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col mb-4">
                        <TextField label="Título da Galeria" fullWidth required defaultValue={data.titulo}
                                   onChange={e => setData('titulo', e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <TextField select label="Evento" fullWidth required
                                   defaultValue={data.evento}
                                   onChange={e => setData('evento', e.target.value)}>
                            {Object.values(eventos).map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.nome}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="col-md-3 mb-4">
                        <TextField type="date" label="Data do Evento" fullWidth
                                   InputLabelProps={{shrink: true}} required
                                   defaultValue={data.data}
                                   onChange={e => setData('data', e.target.value)}/>
                    </div>
                    <div className="col-md-3 mb-4">
                        <MuiFileInput className="p-2" fullWidth label="Imagem da Capa" value={data?.capa}
                                      onChange={e => setData('capa', e)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-4">
                        <TextField multiline rows="2" label="Descrição da Galeria" fullWidth
                                   defaultValue={data.descricao}
                                   onChange={e => setData('descricao', e.target.value)}/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <button className="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </form>
        </LayoutAdmin>
    )
}
