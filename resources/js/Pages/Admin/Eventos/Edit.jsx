import LayoutAdmin from "@/Layouts/AdminLayout/LayoutAdmin.jsx";
import {TextField} from "@mui/material";
import SelectEstados from "@/Components/Inputs/SelectEstados.jsx";
import {MuiFileInput} from "mui-file-input";
import React from "react";
import {router, useForm} from "@inertiajs/react";

export default function ({evento}) {
    const {data, setData} = useForm({
        nome: evento.nome,
        cidade: evento.cidade,
        estado: evento.estado,
        descricao: evento.descricao,
    })
    const submit = (e) => {
        e.preventDefault()
        router.post(route('admin.eventos.update', evento.id), {
            _method: 'put',
            ...data
        })
    }
    return (
        <LayoutAdmin titlePage="Editar Evento" voltar={route('admin.eventos.index')}>
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col">
                        <TextField label="Nome do Evento" required fullWidth
                                   defaultValue={data.nome}
                                   onChange={e => setData('nome', e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <TextField label="Cidade" required fullWidth defaultValue={data.cidade}
                                   onChange={e => setData('cidade', e.target.value)}/>
                    </div>
                    <div className="col">
                        <SelectEstados setData={setData} defaultValue={data.estado}/>
                    </div>
                    <div className="col">
                        <MuiFileInput fullWidth label="Selecionar Logo" value={data?.logo}
                                      onChange={e => setData('logo', e)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <TextField label="Descrição" multiline rows="2" fullWidth defaultValue={data.descricao}
                                   onChange={e => setData('descricao', e.target.value)}/>
                    </div>
                </div>
                <div className="row justify-content-center mt-3">
                    <div className="col-auto">
                        <button className="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </form>
        </LayoutAdmin>
    )
}
