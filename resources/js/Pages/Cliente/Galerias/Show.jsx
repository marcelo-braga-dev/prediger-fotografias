import LayoutCliente from "@/Layouts/ClienteLayout/LayoutCliente.jsx";
import Galeria from "@/Pages/Cliente/Galerias/Show/Galeria.jsx";
import Pastas from "@/Pages/Cliente/Galerias/Show/Pastas.jsx";
import React from "react";
import InfosGaleria from "@/Pages/Cliente/Galerias/Show/InfosGaleria.jsx";

export default function ({arquivos, pastas, galeria}) {
    return (
        <LayoutCliente titlePage="Galeria" voltar={route('home')}>
            <section className="mb-4">
                <InfosGaleria galeria={galeria}/>
            </section>

            <Pastas pastas={pastas} galeria={galeria}/>
            <Galeria arquivos={arquivos}/>
        </LayoutCliente>
    )
}
