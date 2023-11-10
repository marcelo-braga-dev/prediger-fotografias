// material-ui
import {Box, Typography} from '@mui/material';

// project import
import NavGroup from './NavGroup.jsx';
import menuItem from '@/Layouts/MainLayout/menu-items/index.js';

const Navigation = () => {
    const navGroups = menuItem.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item}/>;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Error
                    </Typography>
                );
        }
    });

    return <Box sx={{pt: 2}}>{navGroups}</Box>;
};

export default Navigation;
