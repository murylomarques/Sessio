"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!token) setMessage("Nenhum token de recuperação encontrado na URL!");
  }, [token]);

  const handleReset = async () => {
    if (!token) {
      setMessage("Token inválido ou expirado.");
      return;
    }

    if (!password || !confirmPassword) {
      setMessage("Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMessage(data.error);
      }
    } catch (err) {
      setMessage("Ocorreu um erro inesperado. Tente novamente.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Redefinir senha
        </h1>

        {message && (
          <div
            className={`mb-4 text-center font-medium transition-all duration-500 ${
              message.includes("sucesso") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Nova senha"
            className="w-full border border-gray-300 rounded p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <div className="relative mb-6">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirmar nova senha"
            className="w-full border border-gray-300 rounded p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-400"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold p-3 rounded-lg transition flex justify-center items-center gap-2"
        >
          {loading ? "Atualizando..." : "Atualizar senha"}
        </button>
      </div>
    </div>
  );
}
