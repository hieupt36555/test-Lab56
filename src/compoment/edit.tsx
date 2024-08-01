import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useProduct from '../hooks/useProduct';
import { IProduct } from '../types/IProduct';
import Swal from 'sweetalert2';

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<IProduct>();
    const [product, setProduct] = useState<any>(null);
    const {loading } = useProduct();

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<IProduct> = async (data) => {
        try {
            const response = await axios.put(`http://localhost:3000/products/${id}`, data);
            navigate('/admin')
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Edit in successfully"
              });
        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "error",
                title: "Edit in error"
              });
        } 
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/products/${id}`);
                setProduct(response.data);
                setValue('name', response.data.name);
                setValue('isShow', response.data.isShow);
                setValue('category', response.data.category);
                setValue('quantity', response.data.quantity);

            } catch (error) {
                console.error('Lỗi khi lấy thông tin sản phẩm:', error);

            }
        };

        fetchProduct();
    }, []);

    if (!product) {
        return;
    }

    const validateQuantity = (value: number) => value > 1 || 'Quantily must be greater than 1';
    if (loading) return <div className="text-center">Loading...</div>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded">

            <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                    {...register('name', { required: 'Name is required' })}
                    className="form-control"
                />
                {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label">Quantity:</label>
                <input
                    type="number"
                    {...register('quantity', { required: 'quantity is required', validate: validateQuantity })}
                    className="form-control"
                />
                {errors.quantity && <p className="text-danger">{errors.quantity.message}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label">Select:</label>
                <select className="form-select" aria-label="Default select example" {...register('category')}>
                    <option selected>Open this select menu</option>
                    <option value={'HP'}>HP</option>
                    <option value={'Dell'}>Dell</option>
                </select>
                {errors.category && <p className="text-danger">{errors.category.message}</p>}
            </div>
            <div className="mb-3">
                <label className="form-label">IsShow:</label>
                <input
                    type="checkbox"
                    {...register('isShow')}
                    className=""
                />
                {errors.isShow && <p className="text-danger">{errors.isShow.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    );
};

export default EditProduct;
