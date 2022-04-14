/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';
import { useCart } from '../../hooks/useCart';
import Link from 'next/link';

export function Header(){
  // const { cart } = useCart();
  // const cartSize = // TODO;

  return (
    <Container>
      <Link href="/">
        <img src="/images/logo.svg" alt="Rocketshoes" />
      </Link>

      <a href="cart">
        <Cart >
          <div>
            <strong>Meu carrinho</strong>
            <span data-testid="cart-size">
              {/* {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`} */}
            </span>
          </div>
          <MdShoppingBasket size={36} color="#FFF" />
        </Cart>
      </a>
    </Container>
  );
};

