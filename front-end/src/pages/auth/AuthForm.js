import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext"

const AuthForm = ({ isLogin }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordHidden, setPasswordHidden] = useState(["password",true]);
    const [errors, setErros] = useState({username: null, email: null, password: null});
    const  { dispatch } = useAuthContext();
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setUsername('');
        setPassword('');
        setEmail('');
        if(isLogin) {
            console.log('Login submitted:', email, password);
            api.post("/login", { email, password }).then(res => {
                localStorage.setItem("user", JSON.stringify(res.data));
                dispatch({ type: 'LOGIN', payload: res.data });
                navigate("/");
            }).catch(err => {
                setErros(err.response.data.errors);
            });
        }
        else {
            console.log('Sign Up submitted:', username, email, password);
            api.post("/signup", { username, email, password }).then(res => {
                dispatch({ type: 'LOGIN', payload: res.data });
                navigate("/");
            }).catch(err => {
                setErros(err.response.data.errors);
            });
        }
    };

  return (
    <div className='text-stone-900'>
      <form onSubmit={handleSubmit}>
        { !isLogin &&
            <div>
                <label htmlFor="username" className='block text-left text-sm mt-5'>Username</label> 
                <div className='border-b border-stone-900'>
                    <input type="text" id="username" value={username} onChange={handleUsernameChange} className='w-full outline-none text-sm py-1 bg-stone-50'/>
                </div>
                <div className="text-red-500 text-[13px] text-left mt-2">{ errors.username }</div>
            </div> 
        }
        <label htmlFor="email" className='block text-left text-sm mt-5'>Email</label>
        <div className='border-b border-stone-900'>
          <input type="email" id="email" value={email} onChange={handleEmailChange} className='w-full outline-none text-sm py-1 bg-stone-50'/>
        </div>
        <div className="text-red-500 text-[13px] text-left mt-2">{ errors.email }</div>
        <label htmlFor="password" className='block text-left text-sm mt-5'>Password</label>
        <div className='flex items-center  border-b border-stone-900'>
            <input type={passwordHidden[0]} id="password" value={password} onChange={handlePasswordChange} className='w-full outline-none text-sm py-1 bg-stone-50'/>
            <div onClick={ () => setPasswordHidden( passwordHidden[1] ? ["text", false] : ["password", true]) } className='ml-3 cursor-pointer'>
                { passwordHidden[1] ? <FaEye/>: <FaEyeSlash/> }
            </div>
        </div>
        <div className="text-red-500 text-[13px] text-left mt-2">{ errors.password }</div>
        { isLogin ? (
            <div>
                <div className="text-xs font-light my-5 text-right"><s className='no-underline hover:underline cursor-pointer'>Forgot Password?</s></div>
                <button type="submit" className='bg-stone-900 text-[14px] rounded-full text-stone-50 w-full py-2 mt-5 font-semibold hover:bg-stone-900/90'>Log in</button>
                <button type="submit" className='bg-stone-200 text-[14px] text-stone-900 rounded-full w-full py-2 mt-3 flex items-center justify-center font-semibold hover:bg-stone-200/70'>
                    <FcGoogle className='mr-3 text-xl'/>
                    Log in with Google
                </button>
            </div>
        ) : (
            <div>
                <button type="submit" className='bg-stone-900 text-[14px] rounded-full text-stone-50 w-full py-2 mt-5 font-semibold hover:bg-stone-900/90'>Sign up</button>
            </div>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
