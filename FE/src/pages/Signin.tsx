import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { BottomWarning } from '../components/BottomWarning';


export function Signin() {
     const token = localStorage.getItem("token");

  if (token) {
    // already logged in → redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }
    const navigate = useNavigate()

    const [email, setEmail] = useState<String>("")
    const [password, setPassword] = useState<String>("")

    return <div className="flex flex-col justify-center sm:h-screen p-4">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
            <div className="text-center mb-5 text-2xl">
                Sign In
                <div className='text-slate-300 text-sm mt-2'>
                    Enter your information to Sign In Your Account
                </div>
            </div>
            <div className="space-y-6">
                <InputBox onChange={e =>{
                    setEmail(e.target.value)
                }} label='Email' placeholder='JohnCena@gmail.com' />
                <InputBox onChange={e =>{
                    setPassword(e.target.value)
                }} type='password' label='Password' placeholder='********' />
            </div>

            <div className="mt-7">
                 <Button 
                        onClick={async () => {
                            try {
                                const response = await axios.post("http://localhost:3000/api/v1/signin", {
                                    email,
                                    password
                                });

                                localStorage.setItem("token", response.data.token);

                                // ✅ redirect to dashboard
                                navigate("/dashboard");  
                            } catch (err) {
                                console.error("Signup failed:", err);
                            }
                        }} 
                        label='Sign Up' 
                    />
            </div>
            <BottomWarning label="Don't Have an Account" buttonText='Sign Up' to='/signup' />


        </div>
    </div>
}