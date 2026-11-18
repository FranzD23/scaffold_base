import React, { useState, useEffect } from 'react';

// Catálogo Móvil Hamburger Rapid
const MENU_ITEMS = [
  {
    id: 1,
    name: "Rey de las Burgers",
    category: "especiales",
    price: 15.99,
    badge: "Leyenda ⭐⭐⭐",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    description: "Carne Angus flameada a la leña, cheddar 18 meses, panceta al maple y salsa trufada secreta.",
    calories: "890 kcal",
    time: "12 min"
  },
  {
    id: 2,
    name: "Burger Real Clásica",
    category: "clasicas",
    price: 10.99,
    badge: "Insignia ⭐",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
    description: "180g de carne Angus, lechuga romana, tomate pera maduro, pepinillos dulces y queso fundido.",
    calories: "680 kcal",
    time: "9 min"
  },
  {
    id: 3,
    name: "Burger Real Doble",
    category: "dobles",
    price: 13.99,
    badge: "Doble Smash ⭐⭐",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
    description: "Doble medallón smash crujiente, doble Monterrey Jack, tocino ahumado y aderezo imperial.",
    calories: "920 kcal",
    time: "10 min"
  },
  {
    id: 4,
    name: "Burger Doble Especial",
    category: "especiales",
    price: 14.50,
    badge: "Del Chef ⭐⭐⭐",
    image: "https://images.unsplash.com/photo-1583032015879-6617a2fb0408?w=600&auto=format&fit=crop&q=80",
    description: "Doble carne madurada, queso gorgonzola, cebolla caramelizada al vino tinto y rúcula.",
    calories: "850 kcal",
    time: "13 min"
  },
  {
    id: 5,
    name: "Smash Trufa & Funghi",
    category: "especiales",
    price: 14.90,
    badge: "Gourmet ⭐⭐⭐",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=80",
    description: "Doble smash con salteado de portobellos al tomillo, queso gruyère y crema trufada.",
    calories: "810 kcal",
    time: "11 min"
  },
  {
    id: 6,
    name: "Crispy Chicken Royal",
    category: "pollo",
    price: 11.99,
    badge: "Crujiente ⭐⭐",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80",
    description: "Pechuga en buttermilk 24h, empanizado panko japonés, coleslaw de manzana y miel mostaza.",
    calories: "740 kcal",
    time: "10 min"
  },
  {
    id: 7,
    name: "Bacon Lovers Deluxe",
    category: "dobles",
    price: 13.50,
    badge: "Bacon ⭐⭐",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&auto=format&fit=crop&q=80",
    description: "200g de carne, 4 lonchas de tocino ahumado grueso, mermelada bacon-bourbon y cheddar.",
    calories: "960 kcal",
    time: "10 min"
  },
  {
    id: 8,
    name: "Smoky BBQ Jack",
    category: "clasicas",
    price: 12.90,
    badge: "Ahumada ⭐⭐",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&auto=format&fit=crop&q=80",
    description: "Carne a la brasa con salsa barbacoa de ciruela, queso pepper jack y aros crocantes.",
    calories: "820 kcal",
    time: "11 min"
  },
  {
    id: 9,
    name: "Avocado Green Smash",
    category: "clasicas",
    price: 12.50,
    badge: "Fresh ⭐",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&auto=format&fit=crop&q=80",
    description: "Doble smash, aguacate fresco laminado, queso havarti suave y emulsión cítrica de lima.",
    calories: "710 kcal",
    time: "9 min"
  },
  {
    id: 10,
    name: "Volcán de Quesos Cheddar",
    category: "especiales",
    price: 15.50,
    badge: "Queso Extremo ⭐⭐⭐",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&auto=format&fit=crop&q=80",
    description: "Medallón relleno de mozzarella derretida bañado en baño de 4 quesos fundidos al momento.",
    calories: "1050 kcal",
    time: "14 min"
  },
  {
    id: 11,
    name: "Papas Rústicas Trufadas",
    category: "acompanamientos",
    price: 4.80,
    badge: "Guarnición",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80",
    description: "Papas rústicas con piel, sal marina gruesa, aceite de trufa blanca y queso parmesano rallado.",
    calories: "380 kcal",
    time: "5 min"
  },
  {
    id: 12,
    name: "Malteada Vainilla Bourbon",
    category: "bebidas",
    price: 4.50,
    badge: "Bebida",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80",
    description: "Helado artesanal de vainilla natural, crema batida sedosa y caramelo de mantequilla salada.",
    calories: "450 kcal",
    time: "3 min"
  }
];

