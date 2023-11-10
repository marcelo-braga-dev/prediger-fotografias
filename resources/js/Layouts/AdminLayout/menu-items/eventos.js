import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import CropOriginalOutlinedIcon from '@mui/icons-material/CropOriginalOutlined';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: '',
    type: 'group',
    children: [ {
            id: 'eventos',
            title: 'Eventos',
            type: 'item',
            url: route('admin.eventos.index'),
            icon: CropOriginalOutlinedIcon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
