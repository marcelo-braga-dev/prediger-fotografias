import LayoutAdmin from "@/Layouts/AdminLayout/LayoutAdmin.jsx";
import {MenuItem, TextField} from "@mui/material";
import React from "react";
import {useForm} from "@inertiajs/react";
import {MuiFileInput} from "mui-file-input";

export default function ({eventos, status}) {
    const {post, data, setData} = useForm()

    const submit = (e) => {
        e.preventDefault()
        post(route('admin.galerias.store'))
    }

    return (
        <LayoutAdmin menu="galerias" titlePage="Cadastrar Galeria"
                     voltar={route('admin.galerias.index')}>
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col mb-4">
                        <TextField label="Título da Galeria" fullWidth required
                                   onChange={e => setData('titulo', e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <TextField select label="Evento" defaultValue="" fullWidth required
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
                                   onChange={e => setData('data', e.target.value)}/>
                    </div>
                    <div className="col-md-2 mb-4">
                        <TextField select label="Status" defaultValue="" fullWidth required
                                   onChange={e => setData('status', e.target.value)}>
                            {status.map((item) => (
                                <MenuItem key={item.status} value={item.status}>
                                    {item.nome}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="col-md-3 mb-4">
                        <MuiFileInput className="p-2" fullWidth label="Imagem da Capa" value={data?.capa}
                                      onChange={e => setData('capa', e)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-4">
                        <TextField multiline rows="2" label="Descrição da Galeria" fullWidth
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
