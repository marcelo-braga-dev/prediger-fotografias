import LayoutAdmin from "@/Layouts/AdminLayout/LayoutAdmin.jsx";
import {MenuItem, TextField} from "@mui/material";
import React from "react";
import SelectEstados from "@/Components/Inputs/SelectEstados.jsx";
import {useForm} from "@inertiajs/react";
import {MuiFileInput} from "mui-file-input";

export default function () {
    const {data, setData, post} = useForm()
    const submit = (e) => {
        e.preventDefault()
        post(route('admin.eventos.store'))
    }

    return (
        <LayoutAdmin titlePage="Cadastrar Evento" menu="eventos"
                     voltar={route('admin.eventos.index')}>
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col">
                        <TextField label="Nome do Evento" required fullWidth
                                   onChange={e => setData('nome', e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <TextField label="Cidade" required fullWidth
                                   onChange={e => setData('cidade', e.target.value)}/>
                    </div>
                    <div className="col">
                        <SelectEstados setData={setData}/>
                    </div>
                    <div className="col">
                        <MuiFileInput fullWidth label="Selecionar Logo" value={data?.logo}
                                      onChange={e => setData('logo', e)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <TextField label="Descrição" multiline rows="2" fullWidth
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
