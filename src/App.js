import { useState } from 'react'; // Importa o useState do React para gerenciar o estado do componente
import{FiSearch} from 'react-icons/fi'; // Importa o ícone de busca da biblioteca react-icons
import './styles.css'; // Importa o arquivo de estilos CSS

import api from './services/api'; // Importa a configuração da API

// Define estados para armazenar o valor do input e os dados do CEP
function App() {  

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

// Função assíncrona que será chamada ao clicar no botão de busca
  async function handleSearch() {
    //01001000/json/

    if(input === ''){
        alert("Insira o CEP")  // Mostra um alerta se o campo estiver vazio
        cleanState()          // Limpa os estados    
        return;
      }

      try {                                  // Faz uma requisição para a API com o CEP digitado                 
        const response = await api.get(`${input}/json`); 
        setCep(response.data);              // Atualiza o estado com os dados do CEP
        setInput("");                      // Limpa o campo de input

      } catch {
        alert("CEP INVÁLIDO");             // Mostra um alerta se a requisição falhar
        cleanState();
      }
    }
// Função para limpar os estados do input e do CEP
    async function cleanState(){
      setInput("")
      setCep({});
    }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input  
        type="text"
        placeholder="Digite seu cep..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

      <button className="buttonSearch" onClick={handleSearch}>
        <FiSearch size={25} color="#FFF"/>
      </button>
     </div>


     {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>
      
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span> 
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade / Estado: {cep.localidade} - {cep.uf}</span>
    
        </main>
          )}
 
  </div>

  
  );
}

export default App; // Exporta o componente App para ser usado em outras partes da aplicação
