import { SubmitHandler, useForm } from "react-hook-form"
import validator from 'validator';
import { useStatus } from "../context/apiSatus";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface IUser {
    password: string;
    email: string;
}
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IUser>();
    const { login } = useAuth();
    const nav = useNavigate();
    const { messages, setMessages } = useStatus();


    const onSubmit: SubmitHandler<IUser> = async (data) => {
        try {
            await login(data.email, data.password);
            setMessages('Login Success !');
            nav('/admin');
        } catch (error) {
            setMessages('fail !!');
        }
    }

    return (
        <div className="container">
            <h2>Login</h2>
            {messages && <p className="text-danger" >{messages}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            validate: (value) => {
                                if (!validator.isEmail(value)) {
                                    return 'Invalid email address';
                                }
                                return true;
                            }
                        })}
                        className="form-control"
                    />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: 'Password is required',
                            validate: (value) => {
                                if (!validator.isLength(value, { min: 6 })) {
                                    return 'Password > 6 ';
                                }

                                return true;
                            }
                        })}
                        className="form-control"
                    />
                    {errors.password && <span className="text-danger" >{errors.password.message}</span>}
                </div>
                <span>You Don't Have a AccCout? <a href="/register">Register</a></span> <br />
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );

}

export default Login;