import { SubmitHandler, useForm } from "react-hook-form"
import { IProduct } from "../types/IProduct";
import { useNavigate } from "react-router-dom";
import useProduct from "../hooks/useProduct";


const Add = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IProduct>();
    const { loading, addProduct } = useProduct();
    const nav = useNavigate();


    const onSubmit: SubmitHandler<IProduct> = async (data) => {
        addProduct(data);
    }

    const validateQuantity = (value: number) => value > 1 || 'Quantity > 1';
    if (loading) return <div className=" text-primary" >Loading...</div>


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

}

export default Add;