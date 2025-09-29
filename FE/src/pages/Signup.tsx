import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';


export function Signup() {
    const navigate = useNavigate()
    const [firstname, setFirstName] = useState<String>("")
    const [lastname, setLastName] = useState<String>("")
    const [email, setEmail] = useState<String>("")
    const [password, setPassword] = useState<String>("")

    return <div className="flex flex-col justify-center sm:h-screen p-4">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
            <div className="text-center mb-5 text-2xl">
                Sign Up
                <div className='text-slate-300 text-sm mt-2'>
                    Enter your information to create an Account
                </div>
            </div>
            <div className="space-y-6">
                <InputBox onChange={(e) => {
                    setFirstName(e.target.value)
                }} label='First Name' placeholder='John' />
                <InputBox onChange={e =>{
                    setLastName(e.target.value)
                }} label='Last Name' placeholder='Cena' />
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
                                const response = await axios.post("http://localhost:3000/api/v1/signup", {
                                    firstname,
                                    lastname,
                                    password,
                                    email
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
            {/* <BottomWarning label='Already Have an Account' buttonText='Sign In' to='/signup' /> */}


        </div>
    </div>
}