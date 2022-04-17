/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from '../styles/home';
import { api } from '../services/api';
import { formatPrice } from '../util/format';
import { useCart } from '../hooks/useCart';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartproductsAmount {
  [key: number]: number;
}

export default function Home(){
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const cartproductsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = {...sumAmount};

    newSumAmount[product.id] = product.amount;

    return newSumAmount;
  }, {} as CartproductsAmount)

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<Product[]>("/products");

      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      })) 

      setProducts(data);

      console.log(data)
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id);
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>
          <button
            type="button"
            data-testid="add-product-button"
            onClick={() => handleAddProduct(product.id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
              {cartproductsAmount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};


