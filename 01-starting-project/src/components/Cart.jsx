import { useContext } from "react";
import { currencyFormatter } from "../util/formatter";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartContext from "./store/CartContext";
import UserProgressContext from "./store/UserProgressContext";
import CartItems from "./CartItems";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userCtx.hideCart();
  }

  function handleCheckout() {
    userCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userCtx.progress === "cart"}
      onClose={userCtx.progress === "cart" ? handleClose : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItems
            key={item.id}
            item={item}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleCheckout}>Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
