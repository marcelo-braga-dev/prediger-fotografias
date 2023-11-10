import Navigation from './Navigation/index.jsx';
import SimpleBar from '@/Components/SimpleBar.jsx';

const DrawerContent = () => (
  <SimpleBar
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column'
      }
    }}
  >
    <Navigation />
  </SimpleBar>
);

export default DrawerContent;
