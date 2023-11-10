import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import CropOriginalOutlinedIcon from '@mui/icons-material/CropOriginalOutlined';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Galerias',
    type: 'group',
    children: [
        {
            id: 'galerias-eventos',
            title: 'Galerias dos Eventos',
            type: 'item',
            url: route('admin.galerias.index'),
            icon: PermMediaOutlinedIcon,
            breadcrumbs: false
        }, {
            id: 'eventos',
            title: 'Eventos',
            type: 'item',
            url: '/dashboard/default',
            icon: CropOriginalOutlinedIcon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
