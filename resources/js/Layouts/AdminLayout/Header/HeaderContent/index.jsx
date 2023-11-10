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
        <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
            {titlePage}
        </Box>
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

      {/*<Notification />*/}
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
