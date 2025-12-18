import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

  addProductTocart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;

  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Methods
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();

        // const subTotal = cart.reduce(
        //   (subTotal, product) => product.quantity * product.price + subTotal,
        //   0
        // );
        // const tax = subTotal * 0.15;
        // const total = subTotal + tax;
        // const itemsInCart = cart.reduce(
        //   (total, item) => total + item.quantity,
        //   0
        // );

////////paso de place order
  const { subTotal, tax, total, itemsInCart } = cart.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;

      const subTotal = item.price * productQuantity;
      const subTax = (item.porIva/100) * item.price * productQuantity ;
      // const subTotal = 1 * productQuantity;
      
      // totals.subTotal += subTotal;
      // totals.tax += subTotal * 0.15;
      // totals.total += subTotal * 1.15;
      totals.itemsInCart += item.quantity;
      totals.subTotal += subTotal;
      totals.tax += subTax;
      totals.total += subTotal + subTax;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0, itemsInCart:0 }
  );
////////paso de place order



        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },

      addProductTocart: (product: CartProduct) => {
        const { cart } = get();

        // 1. Revisar si el producto existe en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 2. Se que el producto existe por talla... tengo que incrementar
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size
        );

        set({ cart: updatedCartProducts });
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),

    {
      name: "shopping-cart",
    }
  )
);
