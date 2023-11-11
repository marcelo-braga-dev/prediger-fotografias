// material-ui
import {Box, FormControl, IconButton, InputAdornment, Link, OutlinedInput, useMediaQuery} from '@mui/material';
import {GithubOutlined, SearchOutlined} from '@ant-design/icons';

// project import
import Search from './Search.jsx';
import Profile from './Profile/index.jsx';
import Notification from './Notification.jsx';
import MobileSection from './MobileSection.jsx';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = ({titlePage}) => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <>
            {/*{!matchesXs && <Search />}*/}
            <div className="row w-100 text-truncate">
                <div className="col-12  text-truncate">
                    {titlePage}
                </div>
            </div>
            {matchesXs && <Box sx={{width: '100%', ml: 1}}/>}

            {/*<Notification />*/}
            {!matchesXs && <Profile/>}
            {matchesXs && <MobileSection/>}
        </>
    );
};

export default HeaderContent;
