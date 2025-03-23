import React, { useState } from 'react'
import authservice from '../appwrite/services/authService';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../appwrite/services/authService';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, InputBox } from './index';


function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError('');
        try {
            const userData = await authservice.getcurrentuser({
                name: data.name,
                email: data.email,
                password: data.password
            });
            
            if(userData){
                dispatch(login(userData));
                navigate('/');
            }

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <h2>Already have an account</h2>
            <p
            
            >
                <Link
                to={'/login'}
                >
                Sign In
                </Link>
            </p>
            {error && <p>{error.toString()}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div>
                    <InputBox
                    type='text'
                    label='Name'
                    placeholder='Enter Full Name'
                    {...register('name', {
                        required: 'Fullname is required',
                    })}
                    />

                    <InputBox
                    type='email'
                    label='Email:'
                    placeholder='Enter Email'
                    {...register('email', {
                        required: 'Email is required',
                    })}
                    />

                    <InputBox
                    type='password'
                    label='Password:'
                    placeholder='Enter Password'
                    {...register('password', {
                        required: 'Password is required',
                    })}
                    />

                    <Button
                    type='submit'
                    className='w-full'
                    >
                        Create Account
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Signup;