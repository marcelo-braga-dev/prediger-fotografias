import React, {useState} from "react";
import LayoutAdmin from "@/Layouts/AdminLayout/LayoutAdmin.jsx";

import Card from "@mui/material/Card";

import Pastas from "@/Pages/Admin/Galerias/Show/Pastas";
import Galeria from "@/Pages/Admin/Galerias/Show/Galeria";
import InfosGaleria from "@/Pages/Admin/Galerias/Show/InfosGaleria";

export default function Page({galeria, pastas}) {
    return (
        <LayoutAdmin titlePage="Informaçẽos da Galeria" menu="galerias" voltar={route('admin.galerias.index')}>
            <section>
                <InfosGaleria galeria={galeria}/>
            </section>

            <section>
                <Card className="mt-5 p-3">
                    <Pastas galeria={galeria} pastas={pastas}/>
                    <Galeria pastas={pastas} galeria={galeria}/>
                </Card>
            </section>
        </LayoutAdmin>
    )
}
