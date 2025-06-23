import shoppingCart from "../assets/shopping-cart.svg"

interface CartItem {
  id: string
  name: string
  price: string
  quantity: number
  image: string
}

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
}

export default function CartSidebar({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }: CartSidebarProps) {
  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = Number.parseFloat(item.price.replace("$", ""))
        return total + price * item.quantity
      }, 0)
      .toFixed(2)
  }

  return (
    <>
      {isOpen && <div className="fixed inset-0  bg-opacity-50 z-40 transition-opacity" onClick={onClose} />}

      <div
        className={`fixed top-0 right-0 h-full w-100 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-cyan-50">
          <h2 className="text-xl font-bold text-gray-800">Mi Carrito</h2>
          <button onClick={onClose} className="p-2 hover:bg-cyan-100 rounded-full transition-colors">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-200px)]">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <img src={shoppingCart} alt="Carrito" className="w-16 h-16 mx-auto" />
              </div>
              <p className="text-gray-500">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                    <p className="text-cyan-600 font-semibold">{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center hover:bg-cyan-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center hover:bg-cyan-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total y Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-white">
            <div className="bg-cyan-500 text-white p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-medium">Total:</span>
                <span className="text-2xl font-bold">${calculateTotal()}</span>
              </div>
              <button className="w-full bg-white text-cyan-500 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Proceder al Pago
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
