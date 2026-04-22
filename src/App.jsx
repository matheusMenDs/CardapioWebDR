import React, { useState } from 'react';
import './App.css';
import { FaUtensils } from 'react-icons/fa';

function OrderForm({ currentScreen }) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [endereco, setEndereco] = useState('');
  const [sabores, setSabores] = useState('');
  const numeroWpp = '5561993680068'; 

  function handleSubmit(e) {
    e.preventDefault();
    const itemType = currentScreen === 'marmitas' ? 'marmitas' : 'empanadas';
    const texto = `Olá! Meu nome é ${nome}. Gostaria de pedir ${quantidade} ${itemType} com os seguintes sabores: ${sabores}. Endereço: ${endereco}`;
    const url = `https://wa.me/${numeroWpp}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
      </label>
      <label>
        Quantidade:
        <input type="number" min="2" value={quantidade} onChange={e => setQuantidade(e.target.value)} required />
      </label>
      <label>
        Sabores desejados:
        <textarea value={sabores} onChange={e => setSabores(e.target.value)} required placeholder="Ex: 2x Strogonoff, 1x Lasanha vegana..." />
      </label>
      <label>
        Endereço:
        <input type="text" value={endereco} onChange={e => setEndereco(e.target.value)} required placeholder="Ex: Rua das Flores, 123, Centro" />
      </label>
      <button type="submit">Enviar pedido pelo WhatsApp</button>
      <p className="update-note">Atualizado quinzenalmente!</p>
      <p className="thanks-note">Obrigado pela preferência! Bom apetite!</p>
    </form>
  );
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('marmitas');

  const marmitasItems = [
    { name: 'Carne moída, arroz, feijão e legumes.', icon: FaUtensils },
    { name: 'Strogonoff de frango, arroz e batata palha.', icon: FaUtensils },
    { name: 'Panqueca de carne moída (molho branco ou vermelho) e arroz.', icon: FaUtensils },
    { name: 'Cozido com arroz e feijão (repolho, cenoura e batata).', icon: FaUtensils },
    { name: 'Lasanha vegana de abóbora.', icon: FaUtensils },
    { name: 'Macarrão à bolonhesa.', icon: FaUtensils },
    { name: 'Peito de frango, arroz, feijão e legumes.', icon: FaUtensils },
    { name: 'Bife acebolado, arroz, feijão e legumes.', icon: FaUtensils },
    { name: 'Almôndegas, arroz, feijão e legumes.', icon: FaUtensils },
  ];

  const empanadasItems = [
    // Adicione os itens das empanadas aqui, por exemplo:
    { name: 'Empanada de lagarto.', icon: FaUtensils },
    { name: 'Empanada de cogumelo.', icon: FaUtensils },
    { name: 'Empanada de vegetais.', icon: FaUtensils },
    { name: 'Empanada de banana.', icon: FaUtensils },
  ];

  const menuItems = currentScreen === 'marmitas' ? marmitasItems : empanadasItems;
  const screenTitle = currentScreen === 'marmitas' ? 'MARMITAS' : 'EMPANADAS';
  const price = currentScreen === 'marmitas' ? '20,00' : '12,00'; // Ajuste o preço conforme necessário

  return (
    <div className="container">
      <header className="header">
        <h1 className="logo-title"><img src="/img/logo.png" alt="Logo" className="logo-img" /> <span className="title-text">Menu da Rafa</span> <img src="/img/logo.png" alt="Logo" className="logo-img" /></h1>
      </header>
      <main>
        <section className="menu-section">
          <div className="menu-header">
            <div className="menu-buttons">
              <button onClick={() => setCurrentScreen('marmitas')} className={currentScreen === 'marmitas' ? 'active' : ''}>MARMITAS</button>
              <button onClick={() => setCurrentScreen('empanadas')} className={currentScreen === 'empanadas' ? 'active' : ''}>EMPANADAS</button>
            </div>
            <span className="price-box"><span className="currency">R$</span><span className="amount">{price}</span></span>
          </div>
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="menu-item">
                <div className="item-row">
                  <IconComponent className="item-icon" />
                  <span className="item-name">{item.name}</span>
                </div>
              </div>
            );
          })}
        </section>
        <section className="info-section">
          <div className="menu-title">INFORMAÇÕES</div>
          <p><b>Os pedidos devem ser feitos com no mínimo 3 dias de antecedência. As entregas acontecem sempre nas quartas-feiras seguintes à data do pedido.</b></p>
          <div className="info-list">
            <div className="info-item"><b>- Pedido mínimo:</b> 2 unidades por sabor.</div>
            <div className="info-item"><b>- Frete:</b> A combinar.</div>
            <div className="info-item"><b>- Entregas:</b> Quartas-feiras.</div>
          </div>
        </section>
        <section className="pedido-section">
          <div className="menu-title">PEDIDO</div>
          <OrderForm currentScreen={currentScreen} />
        </section>
      </main>
      <footer className="footer">
        <div className="footer-signature">
          <img src="/img/chefe.png" alt="Chefe" className="chef-image" />
          <span className="chef-name">Rafaela Gonçalves Aguiar</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
