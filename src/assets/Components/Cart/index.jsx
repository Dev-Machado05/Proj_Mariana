import { useState, useEffect } from "react";
import "./style.css";

export default function CartSection({ ProductList, CartList, setCartList, ChangeDisplay, CleanCart }) {
    const [FinalPrice, setFinalPrice] = useState(0);
    const [coupon, setCoupon] = useState("");
    const [discountedPrice, setDiscountedPrice] = useState(0);

    useEffect(() => {
        const totalPrice = CartList.reduce((acc, cartItem) => {
            const product = ProductList.find((p) => p.id === cartItem);
            if (!product) return acc;
            return acc + (product.descount ? product.price * 0.85 : product.price);
        }, 0);

        setFinalPrice(totalPrice);
        setDiscountedPrice(totalPrice);
    }, [CartList, ProductList]);

    function applyDiscount() {
        if (coupon === "Alan") {
            setDiscountedPrice(FinalPrice * 0.8);
        } else {
            setDiscountedPrice(FinalPrice);
        }
    }

    function RemoveItem(id) {
        setCartList((prevCart) => {
            const indexToRemove = prevCart.indexOf(id); 
            if (indexToRemove === -1) return prevCart; 
            
            const updatedCart = [...prevCart]; 
            updatedCart.splice(indexToRemove, 1);

            return updatedCart;
        });
    }

    function EndShop() {
        CleanCart();
        ChangeDisplay();
    }

    return (
        <main className="CartContainer">
            <section className="CartInfo">
                {CartList.map((cartItem, index) => {
                    const product = ProductList.find((p) => p.id === cartItem);
                    if (!product) return null;

                    return (
                        <section key={index}>
                            <p className="ProductName">{product.name}</p>
                            {product.descount ? (
                                <>
                                    <p className="OriginalPrice">De: R$:<span>{product.price.toFixed(2)}</span></p>
                                    <p className="DiscountedPrice">R$: {(product.price * 0.85).toFixed(2)}</p>
                                </>
                            ) : (
                                <p className="DiscountedPrice">{product.price.toFixed(2)}</p>
                            )}
                            <button className="RemoveItem" onClick={() => RemoveItem(cartItem)}>Remover</button>
                        </section>
                    );
                })}
            </section>

            <section className="CartPayment">
                <div className="Cupon">
                    <input 
                        type="text" 
                        placeholder="Cupom de desconto" 
                        value={coupon} 
                        onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button onClick={applyDiscount}>Aplicar</button>
                </div>
                <h2 className="finalPrice_text">total a pagar: <br />
                    R$: {discountedPrice.toFixed(2)}
                </h2>
                <button onClick={EndShop} className="EndPurchase">Finalizar</button>
            </section>
        </main>
    );
}
