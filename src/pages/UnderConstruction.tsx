import { useState, useEffect } from "react";
import Index from "./Index"; // Importe seu componente Index para renderizar

const UnderConstruction = () => {
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const password = "averdadeiramaionese"; // coloque sua senha aqui

  useEffect(() => {
    const savedAuth = localStorage.getItem("underConstructionAuthorized");
    if (savedAuth === "true") {
      setIsAuthorized(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === password) {
      localStorage.setItem("underConstructionAuthorized", "true");
      setIsAuthorized(true);
    } else {
      alert("Senha incorreta!");
    }
  };

  if (isAuthorized) {
    // Renderiza o site completo após login correto
    return <Index />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 dark:bg-gray-900 px-5">
      <img
        src="https://ybggbbekoxgkeyvkiech.supabase.co/storage/v1/object/public/imgproj/logoMAX.png"
        alt="Logo Max Demian"
        className="w-80 mb-8"
      />
      <h1 className="text-4xl font-bold mb-8 text-brand-accent">Site em Construção</h1>
      <p className="text-lg text-gray-100 dark:text-gray-300 mb-6 text-center">
        Insira a senha para acessar o conteúdo.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-xs">
        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          placeholder="Senha"
          className="w-full px-4 py-2 border border-gray-400 rounded"
        />
        <button
          type="submit"
          className="w-full bg-brand-accent text-white py-2 rounded hover:bg-brand-accent/90 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default UnderConstruction;
