import * as React from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export default function StatusIcons({status}) {

    switch (status) {
        case 'publica' :
            return <VisibilityOutlinedIcon fontSize="small" color="success"/>;
        case 'privado' :
            return <VisibilityOffOutlinedIcon fontSize="small" color="error"/>;
        default:
            return 'desconhecido'
    }
}
