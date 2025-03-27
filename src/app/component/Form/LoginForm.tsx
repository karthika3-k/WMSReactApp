import Image from "next/image";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


interface LoginFormProps {
    onSubmit: (username: string, password: string) => void
    usernameError: string,
    passwordError: string,
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, usernameError, passwordError }) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
                    <div>
                        <Image
                            src="/Techativelogo.png"
                            alt="background image"
                            width={130}
                            height={100}
                            className="m-4"
                        />
                    </div>
                    <div className="my-4 text-center">

                        <h1 className="text-4xl font-semibold mb-2">Login</h1>
                        <p className="mt-2 text-xs text-slate-200">
                            Access your account and manage your profile.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full max-w-md">
                        <div className="mb-6 relative">

                            <label className="floating-label text-indigo-700 font-medium transition-all duration-200">
                                <span> UserName*</span>

                                <input
                                    className="input input-md mt-2 w-full py-3 px-4 text-white bg-transparent border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    type="text"
                                    id="email"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="UserName"
                                />

                            </label>
                            {usernameError && <div className="text-red-500 text-sm mt-2">{usernameError}</div>}
                        </div>

                        <div className="mb-6 relative">
                            <label className="floating-label text-indigo-700 font-medium transition-all duration-200">
                                <span> Password*</span>

                                <input
                                    className="input input-md mt-2 w-full py-3 px-4 text-white bg-transparent border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ?  <FaEye />:<FaEyeSlash />}
                                </button>

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