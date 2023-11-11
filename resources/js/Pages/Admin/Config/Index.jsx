import LayoutAdmin from "@/Layouts/AdminLayout/LayoutAdmin.jsx";
import {MuiFileInput} from "mui-file-input";
import {useForm} from "@inertiajs/react";
import React from "react";
import {TextField} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export default function ({dados}) {
    const {post, setData, data, reset, progress} = useForm({
        email: dados.email,
        telefone: dados.telefone,
        logo: '',
        marca: '',
        logo_cliente: ''
    });

    const submit = (e) => {
        e.preventDefault()
        post(route('admin.config.store'), {
            onSuccess: () => {
                reset('email', 'telefone', 'marca', 'logo_cliente')
                if (data.logo) window.location.reload();
            },
        })
    }

    return (
        <LayoutAdmin titlePage="Configurações" card>
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col-md-5 mb-4">
                        <MuiFileInput label="Logo principal" fullWidth value={data?.logo}
                                      onChange={e => setData('logo', e)}/>
                    </div>
                    <div className="col-auto mb-4">
                        <button className="btn btn-success btn-sm ms-4">Salvar</button>
                    </div>
                    <div className="col-auto mb-4">
                        {(data?.logo && progress) && <CircularProgress size={25}/>}
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-5 mb-4">
                        <MuiFileInput label="Logo da Área do Cliente" fullWidth value={data?.logo_cliente}
                                      onChange={e => setData('logo_cliente', e)}/>
                    </div>
                    <div className="col-auto mb-4">
                        <button className="btn btn-success btn-sm ms-4">Salvar</button>
                    </div>
                    <div className="col-auto mb-4">
                        {(data?.logo_cliente && progress) && <CircularProgress size={25}/>}
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-5 mb-3">
                        <MuiFileInput label="Marca D'agua" value={data?.marca} fullWidth
                                      onChange={e => setData('marca', e)}/>
                    </div>
                    <div className="col-auto mb-4">
                        <button className="btn btn-success btn-sm ms-4">Salvar</button>
                    </div>
                    <div className="col-auto mb-4">
                        {(data?.marca && progress) && <CircularProgress size={25}/>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <TextField type="email" label="Email para contato:" fullWidth
                                   value={data.email}
                                   onChange={e => setData('email', e.target.value)}/>
                    </div>
                    <div className="col-auto mb-4 pt-2">
                        <button className="btn btn-success btn-sm ms-4">Salvar</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 mb-3">
                        <TextField label="Telefone para contato:" fullWidth
                                   value={data.telefone}
                                   onChange={event => setData('telefone', event.target.value)}/>
                    </div>
                    <div className="col-auto mb-4 pt-2">
                        <button className="btn btn-success btn-sm ms-4">Salvar</button>
                    </div>
                </div>
            </form>
        </LayoutAdmin>
    )
}
