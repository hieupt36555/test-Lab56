import { SubmitHandler, useForm } from "react-hook-form"
import axiosInstane from "../config/AxiosConfig";
import validator from 'validator';
import { useStatus } from "../context/apiSatus";
import Swal from "sweetalert2";

interface IUser {
    username: string;
    password: string;
    email: string;
}
const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IUser>();
    // const [message, setMessage] = useState<string | null>(null);
    const { messages, setMessages } = useStatus();
    const onSubmit: SubmitHandler<IUser> = async (data) => {
        try {
            await axiosInstane.post('/register', data);
            setMessages('Register Success !');
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
                title: "Register in successfully"
              });
        } catch (error) {
            setMessages('fail !!');
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
                title: "Register in Fail: "+error
              });
        }
    }

    return (
        <div className="container">
            <h2>Register</h2>
            {messages && <p className="text-danger" >{messages}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label>Username</label>
                    <input
                        {...register('username', { required: 'Username is required' })}
                        className="form-control"
                    />
                    {errors.username && <span className="text-danger" >{errors.username.message}</span>}
                </div>
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
                                    return 'Password > 6';
                                }

                                return true;
                            }
                        })}
                        className="form-control"
                    />
                    {errors.password && <span className="text-danger" >{errors.password.message}</span>}
                </div>
                <span>You Has a AccCout? <a href="/login">Login</a></span> <br />
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );

}

export default Register;