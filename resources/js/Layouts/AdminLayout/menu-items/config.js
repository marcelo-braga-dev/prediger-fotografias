import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const dashboard = {
    id: 'config',
    title: '',
    type: 'group',
    children: [{
        id: 'config',
        title: 'Configurações',
        type: 'item',
        url: route('admin.config.index'),
        icon: SettingsOutlinedIcon,
        breadcrumbs: false
    }
    ]
};

export default dashboard;
