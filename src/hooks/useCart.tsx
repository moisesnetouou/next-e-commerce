import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from './types';
import {setCookie, parseCookies} from 'nookies';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>([]);
    // const {'@RocketShoes:cart': storagedCart} = parseCookies()
    // const storagedCart = localStorage.getItem('@RocketShoes:cart');
  //   if (storagedCart) {
  //     return JSON.parse(storagedCart); // retornado em forma de array de produtos
  //   }

  //   console.log(storagedCart);

  //   return [];
  // });

  useEffect(()=> {
    const {'@RocketShoes:cart': storagedCart} = parseCookies();
    console.log(JSON.parse(storagedCart))

    if (storagedCart) {
      setCart(JSON.parse(storagedCart)); // retornado em forma de array de produtos
    }

  }, [])


  const addProduct = async (productId: number) => {
    try {
      const updatedCart = [...cart]; // novo array com valores de cart
      const productExists = updatedCart.find(product => product.id === productId);

      const stock = await api.get(`/stock/${productId}`);
      const stockAmount = stock.data.amount;
      const currentAmount = productExists ? productExists.amount : 0;
      const amount = currentAmount + 1;

      if(amount > stockAmount){
        toast.error("Quantidade solicitada fora de estoque");

        return;
      }

      if(productExists){
        productExists.amount = amount;
      } else { // senao, se for um produto novo 
        const product = await api.get((`/products/${productId}`));

        const newProduct = {
          ...product.data,
          amount: 1
        }

        updatedCart.push(newProduct);
      }

      setCart(updatedCart);
      setCookie(undefined, '@RocketShoes:cart', JSON.stringify(updatedCart), {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      });
      
    } catch {
      toast.error("Erro na adiçao do produto");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = [...cart];

      const productIndex = updatedCart.findIndex(product => product.id === productId);

      if(productIndex >= 0){
        updatedCart.splice(productIndex, 1); // apaga o item
        setCart(updatedCart);
        setCookie(undefined, '@RocketShoes:cart', JSON.stringify(updatedCart), {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/'
        });
      } else {
        throw Error();
      }

    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if(amount <= 0){
        return;
      }

      const stock = await api.get(`/stock/${productId}`);

      const stockAmount = stock.data.amount;

      if(amount > stockAmount){
        toast.error('Quantidade solicitada fora de estoque')
        return;
      }

      const updatedCart = [...cart];
      const productExists = updatedCart.find(product => product.id === productId);

      if(productExists){
        productExists.amount = amount;
        setCart(updatedCart);
        setCookie(undefined, '@RocketShoes:cart', JSON.stringify(updatedCart), {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/'
        });
      }else {
        throw Error();
      }

    } catch {
      toast.error('Erro na alteração da quantidade de produto')
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}