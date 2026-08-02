import Page from "./pages/page"
import { useEffect, useState } from 'react'
import "./index.css";

function App() {
  // 1. Criamos os "espaços" (estados) para guardar os dados do banco
  const [totalArrecadado, setTotalArrecadado] = useState(0);
  const [muralDoacoes, setMuralDoacoes] = useState([]);
  const [backendLigado, setBackendLigado] = useState(false);

  // 2. O useEffect é o nosso "Despertador"
  // Tudo que está aqui dentro roda uma única vez no momento em que o site abre
  useEffect(() => {
    const acordarBackendEBuscarDados = async () => {
      try {
        // Ele bate na rota /doacoes usando a URL que você colocou no .env
        const resposta = await fetch(`${import.meta.env.VITE_API_URL}/doacoes`);
        const dados = await resposta.json();
        
        // 3. Salvamos os dados recebidos na memória do React
        setTotalArrecadado(dados.total_arrecadado);
        setMuralDoacoes(dados.doacoes);
        setBackendLigado(true); // O Render respondeu!
        
      } catch (error) {
        console.error("O servidor do Render está acordando, aguarde...", error);
      }
    };

    acordarBackendEBuscarDados();
  }, []); // Essa array vazia [] garante que só rode 1 vez ao abrir a página

  return <Page />
}

export default App
