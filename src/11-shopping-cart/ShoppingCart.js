import { useCallback, useMemo, useState } from 'react'

const items = [{
  name: 'apple',
  price: 0.39
}, {
  name: 'banana',
  price: 0.79
}, {
  name: 'cherry tomatoes',
  price: 3.99
}]

function ShoppingCart () {
  const [cart, setCart] = useState({});

  const handleAddToCart = useCallback((name, price, increment = true) => {
    const next = { ...cart };
    if (!next[name]?.quantity) {
      next[name] = {
        quantity: 0,
        price: price
      };
    }
    if (increment) next[name].quantity++;
    else next[name].quantity--;
    if (next[name]?.quantity <= 0) delete next[name];
    setCart(next);
  }, [cart]);

  const total = useMemo(() => {
    return Object.values(cart).reduce((acc, i) => acc += i.quantity * i.price, 0);
  }, [cart]);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className='cart'>
        <div className='items'>
          <h2>Items</h2>
          {items.map(item => (
            <div key={item.name}>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <button onClick={() => handleAddToCart(item?.name, item?.price)}>Add to Cart</button>
            </div>)
          )}
        </div>
        <div>
          <h2>Cart</h2>
          {Object.entries(cart).map(([key, item], idx) => {
            return (
              <div key={`${key}--${idx}`}>
                <h3>{key}</h3>
                <p>
                  <button onClick={() => handleAddToCart(key, item.price, false)}>-</button>
                  {item.quantity}
                  <button onClick={() => handleAddToCart(key, item.price)}>+</button>
                </p>
                <p>Subtotal: ${(item.quantity * item.price).toFixed(2)}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className='total'>
        <h2>Total: ${total?.toFixed(2)}</h2>
      </div>
    </div>
  )
}

export default ShoppingCart
