import { ButtonBase } from '@mui/material';

// project import
import Logo from './Logo.jsx';

const LogoSection = ({ sx, to }) => {
  return (
    <ButtonBase disableRipple sx={sx}>
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;
