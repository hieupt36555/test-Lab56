import { useEffect, useState } from "react"
import { IProduct } from "../types/IProduct"
import axiosInstane from "../config/AxiosConfig";

const useProduct = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useLoading();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const response = await axiosInstane.get('/products')
                setProducts(response.data)
            } catch (error) {
                setError('fail to fetch');
            } finally {
                setLoading(false)
            }
        };
        fetchProducts();
    }, []);

    const addProduct = async (product: IProduct) => {
        try {
            setLoading(true)
            const response = await axiosInstane.post('/products', product);
            alert('Create Success!');
        } catch (error) {
            alert("Fail")
        } finally {
            setLoading(false);
        }
    }

    const deleteProduct = async (id: string) => {
        try {
            const comfirm = window.confirm(" Are You Sure ? ");
            if (comfirm) {
                await axiosInstane.delete('/products');
                alert('Create Success!');
            }
        } catch (error) {

        }
    }
}