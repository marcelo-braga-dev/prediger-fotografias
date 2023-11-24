import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import React, {useEffect, useState} from "react";

export default function PaginationGalerias({
                                               urlRoute,
                                               galeriaId,
                                               pastasAtual,
                                               setArquivos,
                                               setQtdArquivos,
                                               page,
                                               setPage
                                           }) {

    const [pagination, setpagination] = useState()

    const handleChange = (event, value) => {
        setPage(value);
    };

    async function getArquivos() {
        await axios.get(route(urlRoute,
                [galeriaId, pastasAtual, {page: page}]
            )
        ).then(res => {
            setArquivos(res.data.data ?? [])
            setpagination(res.data)
            setQtdArquivos(res.data.total)
            // setQtdArquivos(res.data)
        })
    }


    useEffect(() => {
        getArquivos()
    }, [page])

    return (
        pagination?.last_page > 1 &&
        <Pagination
            count={pagination?.last_page} page={pagination?.current_page ?? 1}
            color="secondary"
            onChange={handleChange}/>
    )
}
