import React, { useState } from 'react';

// Types et interfaces
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

type Category = 'Tous' | 'Électronique' | 'Mode' | 'Audio' | 'Accessoires';

const EcommerceSite: React.FC = () => {
  // Données des produits
  const products: Product[] = [
    {
      id: 1,
      name: "MacBook Pro 14\"",
      price: 2399,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      category: "Électronique",
      rating: 4.8,
      description: "Ordinateur portable haute performance avec puce M2"
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      price: 1199,
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=300&fit=crop",
      category: "Électronique", 
      rating: 4.9,
      description: "Smartphone dernière génération avec appareil photo professionnel"
    },
    {
      id: 3,
      name: "Nike Air Max",
      price: 149,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
      category: "Mode",
      rating: 4.6,
      description: "Baskets confortables pour le sport et le quotidien"
    },
    {
      id: 4,
      name: "Casque Sony WH-1000XM5",
      price: 399,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop",
      category: "Audio",
      rating: 4.7,
      description: "Casque sans fil avec réduction de bruit active"
    },
    {
      id: 5,
      name: "Montre Apple Watch",
      price: 449,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      category: "Électronique",
      rating: 4.5,
      description: "Montre connectée avec suivi santé et fitness"
    },
    {
      id: 6,
      name: "Sac à dos Leather",
      price: 89,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
      category: "Accessoires",
      rating: 4.4,
      description: "Sac à dos en cuir véritable, design minimaliste"
    }
  ];

  // États avec typage
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('Tous');

  // Catégories typées
  const categories: Category[] = [
    'Tous', 
    ...Array.from(new Set(products.map(p => p.category as Exclude<Category, 'Tous'>)))
  ];

  // Fonctions avec typage strict
  const addToCart = (product: Product): void => {
    const existingItem = cart.find((item: CartItem) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map((item: CartItem) => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, newQuantity: number): void => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map((item: CartItem) => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (id: number): void => {
    setCart(cart.filter((item: CartItem) => item.id !== id));
  };

  const getTotalPrice = (): number => {
    return cart.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = (): number => {
    return cart.reduce((total: number, item: CartItem) => total + item.quantity, 0);
  };

  const filteredProducts: Product[] = selectedCategory === 'Tous' 
    ? products 
    : products.filter((p: Product) => p.category === selectedCategory);

  // Composants d'icônes SVG
  const ShoppingCartIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="9" cy="21" r="1"/>
      <circle cx="20" cy="21" r="1"/>
      <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  );

  const PlusIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M12 5v14M5 12h14"/>
    </svg>
  );

  const MinusIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M5 12h14"/>
    </svg>
  );

  const XIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  );

  const StarIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );

  // Composant Header
  const Header: React.FC = () => (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">TechStore</h1>
          </div>
          
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Ouvrir le panier"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );

  // Composant Hero Section
  const HeroSection: React.FC = () => (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Découvrez nos produits</h2>
        <p className="text-xl opacity-90">Des produits de qualité à prix compétitifs</p>
      </div>
    </div>
  );

  // Composant Category Filter
  const CategoryFilter: React.FC = () => (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category: Category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );

  // Composant Product Card
  interface ProductCardProps {
    product: Product;
  }

  const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <StarIcon className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500 ml-2">{product.category}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">{product.price}€</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <PlusIcon className="h-4 w-4" />
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );

  // Composant Cart Item
  interface CartItemComponentProps {
    item: CartItem;
  }

  const CartItemComponent: React.FC<CartItemComponentProps> = ({ item }) => (
    <div className="flex items-center gap-3 p-3 border rounded-lg">
      <img
        src={item.image}
        alt={item.name}
        className="w-12 h-12 object-cover rounded"
      />
      <div className="flex-1">
        <h4 className="font-medium text-sm">{item.name}</h4>
        <p className="text-gray-600">{item.price}€</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-1 hover:bg-gray-100 rounded"
          aria-label="Diminuer la quantité"
        >
          <MinusIcon className="h-4 w-4" />
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 hover:bg-gray-100 rounded"
          aria-label="Augmenter la quantité"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="p-1 text-red-500 hover:bg-red-50 rounded"
        aria-label="Supprimer du panier"
      >
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  );

  // Composant Cart Sidebar
  const CartSidebar: React.FC = () => (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-transparent" 
        onClick={() => setIsCartOpen(false)}
        role="button"
        tabIndex={0}
        aria-label="Fermer le panier"
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Panier ({getTotalItems()})</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Fermer le panier"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Votre panier est vide</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item: CartItem) => (
                  <CartItemComponent key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-2xl font-bold text-blue-600">{getTotalPrice()}€</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Procéder au paiement
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoryFilter />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {isCartOpen && <CartSidebar />}
    </div>
  );
};

export default EcommerceSite;