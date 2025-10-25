import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import axios from "axios";

export const CreateAdminSection = () => {
    const url = import.meta.env.VITE_URL;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);
            await axios.post(
                `${url}/admin/edit`,
                { username: email, password: password },
                { withCredentials: true }
            );

            alert('Успешное создание нового пользователя!');
            setEmail('');
            setPassword('')
        } catch (err: any) {
            setError("Произошла ошибка при создании администратора.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700 p-6">
                <p className="text-xl animate-pulse">Создание администратора...</p>
            </div>
        );
    }

    return (
        <section className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
            <Card className="bg-white rounded-lg shadow-lg w-full max-w-md">
                <CardContent className="p-8 space-y-6 font-sans">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center break-words">
                        Создание нового администратора
                    </h2>

                    <p className="text-gray-600 text-base sm:text-lg text-center break-words">
                        После создания нового администратора все предыдущие аккаунты будут удалены из базы данных.
                        Пожалуйста, убедитесь, что вы хотите продолжить, так как это действие невозможно отменить.
                    </p>

                    <div className="space-y-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Введите логин"
                            className="w-full h-12 px-4 rounded-md border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#66BB6A] transition"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Введите пароль"
                            className="w-full h-12 px-4 rounded-md border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#66BB6A] transition"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm sm:text-base text-center">
                            {error}
                        </div>
                    )}

                    <Button
                        onClick={handleLogin}
                        className="w-full h-12 sm:h-14 bg-[#66BB6A] hover:bg-[#5d8f4a] text-white rounded-md font-medium transition"
                    >
                        Зарегистрировать администратора
                    </Button>
                </CardContent>
            </Card>
        </section>
    );
};
