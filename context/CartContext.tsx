'use client'
// context/CartContext.tsx
import { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react'
import type { CartItem, Product } from '@/types/database'

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; index: number }
  | { type: 'UPDATE_QTY'; index: number; delta: number }
  | { type: 'CLEAR' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.findIndex(
        i => i.id === action.item.id &&
             JSON.stringify(i.color) === JSON.stringify(action.item.color) &&
             i.size === action.item.size
      )
      if (existing > -1) {
        const next = [...state.items]
        next[existing] = { ...next[existing], qty: next[existing].qty + action.item.qty }
        return { items: next }
      }
      return { items: [...state.items, action.item] }
    }
    case 'REMOVE':
      return { items: state.items.filter((_, i) => i !== action.index) }
    case 'UPDATE_QTY':
      return {
        items: state.items.map((item, i) =>
          i === action.index ? { ...item, qty: Math.max(1, item.qty + action.delta) } : item
        )
      }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  totalQty: number
  totalPrice: number
  addItem: (product: Product, color: CartItem['color'], size: string | null, qty: number) => void
  removeItem: (index: number) => void
  updateQty: (index: number, delta: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const totalQty   = state.items.reduce((s, i) => s + i.qty, 0)
  const totalPrice = state.items.reduce((s, i) => s + i.price * i.qty, 0)

  const addItem = useCallback((product: Product, color: CartItem['color'], size: string | null, qty: number) => {
    dispatch({
      type: 'ADD',
      item: {
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.images?.[0] ?? null,
        color,
        size,
        qty,
      },
    })
  }, [])

  const removeItem = useCallback((index: number) => dispatch({ type: 'REMOVE', index }), [])
  const updateQty  = useCallback((index: number, delta: number) => dispatch({ type: 'UPDATE_QTY', index, delta }), [])
  const clear      = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  return (
    <CartContext.Provider value={{ items: state.items, totalQty, totalPrice, addItem, removeItem, updateQty, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
