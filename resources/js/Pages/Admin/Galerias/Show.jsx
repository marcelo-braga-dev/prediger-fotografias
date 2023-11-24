import React, {useState} from "react";
import LayoutAdmin from "@/Layouts/AdminLayout/LayoutAdmin.jsx";

import Card from "@mui/material/Card";

import Pastas from "@/Pages/Admin/Galerias/Show/Pastas";
import Galeria from "@/Pages/Admin/Galerias/Show/Galeria";
import InfosGaleria from "@/Pages/Admin/Galerias/Show/InfosGaleria";
import PaginationGalerias from "@/Components/Partials/paginationGalerias.jsx";

export default function Page({galeria, pastas}) {

    const [arquivos, setArquivos] = useState([])

    return (
        <LayoutAdmin titlePage="Informaçẽos da Galeria" menu="galerias" voltar={route('admin.galerias.index')}>
            <section>
                <InfosGaleria galeria={galeria}/>
            </section>

            <section>
                <Card className="mt-5 p-3">
                    <Pastas galeria={galeria} pastas={pastas}/>
                    <Galeria arquivos={arquivos}/>
                    <PaginationGalerias
                        pastasAtual={pastas.atual} galeriaId={galeria.id} setArquivos={setArquivos}
                        urlRoute="admin.galerias.arquivos"/>
                </Card>
            </section>
        </LayoutAdmin>
    )
}
