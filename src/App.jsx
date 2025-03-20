import "./App.scss";
import { UsIcon, ChevronDown, Cart } from "./assets/img";
import ImageCarroussel from "./assets/Components/Carroussel";
import Card from "./assets/Components/Card";
import CartSection from "./assets/Components/Cart";
import { useEffect, useState } from "react";

import ProductsDB from "./assets/SimBD/Projects";

export default function App() {
  const [ConectedAccount, setConectedAccount] = useState(false);
  const [Connect, setConnect] = useState(true);
  const [DisconectDisplay, setDisconectDisplay] = useState(false);
  const [Password, setPassword] = useState("");
  const [ConfPassword, setConfPassword] = useState("");
  const [UserAccount, setUserAccount] = useState({ name: "", Password: "" });
  const [IdentifyAccount, setIdentifyAccount] = useState(false);
  const [Products, setProducts] = useState([]);
  const [CartItems, setCartItems] = useState([]);
  const [CartDisplay, setCartDisplay] = useState(false);
  const [LoginName, setLoginName] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");


  const handleAddCart = (productId) => {
    setCartItems((prev) => [...prev, productId]);
  };

  const CleanCart = () => {
    setCartItems([]);
  };

  const ConnectAccount = () => {
    setConnect(!Connect);
  };

  const ChangeDisconectDisplay = () => {
    setDisconectDisplay(!DisconectDisplay);
    document.body.style.overflow = CartDisplay ? "" : "hidden";
  };

  const changeDisplayCart = () => {
    setCartDisplay(!CartDisplay);
  };

  useEffect(() => {
    setTimeout(() => {
      setProducts(ProductsDB);
    }, 500);
  }, []);

  const ConnectUser = () => {
    setIdentifyAccount(!IdentifyAccount);
    document.body.style.overflow = IdentifyAccount ? "" : "hidden";
  };

  function ChangeConectedAccount() {
    setConectedAccount(!ConectedAccount);
  };

  function ConfCreation() {
    if (Password.trim() && Password === ConfPassword) {
      setUserAccount({ ...UserAccount, Password });
      ChangeConectedAccount();
      ConnectUser();
    } else {
      alert("Senha inválida...");
    }
  }

  function DisconectAcount() {
    ChangeDisconectDisplay();
    ChangeConectedAccount();
  };

  function LoginUser() {
    if (LoginName === UserAccount.name && LoginPassword === UserAccount.Password) {
      ChangeConectedAccount();
      ConnectUser();
    } else {
      alert("Usuário ou senha incorretos!");
    }
  }

  return (
    <section className="App">
      <header>
        <aside className="UserContainer">
          {ConectedAccount ? (
            <section onClick={ChangeDisconectDisplay}>
              <img src={UsIcon} alt="" className="UserIcon" />
              <h3>{UserAccount.name}</h3>
            </section>
          ) : (
            <section onClick={ConnectUser}>
              <img src={UsIcon} alt="" className="UserIcon" />
              <h3>
                Entre <span>ou</span> cadastre-se
              </h3>
            </section>
          )}
        </aside>
        <button className="CartButton" onClick={changeDisplayCart}>
          <img src={Cart} alt="" />
          <h3>
            Carrinho <br />
            <span>{CartItems.length} Produtos</span>
          </h3>
          <img src={ChevronDown} alt="" className="ChevronDown" />
        </button>
      </header>

      {DisconectDisplay ? (
        <section className="DisconectTable">
          <main>
            <h1>Você deseja se desconectar?</h1>
            <div className="ButtonContainer">
            <button className="ReturnlButton" onClick={ChangeDisconectDisplay}>Cancelar</button>
            <button className="DisconectButton" onClick={DisconectAcount}>Desconectar</button>
            </div>
          </main>
        </section>
      ) : null}

      {/* Account Pop-up */}
      {IdentifyAccount && (
        <section className="UserTable">
          {Connect ? (
            <main>
              <h1>Entrar</h1>
              <div className="InputContainer">
                <input type="text" placeholder="Usuário" value={LoginName} onChange={(e) => setLoginName(e.target.value)} />
                <input type="password" placeholder="Senha" value={LoginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
              </div>
              <div className="ButtonContainer">
                <button className="CancelButton" onClick={ConnectUser}>
                  Sair
                </button>
                <button className="ConfirmButton" onClick={LoginUser}>Confirmar</button>
              </div>
              <p>
                Não tem uma conta?{" "}
                <span onClick={ConnectAccount}> Criar uma conta</span>
              </p>
            </main>
          ) : (
            <main>
              <h1>Criar sua conta</h1>
              <div className="InputContainer">
                <input
                  type="text"
                  placeholder="Usuário"
                  value={UserAccount.name}
                  onChange={(e) =>
                    setUserAccount({ ...UserAccount, name: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirmar Senha"
                  value={ConfPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                />
              </div>
              <div className="ButtonContainer">
                <button className="CancelButton" onClick={ConnectUser}>
                  Sair
                </button>
                <button className="ConfirmButton" onClick={ConfCreation}>
                  Confirmar
                </button>
              </div>
              <p>
                Já tem uma conta? <span onClick={ConnectAccount}> Entrar</span>
              </p>
            </main>
          )}
        </section>
      )}

      {/* Cart Content */}
      {CartDisplay && (
        <CartSection
          ProductList={Products}
          CartList={CartItems}
          setCartList={setCartItems}
          ChangeDisplay={changeDisplayCart}
          CleanCart={CleanCart}
        />
      )}

      {/* MAIN CONTENT */}
      <ImageCarroussel />
      <main className="MainContent">
        <h3 className="ProductSectionTitle">Principais produtos:</h3>
        <section className="ProductContainer">
          {Products.map((product) =>
            product.mainProct ? (
              <Card key={product.id} {...product} onAdd={handleAddCart} />
            ) : null
          )}
        </section>
        <h3 className="ProductSectionTitle">Principais Consoles:</h3>
        <section className="ProductContainer">
          {Products.map((product) =>
            product.class === "console" ? (
              <Card key={product.id} {...product} onAdd={handleAddCart} />
            ) : null
          )}
        </section>
        <h3 className="ProductSectionTitle">Principais Jogos:</h3>
        <section className="ProductContainer">
          {Products.map((product) =>
            product.class === "jogo" ? (
              <Card key={product.id} {...product} onAdd={handleAddCart} />
            ) : null
          )}
        </section>
      </main>
      <footer>
        <p>
          Página desenvolvida para uma atividade acadêmica, e sem nenhum motivo
          financeiro ou comercial...
        </p>
      </footer>
    </section>
  );
}
