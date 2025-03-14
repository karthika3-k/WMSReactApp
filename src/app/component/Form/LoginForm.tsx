import Image from "next/image";
import { useState } from "react";


interface LoginFormProps {
    onSubmit: (username: string, password: string) => void
    usernameError: string,
    passwordError: string,
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, usernameError, passwordError }) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(username, password);
    };

    return (
        <main className="bg-[url('/wms.jpg')] h-screen flex items-center justify-center flex-col py-20 px-6 md:px-55 relative">
            <div className="grid box-animate w-full h-full grid-cols-1 bg-white md:grid-cols-2">
                <div className="bg-[#16202a] text-white flex items-center justify-center flex-col py-10 px-6 md:px-16 relative">
                    <Image
                        className="object-cover absolute inset-0"
                        src="/wms2.jpg"
                        alt="background image"
                        layout="fill"
                    />
                </div>
                <div className="bg-[#16202a] text-white flex items-center justify-center flex-col py-10 px-6 md:px-16">
                    <div className="my-4 text-center">
                        <h1 className="text-4xl font-semibold mb-2">Login</h1>
                        <p className="mt-2 text-xs text-slate-200">
                            Access your account and manage your profile.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full max-w-md">
                        <div className="mb-6 relative">
                            <input
                                className="peer mt-2 w-full py-3 px-4 bg-transparent border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                type="text"
                                id="email"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder=" " 
                            />
                            <label
                                htmlFor="email"
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sm font-medium text-white-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-white-600 transition-all duration-200"
                            >
                                UserName*
                            </label>
                            {usernameError && <div className="text-red-500 text-sm mt-2">{usernameError}</div>}
                        </div>

                        <div className="mb-6 relative">
                            <input
                                className="peer mt-2 w-full py-3 px-4 bg-transparent border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=" " 
                            />
                            <label
                                htmlFor="password"
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sm font-medium text-white-500 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-white-600 transition-all duration-200"
                            >
                                Password*
                            </label>
                            {passwordError && <div className="text-red-500 text-sm mt-2">{passwordError}</div>}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500"
                        >
                            Log In
                        </button>
                    </form>


                    <div className="mt-6 text-sm text-center text-slate-300">
                        {/* <p>Don't have an account? <a href="#" className="text-indigo-400 hover:text-indigo-500">Sign Up</a></p> */}
                    </div>
                    <div className="relative hidden md:block">
                        <Image className="object-cover" fill={true}
                            src="" alt="background image" />
                    </div>
                </div>

            </div>
        </main>
    );
}
export default LoginForm;