const PROMO_COUPONS = [
  { code: "RAPID2X1", title: "Promo 2x1 en Burger Real Doble", discount: 13.99, description: "Compra una Burger Real Doble y llévate la segunda gratis." },
  { code: "BURGER20", title: "20% OFF en toda tu orden", percentage: 20, description: "Descuento del 20% en pedidos mayores a $20." },
  { code: "ENVIOGRATIS", title: "Envío Express Gratis", freeShipping: true, description: "Cero costo de delivery directo a tu puerta." }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('menu');
  const [menuFilter, setMenuFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart & Order Simulation State
  const [cart, setCart] = useState([
    {
      ...MENU_ITEMS[0], // Rey de las Burgers inicial
      quantity: 1,
      cookingPoint: 'Al Punto',
      extras: ['Panceta Extra (+ $1.50)']
    }
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  
  // Customization Modal State
  const [customizingItem, setCustomizingItem] = useState(null);
  const [selectedCooking, setSelectedCooking] = useState('Al Punto');
  const [selectedExtras, setSelectedExtras] = useState([]);

  // Active Simulated Order Tracking
  const [activeOrder, setActiveOrder] = useState(null);
  const [simulatedStep, setSimulatedStep] = useState(1);
  const [ordersHistory, setOrdersHistory] = useState([
    {
      id: "HR-7840",
      date: "Ayer, 20:15",
      itemsSummary: "1x Burger Real Doble, 1x Papas Trufadas",
      total: 18.79,
      status: "Entregado"
    },
    {
      id: "HR-6321",
      date: "14 Nov, 13:30",
      itemsSummary: "2x Burger Real Clásica",
      total: 21.98,
      status: "Entregado"
    }
  ]);

  // PWA & Connectivity
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
    };
  }, []);

  // Automatic simulation step advancement for demo realism
  useEffect(() => {
    let timer;
    if (activeOrder && simulatedStep < 5) {
      timer = setTimeout(() => {
        setSimulatedStep(prev => Math.min(prev + 1, 5));
      }, 7000);
    }
    return () => clearTimeout(timer);
  }, [activeOrder, simulatedStep]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('Para instalar la PWA: En tu navegador presiona el menú de opciones y selecciona "Agregar a pantalla principal".');
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  // Cart operations
  const openCustomizeModal = (item) => {
    setCustomizingItem(item);
    setSelectedCooking('Al Punto');
    setSelectedExtras([]);
  };

  const confirmAddToCart = () => {
    if (!customizingItem) return;
    const existingIndex = cart.findIndex(c => c.id === customizingItem.id && c.cookingPoint === selectedCooking);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, {
        ...customizingItem,
        quantity: 1,
        cookingPoint: selectedCooking,
        extras: [...selectedExtras]
      }]);
    }
    setCustomizingItem(null);
  };

  const updateQuantity = (index, delta) => {
    const updated = [...cart];
    updated[index].quantity += delta;
    if (updated[index].quantity <= 0) {
      updated.splice(index, 1);
    }
    setCart(updated);
  };

  const toggleExtra = (extraName) => {
    if (selectedExtras.includes(extraName)) {
      setSelectedExtras(selectedExtras.filter(e => e !== extraName));
    } else {
      setSelectedExtras([...selectedExtras, extraName]);
    }
  };

  // Price calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discountAmount = 0;
  let shippingCost = subtotal > 25 ? 0 : 2.50;

  if (appliedCoupon) {
    if (appliedCoupon.discount) {
      discountAmount = appliedCoupon.discount;
    } else if (appliedCoupon.percentage) {
      discountAmount = (subtotal * appliedCoupon.percentage) / 100;
    }
    if (appliedCoupon.freeShipping) {
      shippingCost = 0;
    }
  }
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const applyCoupon = (couponCode) => {
    const found = PROMO_COUPONS.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (found) {
      setAppliedCoupon(found);
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError('Cupón inválido o expirado.');
    }
  };

  // Order Simulation action
  const handleSimulateOrder = () => {
    if (cart.length === 0) return;
    const orderId = `HR-${Math.floor(1000 + Math.random() * 9000)}`;
    const itemsSummary = cart.map(i => `${i.quantity}x ${i.name}`).join(', ');

    const newOrder = {
      id: orderId,
      date: 'Justo ahora',
      itemsSummary,
      items: [...cart],
      total,
      status: 'En Preparación'
    };

    setActiveOrder(newOrder);
    setSimulatedStep(1);
    setOrdersHistory([newOrder, ...ordersHistory]);
    setCart([]); // Clear cart after ordering
  };

  // Filtered menu
  const filteredMenu = MENU_ITEMS.filter(item => {
    const matchesCategory = menuFilter === 'all' || item.category === menuFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const cartTotalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#FFFFFF', color: '#0F172A' }}>
      
      {/* Top Mobile Bar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.4rem' }}>🍔</span>
          <div>
            <div style={{ fontWeight: '800', fontSize: '0.95rem', lineHeight: 1.1, color: '#0F172A' }}>Hamburger Rapid</div>
            <div style={{ fontSize: '0.68rem', color: '#EA580C', fontWeight: '700' }}>Express App &bull; 15-25 min</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '0.7rem',
            padding: '3px 8px',
            borderRadius: '12px',
            fontWeight: '700',
            background: isOnline ? '#ECFDF5' : '#FEF2F2',
            color: isOnline ? '#059669' : '#DC2626',
            border: isOnline ? '1px solid #A7F3D0' : '1px solid #FECACA'
          }}>
            {isOnline ? '🟢 En línea' : '🔴 Offline'}
          </span>

          {deferredPrompt && (
            <button
              onClick={handleInstallClick}
              style={{
                background: '#0F172A',
                color: '#FFFFFF',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '8px',
                fontSize: '0.7rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Instalar
            </button>
          )}
        </div>
      </header>

      {/* Main Content View based on Tab */}
      <main style={{ flex: 1, paddingBottom: '76px', overflowY: 'auto' }}>
        
        {/* ===================== TAB 1: MENÚ ===================== */}
        {activeTab === 'menu' && (
          <div className="fade-in" style={{ padding: '16px' }}>
            
            {/* Delivery address banner */}
            <div style={{
              background: '#FFF7ED',
              border: '1px solid #FFEDD5',
              padding: '10px 14px',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.1rem' }}>📍</span>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#9A3412', fontWeight: '700' }}>ENTREGAR EN:</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A' }}>Av. Gourmet 742, Depto 4B</div>
                </div>
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#EA580C', cursor: 'pointer' }}>Cambiar</span>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', marginBottom: '14px' }}>
              <input
                type="text"
                placeholder="Buscar hamburguesa o ingrediente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  background: '#F8FAFC',
                  fontSize: '0.88rem',
                  outline: 'none',
                  color: '#0F172A'
                }}
              />
              <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#94A3B8' }}>🔍</span>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '14px', scrollbarWidth: 'none' }}>
              {[
                { id: 'all', label: 'Todo' },
                { id: 'especiales', label: 'Especiales' },
                { id: 'clasicas', label: 'Clásicas' },
                { id: 'dobles', label: 'Dobles/Smash' },
                { id: 'pollo', label: 'Pollo' },
                { id: 'acompanamientos', label: 'Papas' },
                { id: 'bebidas', label: 'Bebidas' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setMenuFilter(cat.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    whiteSpace: 'nowrap',
                    border: menuFilter === cat.id ? '1px solid #EA580C' : '1px solid #E2E8F0',
                    background: menuFilter === cat.id ? '#EA580C' : '#FFFFFF',
                    color: menuFilter === cat.id ? '#FFFFFF' : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Menu List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredMenu.map(item => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '12px',
                    gap: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '88px', height: '88px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <span style={{
                        fontSize: '0.65rem',
                        fontWeight: '800',
                        padding: '2px 6px',
                        borderRadius: '6px',
                        background: '#FEF3C7',
                        color: '#92400E'
                      }}>
                        {item.badge}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '0.96rem', fontWeight: '800', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </h4>

                    <p style={{
                      fontSize: '0.76rem',
                      color: '#64748B',
                      lineHeight: '1.3',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      margin: '4px 0 6px'
                    }}>
                      {item.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#EA580C' }}>
                        ${item.price.toFixed(2)}
                      </span>

                      <button
                        onClick={() => openCustomizeModal(item)}
                        style={{
                          background: '#0F172A',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span>+</span> Agregar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Cart Pill if Cart has items */}
            {cart.length > 0 && (
              <div
                onClick={() => setActiveTab('ordenes')}
                style={{
                  position: 'fixed',
                  bottom: '72px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 'calc(100% - 32px)',
                  maxWidth: '448px',
                  background: 'linear-gradient(135deg, #EA580C 0%, #D97706 100%)',
                  color: '#FFFFFF',
                  padding: '12px 18px',
                  borderRadius: '16px',
                  boxShadow: '0 8px 24px rgba(234, 88, 12, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  zIndex: 25
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.25)',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    fontWeight: '800',
                    fontSize: '0.85rem'
                  }}>
                    {cartTotalItems}
                  </div>
                  <span style={{ fontWeight: '700', fontSize: '0.92rem' }}>Ver Orden y Pagar</span>
                </div>
                <div style={{ fontWeight: '800', fontSize: '1.05rem' }}>
                  ${total.toFixed(2)} ➔
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB 2: OFERTAS ===================== */}
        {activeTab === 'ofertas' && (
          <div className="fade-in" style={{ padding: '16px' }}>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
                Promociones & Cupones
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#64748B' }}>
                Aplica cupones exclusivos para simular tu compra con el máximo descuento.
              </p>
            </div>

            {/* Featured Hero Coupon */}
            <div style={{
              background: 'linear-gradient(135deg, #1C1917 0%, #292524 100%)',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '20px',
              marginBottom: '18px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}>
              <span style={{
                background: '#EA580C',
                color: '#FFFFFF',
                fontSize: '0.68rem',
                fontWeight: '800',
                padding: '3px 8px',
                borderRadius: '6px',
                textTransform: 'uppercase'
              }}>
                Cupón Estrella
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', margin: '8px 0 6px', color: '#FDE047' }}>
                ¡Martes de Burger Real Doble 2x1!
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#E2E8F0', marginBottom: '14px', lineHeight: '1.4' }}>
                Paga 1 y recibe 2 unidades de la insuperable Burger Real Doble. Válido solo hoy en la App.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <span style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px dashed #FDE047',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontFamily: 'monospace',
                  fontWeight: '800',
                  color: '#FDE047',
                  fontSize: '0.95rem'
                }}>
                  RAPID2X1
                </span>
                <button
                  onClick={() => {
                    applyCoupon('RAPID2X1');
                    setActiveTab('ordenes');
                  }}
                  style={{
                    background: '#EA580C',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  Aplicar al Pedido
                </button>
              </div>
            </div>

            {/* Other Coupons List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {PROMO_COUPONS.map(cup => (
                <div
                  key={cup.code}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ fontWeight: '800', fontSize: '0.95rem', color: '#0F172A' }}>{cup.title}</h4>
                      <p style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>{cup.description}</p>
                    </div>
                    <span style={{ fontSize: '1.2rem' }}>🏷️</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px dashed #E2E8F0' }}>
                    <span style={{
                      fontFamily: 'monospace',
                      fontWeight: '800',
                      fontSize: '0.85rem',
                      background: '#F1F5F9',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      color: '#0F172A'
                    }}>
                      {cup.code}
                    </span>

                    <button
                      onClick={() => {
                        applyCoupon(cup.code);
                        setActiveTab('ordenes');
                      }}
                      style={{
                        background: '#0F172A',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      {appliedCoupon?.code === cup.code ? '✓ Aplicado' : 'Canjear'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 3: ÓRDENES (SIMULADOR DE COMPRA) ===================== */}
        {activeTab === 'ordenes' && (
          <div className="fade-in" style={{ padding: '16px' }}>
            
            {/* If there is an active simulated order in progress */}
            {activeOrder && (
              <div style={{
                background: '#FFFFFF',
                border: '2px solid #EA580C',
                borderRadius: '20px',
                padding: '18px',
                marginBottom: '20px',
                boxShadow: '0 8px 24px rgba(234, 88, 12, 0.12)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{
                    background: '#FFF7ED',
                    color: '#C2410C',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: '800'
                  }}>
                    PEDIDO SIMULADO ACTIVO
                  </span>
                  <span style={{ fontWeight: '800', fontSize: '0.9rem', color: '#0F172A' }}>
                    #{activeOrder.id}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
                  {simulatedStep === 1 && "1. Pedido Recibido en Cocina 📋"}
                  {simulatedStep === 2 && "2. Medallón Angus a la Parrilla 🔥"}
                  {simulatedStep === 3 && "3. Empacado con Control Térmico 📦"}
                  {simulatedStep === 4 && "4. Repartidor Flash en Camino 🛵"}
                  {simulatedStep === 5 && "5. ¡Entregado con Éxito! 🎉"}
                </h3>

                {/* Progress bar */}
                <div style={{ height: '8px', background: '#F1F5F9', borderRadius: '4px', overflow: 'hidden', margin: '12px 0' }}>
                  <div style={{
                    width: `${(simulatedStep / 5) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #EA580C, #10B981)',
                    transition: 'width 0.4s ease'
                  }} />
                </div>

                <p style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: '1.4' }}>
                  {simulatedStep === 1 && "Hemos recibido tu simulación y los parrilleros están preparando los ingredientes."}
                  {simulatedStep === 2 && "La carne Angus está siendo flameada a la leña para lograr la costra perfecta."}
                  {simulatedStep === 3 && "Tu hamburguesa y papas están listas en empaque ecológico aislante de calor."}
                  {simulatedStep === 4 && "Repartidor Mateo está a 4 minutos de tu puerta en su moto express."}
                  {simulatedStep === 5 && "¡Buen provecho! Simulación completada con éxito sin errores."}
                </p>

                <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                  {simulatedStep < 5 && (
                    <button
                      onClick={() => setSimulatedStep(prev => prev + 1)}
                      style={{
                        flex: 1,
                        background: '#EA580C',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      Avanzar Estado ⏩
                    </button>
                  )}
                  <button
                    onClick={() => setActiveOrder(null)}
                    style={{
                      flex: 1,
                      background: '#F1F5F9',
                      color: '#475569',
                      border: '1px solid #E2E8F0',
                      padding: '8px 12px',
                      borderRadius: '10px',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Cerrar Rastreo
                  </button>
                </div>
              </div>
            )}

            {/* Current Cart Simulation View */}
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
                Simulación de Compra
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#64748B' }}>
                Revisa los productos de tu orden, aplica cupones y simula la compra inmediata.
              </p>
            </div>

            {cart.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '36px 16px',
                background: '#F8FAFC',
                borderRadius: '20px',
                border: '1px dashed #CBD5E1',
                marginBottom: '24px'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🛒</div>
                <h4 style={{ fontWeight: '800', fontSize: '1rem', color: '#0F172A', marginBottom: '4px' }}>Tu bolsa está vacía</h4>
                <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '16px' }}>
                  Explora nuestras 10 variantes destacadas en el menú y pruébalas todas.
                </p>
                <button
                  onClick={() => setActiveTab('menu')}
                  style={{
                    background: '#EA580C',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 20px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Ir al Menú
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                {/* Items in Cart */}
                {cart.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    style={{
                      display: 'flex',
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '14px',
                      padding: '12px',
                      gap: '12px',
                      alignItems: 'center'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '64px', height: '64px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '800', fontSize: '0.9rem', color: '#0F172A' }}>{item.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        Cocción: <strong>{item.cookingPoint || 'Al punto'}</strong>
                        {item.extras && item.extras.length > 0 && ` • +${item.extras.join(', ')}`}
                      </div>
                      <div style={{ fontWeight: '800', color: '#EA580C', fontSize: '0.95rem', marginTop: '2px' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => updateQuantity(idx, -1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          background: '#F8FAFC',
                          fontWeight: '800',
                          cursor: 'pointer'
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontWeight: '800', fontSize: '0.88rem', minWidth: '18px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(idx, 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          background: '#F8FAFC',
                          fontWeight: '800',
                          cursor: 'pointer'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                {/* Coupon Code Input */}
                <div style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '14px',
                  padding: '12px'
                }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#475569', marginBottom: '8px' }}>
                    ¿TIENES UN CUPÓN DE DESCUENTO?
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Ej: RAPID2X1 o BURGER20"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.82rem',
                        textTransform: 'uppercase'
                      }}
                    />
                    <button
                      onClick={() => applyCoupon(couponInput)}
                      style={{
                        background: '#0F172A',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      Aplicar
                    </button>
                  </div>

                  {couponError && (
                    <div style={{ color: '#DC2626', fontSize: '0.74rem', marginTop: '6px' }}>{couponError}</div>
                  )}

                  {appliedCoupon && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '8px',
                      background: '#ECFDF5',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      border: '1px solid #A7F3D0'
                    }}>
                      <span style={{ fontSize: '0.76rem', color: '#065F46', fontWeight: '700' }}>
                        ✓ {appliedCoupon.title}
                      </span>
                      <button
                        onClick={() => setAppliedCoupon(null)}
                        style={{ border: 'none', background: 'transparent', color: '#065F46', cursor: 'pointer', fontWeight: '800' }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {/* Payment & Summary */}
                <div style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '16px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                    <span style={{ color: '#64748B' }}>Subtotal:</span>
                    <span style={{ fontWeight: '700', color: '#0F172A' }}>${subtotal.toFixed(2)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                      <span style={{ color: '#059669', fontWeight: '700' }}>Descuento Promocional:</span>
                      <span style={{ fontWeight: '800', color: '#059669' }}>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.85rem' }}>
                    <span style={{ color: '#64748B' }}>Envío Express:</span>
                    <span style={{ fontWeight: '700', color: shippingCost === 0 ? '#059669' : '#0F172A' }}>
                      {shippingCost === 0 ? '¡GRATIS!' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '2px solid #E2E8F0',
                    marginBottom: '16px'
                  }}>
                    <span style={{ fontWeight: '800', fontSize: '1.05rem', color: '#0F172A' }}>Total a Pagar:</span>
                    <span style={{ fontWeight: '800', fontSize: '1.25rem', color: '#EA580C' }}>
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  {/* Simulate Order Button */}
                  <button
                    onClick={handleSimulateOrder}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #EA580C 0%, #D97706 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '14px',
                      borderRadius: '12px',
                      fontWeight: '800',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      boxShadow: '0 8px 20px rgba(234, 88, 12, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <span>🚀</span> Simular Compra de Hamburguesas
                  </button>
                </div>
              </div>
            )}

            {/* Previous Orders History */}
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0F172A', marginBottom: '10px' }}>
                Historial de Órdenes Previas
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {ordersHistory.map(ord => (
                  <div
                    key={ord.id}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '800', fontSize: '0.85rem', color: '#0F172A' }}>#{ord.id}</span>
                        <span style={{ fontSize: '0.7rem', color: '#64748B' }}>{ord.date}</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#334155', marginTop: '2px' }}>{ord.itemsSummary}</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#EA580C', marginTop: '2px' }}>
                        ${ord.total.toFixed(2)} &bull; <span style={{ color: '#059669' }}>{ord.status}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setCart([
                          { ...MENU_ITEMS[0], quantity: 1, cookingPoint: 'Al punto' },
                          { ...MENU_ITEMS[10], quantity: 1 }
                        ]);
                        alert('¡Productos agregados de nuevo a tu bolsa para reordenar!');
                      }}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        fontSize: '0.74rem',
                        fontWeight: '700',
                        color: '#0F172A',
                        cursor: 'pointer'
                      }}
                    >
                      Repetir
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 4: PERFIL ===================== */}
        {activeTab === 'perfil' && (
          <div className="fade-in" style={{ padding: '16px' }}>
            
            {/* User Profile Card */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FED7AA 0%, #FDBA74 100%)',
                color: '#9A3412',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem',
                fontWeight: '800',
                margin: '0 auto 10px',
                boxShadow: '0 4px 10px rgba(234, 88, 12, 0.2)'
              }}>
                CG
              </div>

              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>Carlos Gómez</h2>
              <div style={{
                display: 'inline-block',
                background: '#FEF3C7',
                color: '#92400E',
                fontSize: '0.72rem',
                fontWeight: '800',
                padding: '3px 10px',
                borderRadius: '9999px',
                marginTop: '4px'
              }}>
                🌟 MIEMBRO VIP ORO
              </div>

              {/* RapidPoints */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '12px',
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '700' }}>TUS RAPIDPOINTS:</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#EA580C' }}>580 Puntos</div>
                </div>
                <button
                  onClick={() => alert('¡Tienes 580 puntos! Puedes canjearlos por 1 Burger Real Clásica gratis en tu próxima compra.')}
                  style={{
                    background: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.74rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Canjear
                </button>
              </div>
            </div>

            {/* Consumer Preferences & Settings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>📍</span>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.88rem', color: '#0F172A' }}>Direcciones Guardadas</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748B' }}>Casa: Av. Gourmet 742, Depto 4B</div>
                  </div>
                </div>
                <span style={{ color: '#94A3B8' }}>›</span>
              </div>

              <div style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>💳</span>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.88rem', color: '#0F172A' }}>Métodos de Pago</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748B' }}>Visa terminada en 4242 &bull; Apple Pay</div>
                  </div>
                </div>
                <span style={{ color: '#94A3B8' }}>›</span>
              </div>

              <div style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2rem' }}>🥩</span>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.88rem', color: '#0F172A' }}>Hamburguesa Favorita</div>
                    <div style={{ fontSize: '0.74rem', color: '#64748B' }}>Rey de las Burgers (6 pedidos)</div>
                  </div>
                </div>
                <span style={{ color: '#94A3B8' }}>›</span>
              </div>
            </div>

            {/* Navigation to other portals */}
            <div style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748B', marginBottom: '10px' }}>
                ACCESOS RÁPIDOS A OTRAS CAPAS
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href="/"
                  style={{
                    flex: 1,
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    color: '#0F172A',
                    textDecoration: 'none'
                  }}
                >
                  🌐 Landing E-commerce
                </a>
                <a
                  href="/admin"
                  style={{
                    flex: 1,
                    background: '#0F172A',
                    color: '#FFFFFF',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    textDecoration: 'none'
                  }}
                >
                  ⚙️ Panel Admin
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ===================== BOTTOM NAVIGATION TABS ===================== */}
      <nav style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        background: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        padding: '8px 0 10px',
        zIndex: 40,
        boxShadow: '0 -4px 15px rgba(0,0,0,0.04)'
      }}>
        {[
          { id: 'menu', label: 'Menú', icon: '🍔' },
          { id: 'ofertas', label: 'Ofertas', icon: '🏷️' },
          { id: 'ordenes', label: 'Órdenes', icon: '📦', badge: cartTotalItems > 0 ? cartTotalItems : null },
          { id: 'perfil', label: 'Perfil', icon: '👤' }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'transparent',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                cursor: 'pointer',
                position: 'relative',
                color: isActive ? '#EA580C' : '#64748B'
              }}
            >
              <div style={{ position: 'relative', fontSize: '1.25rem' }}>
                {tab.icon}
                {tab.badge && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-8px',
                    background: '#EA580C',
                    color: '#FFFFFF',
                    fontSize: '0.62rem',
                    fontWeight: '800',
                    padding: '1px 5px',
                    borderRadius: '9999px',
                    border: '2px solid #FFFFFF'
                  }}>
                    {tab.badge}
                  </span>
                )}
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: isActive ? '800' : '600' }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Customization Drawer / Modal */}
      {customizingItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center'
        }}>
          <div style={{
            background: '#FFFFFF',
            width: '100%',
            maxWidth: '480px',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            padding: '20px',
            maxHeight: '85vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#EA580C', textTransform: 'uppercase' }}>
                  Personalizar Hamburguesa
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A' }}>
                  {customizingItem.name}
                </h3>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', fontWeight: '800', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '16px', lineHeight: '1.4' }}>
              {customizingItem.description}
            </p>

            {/* Termino de la carne */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
                Término de la Carne Angus:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {['Término Medio', 'Al Punto', 'Bien Cocida'].map(term => (
                  <button
                    key={term}
                    onClick={() => setSelectedCooking(term)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: '10px',
                      fontSize: '0.76rem',
                      fontWeight: '700',
                      border: selectedCooking === term ? '2px solid #EA580C' : '1px solid #E2E8F0',
                      background: selectedCooking === term ? '#FFF7ED' : '#FFFFFF',
                      color: selectedCooking === term ? '#C2410C' : '#475569',
                      cursor: 'pointer'
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
                ¿Deseas agregar algún extra?
              </div>
              {[
                { name: 'Panceta Extra Ahumada', price: '+$1.50' },
                { name: 'Doble Queso Cheddar', price: '+$1.20' },
                { name: 'Salsa Trufada del Chef', price: '+$0.90' },
                { name: 'Cebolla Crispy Crujiente', price: '+$0.80' }
              ].map(extra => {
                const isSelected = selectedExtras.includes(extra.name);
                return (
                  <div
                    key={extra.name}
                    onClick={() => toggleExtra(extra.name)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: isSelected ? '1.5px solid #EA580C' : '1px solid #E2E8F0',
                      background: isSelected ? '#FFF7ED' : '#FFFFFF',
                      marginBottom: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontSize: '0.82rem', fontWeight: isSelected ? '700' : '600', color: '#0F172A' }}>
                      {isSelected ? '✓ ' : '+ '} {extra.name}
                    </span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#EA580C' }}>{extra.price}</span>
                  </div>
                );
              })}
            </div>

            {/* Confirm button */}
            <button
              onClick={confirmAddToCart}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #EA580C 0%, #D97706 100%)',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px',
                borderRadius: '12px',
                fontWeight: '800',
                fontSize: '0.95rem',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(234, 88, 12, 0.3)'
              }}
            >
              Agregar a la Orden &bull; ${customizingItem.price.toFixed(2)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
