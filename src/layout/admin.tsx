import { Link, Outlet } from 'react-router-dom';
import SideBar from '../compoment/sidebar';

const AdminLayout = () => {
  return (
    <>   <SideBar/>
    
      <Outlet /></>
  );
};

export default AdminLayout;
