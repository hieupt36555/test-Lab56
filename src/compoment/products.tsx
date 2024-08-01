import { Link } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import LoadingSpinner from "./loadingCom";

const ProductList = () => {

    const {products, deleteProduct, error} = useProduct();

    return(
        <div className="p-4">
        <LoadingSpinner />
      <h1>Product List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>quantity</th>
            <th>isShow</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>{product.isShow? 'True' : 'Fasle'}</td>
              <td>
               <Link to={`edit/${product.id}`} className="btn btn-warning btn-sm me-2" >Edit</Link>
               <button onClick={() => deleteProduct(product.id!)} className="btn btn-danger btn-sm" > Delete </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ProductList;