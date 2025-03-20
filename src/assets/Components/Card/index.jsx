import "./style.css";
import { Cart } from "../../img";

export default function Card({ id, image, name, price, descount, onAdd }) {
  function AddCart() {
    onAdd(id);
  }

  return (
    <aside className="CardContainer">
      <main className="CardContent">
        <span className="CardSpan">
          {descount ? "Desconto de 15%" : "Utilize o cupom: Alan"}
        </span>
        <img src={image} alt={`Produto${id}`} />
        <p className="ProductName">{name}</p>
      </main>

      <section>
        {descount ? (
          <>
            <h4 className="OldPrice"> R$: {price.toFixed(2)} </h4>
            <h4> R$: {(price * 0.85).toFixed(2)} </h4>
          </>
        ) : (
          <h4>R$: {price.toFixed(2)}</h4>
        )}
        <button onClick={AddCart} className="BuyButton">
          <img src={Cart} alt="cardshop_Icon" />
          <span>Comprar</span>
        </button>
      </section>
    </aside>
  );
}
