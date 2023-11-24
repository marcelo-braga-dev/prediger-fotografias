import React, {useState} from "react";

import LayoutCliente from "@/Layouts/ClienteLayout/LayoutCliente.jsx";
import Galeria from "@/Pages/Cliente/Galerias/Show/Galeria.jsx";
import Pastas from "@/Pages/Cliente/Galerias/Show/Pastas.jsx";
import InfosGaleria from "@/Pages/Cliente/Galerias/Show/InfosGaleria.jsx";
import PaginationGalerias from "@/Components/Partials/paginationGalerias.jsx";

export default function ({pastas, galeria}) {
    const [arquivos, setArquivos] = useState([])

    return (
        <LayoutCliente titlePage="Galeria" voltar={route('home')}>
            <section className="mb-4">
                <InfosGaleria galeria={galeria}/>
            </section>

            <Pastas pastas={pastas} galeria={galeria}/>
            <Galeria arquivos={arquivos}/>
            <PaginationGalerias
                pastasAtual={pastas.atual} galeriaId={galeria.token} setArquivos={setArquivos}
                urlRoute="clientes.galerias.arquivos"/>
        </LayoutCliente>
    )
}
