// material-ui
import { useTheme } from '@mui/material/styles';

const Logo = () => {
  const theme = useTheme();

  return (
    <div className="me-4 mt-3 p-1 rounded">
        <img src="/storage/app/logo.jpg" width="100%" alt="Logo"/>
    </div>
  );
};

export default Logo;
