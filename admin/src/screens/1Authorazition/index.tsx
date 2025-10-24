import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { useNavigate } from 'react-router-dom'

export const AuthorazitionSection = () => {
    const navigate = useNavigate()
    const url = import.meta.env.VITE_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                `${url}/admin/login`,
                { username: email, password: password },
                { withCredentials: true }
            );

            navigate('/booking');
        } catch (err: any) {
            if (err.response?.status === 404) {
                setError("Данного пользователя не существует.");
            } else if (err.response?.status === 500) {
                setError("Неверный пароль.");
            } else {
                setError("Произошла ошибка.");
            }
        }
    };


    return (
        <section className="w-full relative flex justify-center items-center min-h-[60vh] px-4">
            <Card className="bg-white rounded-lg shadow-sm w-full max-w-[400px]">
                <CardContent className="p-5 space-y-6 font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center">
                        Авторизация администратора
                    </h2>

                    <div className="space-y-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Введите email"
                            className="w-full h-[42px] px-4 rounded-md border border-solid border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Введите пароль"
                            className="w-full h-[42px] px-4 rounded-md border border-solid border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm sm:text-base text-center">
                            {error}
                        </div>
                    )}

                    <Button
                        onClick={handleLogin}
                        className="w-full h-[42px] sm:h-[48px] bg-[#66BB6A] hover:bg-[#5d8f4a] text-white rounded-md border border-solid border-[#00000026] text-sm sm:text-base"
                    >
                        <span className="font-normal">
                            Войти
                        </span>
                    </Button>
                </CardContent>
            </Card>
        </section>
    );
};

