import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import React, {useEffect, useState} from "react";

export default function PaginationGalerias({urlRoute, galeriaId, pastasAtual, setArquivos}) {

    const [page, setPage] = React.useState(1);
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
        })
    }


    useEffect(() => {
        getArquivos()
    }, [page])

    return (
        <div className="row justify-content-center mt-2">
            <div className="col-auto">
                <Pagination
                    count={pagination?.last_page} page={pagination?.current_page ?? 1}
                    color="secondary"
                    onChange={handleChange}/>
            </div>
        </div>
    )
}
