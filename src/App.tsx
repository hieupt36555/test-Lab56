import { useRoutes } from "react-router-dom";
import Register from "./compoment/register";
import Login from "./compoment/login";
import Add from "./compoment/add";
import ProductList from "./compoment/products";
import Edit from "./compoment/edit";
import AdminLayout from "./layout/admin";
import { PrivateRoute } from "./compoment/Guard";

const AppRoutes = () => {
  return useRoutes([
    { path: 'register', element: <Register /> },
    { path: 'login', element: <Login /> },
    // {path: 'add', element: <Add />},
    // {path: '', element: <ProductList />},
    // {path: 'admin/edit/:id', element: <Edit />}
    {
      path: 'admin', element: <PrivateRoute element={<AdminLayout />} />,
      children: [
        { path: "", element: <ProductList /> },
        { path: "add", element: <Add /> },
        { path: "edit/:id", element: <Edit /> },
      ]
    }
  ])
}
function App() {

  return (
    <><AppRoutes /></>
  );
}

export default App;
