import Navigation from './Navigation/index.jsx';
import SimpleBar from '@/Components/SimpleBar.jsx';

const DrawerContent = ({menu}) => (
  <SimpleBar
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column'
      }
    }}
  >
    <Navigation menu={menu} />
  </SimpleBar>
);

export default DrawerContent;
