import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import CropOriginalOutlinedIcon from '@mui/icons-material/CropOriginalOutlined';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'galerias',
    title: '',
    type: 'group',
    children: [
        {
            id: 'galerias',
            title: 'Galerias',
            type: 'item',
            url: route('admin.galerias.index'),
            icon: PermMediaOutlinedIcon,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
