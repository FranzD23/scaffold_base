import React, { useState, useEffect } from 'react';

// Default initial burgers for fallback
const INITIAL_BURGERS = [
  {
    id: 1,
    name: "Rey de las Burgers",
    category: "Especialidades",
    price: 15.99,
    stock: 45,
    specialty_level: "Leyenda de la Casa ⭐⭐⭐",
    badge: "Más Vendida",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
    description: "Carne Angus flameada a la leña, cheddar añejo 18 meses, panceta al maple y salsa trufada secreta.",
    prep_time: "12 min",
    calories: "890 kcal"
  },
  {
    id: 2,
    name: "Burger Real Clásica",
    category: "Clásicas",
    price: 10.99,
    stock: 65,
    specialty_level: "Clásica Insignia ⭐",
    badge: "Favorita Tradicional",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
    description: "180g de carne Angus premium, lechuga romana, tomate pera maduro, pepinillos dulces y queso cheddar fundido.",
    prep_time: "9 min",
    calories: "680 kcal"
  },
  {
    id: 3,
    name: "Burger Real Doble",
    category: "Dobles & Smash",
    price: 13.99,
    stock: 50,
    specialty_level: "Doble Smash Gourmet ⭐⭐",
    badge: "2x1 Martes",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
    description: "Doble medallón smash con costra caramelizada al hierro vivo, queso Monterey Jack doble fundido y bacon crocante.",
    prep_time: "10 min",
    calories: "920 kcal"
  },
  {
    id: 4,
    name: "Burger Doble Especial",
    category: "Especialidades",
    price: 14.50,
    stock: 35,
    specialty_level: "Edición Especial del Chef ⭐⭐⭐",
    badge: "Creación de Autor",
    image: "https://images.unsplash.com/photo-1583032015879-6617a2fb0408?w=600&auto=format&fit=crop&q=80",
    description: "Doble carne madurada, queso gorgonzola cremoso, cebolla caramelizada al vino tinto y rúcula silvestre.",
    prep_time: "13 min",
    calories: "850 kcal"
  },
  {
    id: 5,
    name: "Smash Trufa & Funghi",
    category: "Especialidades",
    price: 14.90,
    stock: 30,
    specialty_level: "Gourmet Reserva ⭐⭐⭐",
    badge: "Edición Limitada",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop&q=80",
    description: "Doble smash Angus con salteado de portobellos al tomillo y mantequilla noisette, queso gruyère y crema trufada.",
    prep_time: "11 min",
    calories: "810 kcal"
  },
  {
    id: 6,
    name: "Crispy Chicken Royal",
    category: "Pollo Crujiente",
    price: 11.99,
    stock: 45,
    specialty_level: "Especialidad Pollo ⭐⭐",
    badge: "Súper Crujiente",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80",
    description: "Pechuga marinada 24h en buttermilk y 11 especias, rebozado japonés ultra crocante y honey mustard.",
    prep_time: "10 min",
    calories: "740 kcal"
  },
  {
    id: 7,
    name: "Bacon Lovers Deluxe",
    category: "Dobles & Smash",
    price: 13.50,
    stock: 55,
    specialty_level: "Favorita del Público ⭐⭐",
    badge: "Bacon Extremo",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&auto=format&fit=crop&q=80",
    description: "200g de carne, cuádruple corte de tocino ahumado grueso, mermelada artesanal de bacon y queso cheddar.",
    prep_time: "10 min",
    calories: "960 kcal"
  },
  {
    id: 8,
    name: "Smoky BBQ Jack",
    category: "Clásicas",
    price: 12.90,
    stock: 40,
    specialty_level: "Sabor Texano a la Leña ⭐⭐",
    badge: "Ahumada a la Leña",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&auto=format&fit=crop&q=80",
    description: "Medallón a las brasas con barbacoa de ciruela negra, queso pepper jack fundido y aros de cebolla crocantes.",
    prep_time: "11 min",
    calories: "820 kcal"
  },
  {
    id: 9,
    name: "Avocado Green Smash",
    category: "Clásicas",
    price: 12.50,
    stock: 35,
    specialty_level: "Equilibrio Fresh ⭐",
    badge: "Opción Fresca",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&auto=format&fit=crop&q=80",
    description: "Doble smash Angus con queso havarti cremoso, láminas de aguacate hass fresco y alioli de lima.",
    prep_time: "9 min",
    calories: "710 kcal"
  },
  {
    id: 10,
    name: "Volcán de Quesos Cheddar",
    category: "Especialidades",
    price: 15.50,
    stock: 25,
    specialty_level: "Experiencia Quesera Extrema ⭐⭐⭐",
    badge: "Show Fundido",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&auto=format&fit=crop&q=80",
    description: "220g de carne rellena de mozzarella fundida, bañada en cascada de cuatro quesos calientes y crumble de tocino.",
    prep_time: "14 min",
    calories: "1050 kcal"
  }
];

// Initial Consumer Metrics according to consumption behavior
const CONSUMER_METRICS_DATA = {
  summary: {
    total_consumers: 3842,
    active_consumers_month: 2410,
    average_ticket: 18.75,
    total_monthly_revenue: 45187.50,
    retention_rate: "68.4%",
    top_selling_burger: "Rey de las Burgers",
    top_selling_count: 1420
  },
  consumption_segments: [
    {
      segment: "VIP Burger Lovers (>5 pedidos/mes)",
      count: 540,
      percentage: 22.4,
      avg_spend: 112.50,
      total_spend: 60750.00,
      favorite_item: "Rey de las Burgers",
      badge_color: "#D97706",
      growth: "+18%"
    },
    {
      segment: "Consumidores Frecuentes (2-4 pedidos/mes)",
      count: 1080,
      percentage: 44.8,
      avg_spend: 48.20,
      total_spend: 52056.00,
      favorite_item: "Burger Real Doble",
      badge_color: "#2563EB",
      growth: "+12%"
    },
    {
      segment: "Consumidores Ocasionales (1 pedido/mes)",
      count: 580,
      percentage: 24.1,
      avg_spend: 19.50,
      total_spend: 11310.00,
      favorite_item: "Burger Real Clásica",
      badge_color: "#059669",
      growth: "+5%"
    },
    {
      segment: "Nuevos Clientes (Primer Pedido)",
      count: 210,
      percentage: 8.7,
      avg_spend: 15.20,
      total_spend: 3192.00,
      favorite_item: "Burger Doble Especial",
      badge_color: "#7C3AED",
      growth: "+24%"
    }
  ],
  top_consumers: [
    { id: "C-101", name: "Valentina Morales", tier: "VIP Platino", orders_count: 16, total_spent: 312.40, favorite_burger: "Rey de las Burgers", last_order: "Hace 2 horas" },
    { id: "C-102", name: "Mateo Silva", tier: "VIP Oro", orders_count: 12, total_spent: 228.60, favorite_burger: "Burger Real Doble", last_order: "Ayer" },
    { id: "C-103", name: "Sofía Navarro", tier: "VIP Oro", orders_count: 11, total_spent: 204.10, favorite_burger: "Smash Trufa & Funghi", last_order: "Hace 2 días" },
    { id: "C-104", name: "Lucas Domínguez", tier: "Frecuente Plata", orders_count: 8, total_spent: 156.80, favorite_burger: "Burger Doble Especial", last_order: "Hace 3 días" },
    { id: "C-105", name: "Camila Restrepo", tier: "Frecuente Plata", orders_count: 7, total_spent: 138.20, favorite_burger: "Crispy Chicken Royal", last_order: "Hace 4 días" },
    { id: "C-106", name: "Sebastián Peña", tier: "Frecuente", orders_count: 6, total_spent: 119.50, favorite_burger: "Bacon Lovers Deluxe", last_order: "Hace 5 días" }
  ]
};

export default function App() {
  const [burgers, setBurgers] = useState(INITIAL_BURGERS);
  const [serverHealth, setServerHealth] = useState(null);
  const [metrics, setMetrics] = useState(CONSUMER_METRICS_DATA);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [activeView, setActiveView] = useState('hamburguesas'); // 'hamburguesas' | 'consumidores' | 'database'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBurger, setNewBurger] = useState({
    name: '',
    category: 'Especialidades',
    price: '',
    stock: 30,
    specialty_level: 'Especialidad de la Casa ⭐⭐',
    badge: 'Nuevo',
    description: '',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80'
  });

  // Fetch live API products & health from server
  const fetchData = async () => {
    try {
      setLoading(true);
      const [resHealth, resProducts, resMetrics] = await Promise.allSettled([
        fetch('/api/health').then(r => r.json()),
        fetch('/api/products').then(r => r.json()),
        fetch('/api/admin/metrics').then(r => r.json())
      ]);

      if (resHealth.status === 'fulfilled') {
        setServerHealth(resHealth.value);
      }
      if (resProducts.status === 'fulfilled' && resProducts.value.success && resProducts.value.data?.length > 0) {
        setBurgers(resProducts.value.data);
      }
      if (resMetrics.status === 'fulfilled' && resMetrics.value.success) {
        setMetrics(resMetrics.value);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Stock update helper
  const handleUpdateStock = (id, delta) => {
    setBurgers(prev => prev.map(b => {
      if (b.id === id) {
        const updatedStock = Math.max(0, (b.stock || 0) + delta);
        return { ...b, stock: updatedStock };
      }
      return b;
    }));
  };

  // Delete burger
  const handleDeleteBurger = async (id) => {
    if (confirm('¿Estás seguro de eliminar esta hamburguesa del catálogo?')) {
      setBurgers(prev => prev.filter(b => b.id !== id));
      try {
        await fetch(`/api/products/${id}`, { method: 'DELETE' });
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Add new burger
  const handleCreateBurger = async (e) => {
    e.preventDefault();
    if (!newBurger.name || !newBurger.price) {
      alert('Por favor indica nombre y precio de la hamburguesa');
      return;
    }
    const created = {
      ...newBurger,
      id: Date.now(),
      price: parseFloat(newBurger.price) || 0,
      stock: parseInt(newBurger.stock, 10) || 0
    };

    setBurgers([created, ...burgers]);
    setIsModalOpen(false);
    setNewBurger({
      name: '',
      category: 'Especialidades',
      price: '',
      stock: 30,
      specialty_level: 'Especialidad de la Casa ⭐⭐',
      badge: 'Nuevo',
      description: '',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80'
    });

    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(created)
      });
    } catch (e) {
      console.error(e);
    }
  };

  // Reset demo data
  const handleResetCatalog = async () => {
    if (confirm('¿Restablecer el menú inicial de Hamburger Rapid (10 hamburguesas oficiales)?')) {
      try {
        await fetch('/api/reset', { method: 'POST' });
        await fetchData();
        alert('¡Catálogo oficial de Hamburger Rapid restablecido con éxito!');
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Filtered burgers
  const filteredBurgers = burgers.filter(b => {
    const matchesCategory = categoryFilter === 'Todas' || b.category === categoryFilter;
    const matchesSearch = b.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          (b.description && b.description.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const totalStockUnits = burgers.reduce((acc, b) => acc + (b.stock || 0), 0);
  const avgBurgerPrice = burgers.length > 0
    ? (burgers.reduce((acc, b) => acc + (parseFloat(b.price) || 0), 0) / burgers.length).toFixed(2)
    : '0.00';

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', color: '#0F172A', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header */}
      <header style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 20,
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              background: '#FFF7ED',
              border: '1px solid #FED7AA',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem'
            }}>
              🍔
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', lineHeight: 1.1 }}>
                  Hamburger Rapid
                </h1>
                <span style={{
                  background: '#FEF3C7',
                  color: '#92400E',
                  fontSize: '0.68rem',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: '9999px'
                }}>
                  PANEL ADMIN
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#64748B' }}>
                Control de Catálogo, Métricas de Consumo & Estado de Base de Datos
              </p>
            </div>
          </div>

          {/* Quick External Navigation Links & DB Status Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: serverHealth?.database?.connected ? '#ECFDF5' : '#FFFBEB',
              border: serverHealth?.database?.connected ? '1px solid #A7F3D0' : '1px solid #FDE68A',
              padding: '6px 12px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: '700',
              color: serverHealth?.database?.connected ? '#065F46' : '#92400E'
            }}>
              <span>{serverHealth?.database?.connected ? '🐬' : '⚡'}</span>
              <span>{serverHealth?.database?.mode === 'mysql' ? 'MySQL Conectado' : 'Modo In-Memory'}</span>
            </div>

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                color: '#334155',
                padding: '6px 14px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              🌐 E-commerce
            </a>

            <a
              href="/app"
              target="_blank"
              rel="noreferrer"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                color: '#334155',
                padding: '6px 14px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              📱 PWA Móvil
            </a>

            <button
              onClick={fetchData}
              style={{
                background: '#EA580C',
                color: '#FFFFFF',
                border: 'none',
                padding: '7px 14px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              🔄 Actualizar
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px', width: '100%', flex: 1 }}>
        
        {/* Navigation Tabs Bar */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid #E2E8F0',
          paddingBottom: '14px',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'hamburguesas', label: '🍔 Catálogo de Hamburguesas', count: burgers.length },
            { id: 'consumidores', label: '👥 Métricas de Consumidores/Clientes', highlight: true },
            { id: 'database', label: '🗄️ Estado de la Base de Datos', status: serverHealth?.database?.connected ? 'MySQL' : 'Activo' }
          ].map(tab => {
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                style={{
                  background: isActive ? '#EA580C' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#475569',
                  border: isActive ? '1px solid #EA580C' : '1px solid #E2E8F0',
                  padding: '9px 18px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: isActive ? '0 4px 12px rgba(234, 88, 12, 0.25)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span style={{
                    background: isActive ? 'rgba(255,255,255,0.25)' : '#F1F5F9',
                    color: isActive ? '#FFFFFF' : '#0F172A',
                    fontSize: '0.74rem',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    fontWeight: '800'
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ===================== VIEW 1: LISTADO DE HAMBURGUESAS ===================== */}
        {activeView === 'hamburguesas' && (
          <div>
            {/* Top KPI row for Burgers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '18px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Variantes Disponibles</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>{burgers.length}</div>
                <div style={{ fontSize: '0.76rem', color: '#059669', fontWeight: '700', marginTop: '4px' }}>10 oficiales de Hamburger Rapid</div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '18px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Stock Total en Cocina</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>{totalStockUnits} uds</div>
                <div style={{ fontSize: '0.76rem', color: '#EA580C', fontWeight: '700', marginTop: '4px' }}>Medallones listos para parrilla</div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '18px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Precio Promedio</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>${avgBurgerPrice}</div>
                <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '600', marginTop: '4px' }}>Margen comercial: 64%</div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '18px', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase' }}>Hamburguesa Insignia</div>
                <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#EA580C', marginTop: '8px', lineHeight: 1.2 }}>Rey de las Burgers</div>
                <div style={{ fontSize: '0.76rem', color: '#059669', fontWeight: '700', marginTop: '4px' }}>1,420 órdenes completadas</div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '16px 20px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
                <input
                  type="text"
                  placeholder="Buscar por nombre o ingrediente..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  style={{
                    width: '100%',
                    maxWidth: '360px',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.85rem'
                  }}
                />

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    background: '#FFFFFF',
                    fontSize: '0.85rem',
                    color: '#0F172A'
                  }}
                >
                  <option value="Todas">Todas las categorías</option>
                  <option value="Especialidades">Especialidades</option>
                  <option value="Clásicas">Clásicas</option>
                  <option value="Dobles & Smash">Dobles & Smash</option>
                  <option value="Pollo Crujiente">Pollo Crujiente</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleResetCatalog}
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    color: '#475569',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Restablecer Menú Demo
                </button>

                <button
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    background: '#0F172A',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '10px',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>+</span> Nueva Hamburguesa
                </button>
              </div>
            </div>

            {/* Burgers Table */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: '800', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      <th style={{ padding: '14px 18px' }}>Hamburguesa</th>
                      <th style={{ padding: '14px 18px' }}>Categoría</th>
                      <th style={{ padding: '14px 18px' }}>Nivel de Especialidad</th>
                      <th style={{ padding: '14px 18px' }}>Precio</th>
                      <th style={{ padding: '14px 18px' }}>Stock Cocina</th>
                      <th style={{ padding: '14px 18px' }}>Estado</th>
                      <th style={{ padding: '14px 18px', textAlign: 'right' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBurgers.map(b => {
                      const stockVal = b.stock || 0;
                      const isLowStock = stockVal < 30;
                      const isOutOfStock = stockVal === 0;

                      return (
                        <tr key={b.id} style={{ borderBottom: '1px solid #F1F5F9', transition: 'background 0.15s' }}>
                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img
                                src={b.image}
                                alt={b.name}
                                style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
                              />
                              <div>
                                <div style={{ fontWeight: '800', color: '#0F172A', fontSize: '0.92rem' }}>
                                  {b.name}
                                </div>
                                <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
                                  {b.badge || 'Receta de autor'} &bull; {b.prep_time || '10 min'}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td style={{ padding: '14px 18px' }}>
                            <span style={{
                              background: '#F1F5F9',
                              color: '#334155',
                              padding: '3px 10px',
                              borderRadius: '6px',
                              fontSize: '0.76rem',
                              fontWeight: '700'
                            }}>
                              {b.category || 'General'}
                            </span>
                          </td>

                          <td style={{ padding: '14px 18px' }}>
                            <span style={{
                              background: '#FFFBEB',
                              color: '#92400E',
                              border: '1px solid #FDE68A',
                              padding: '3px 8px',
                              borderRadius: '9999px',
                              fontSize: '0.74rem',
                              fontWeight: '700'
                            }}>
                              {b.specialty_level || 'Especialidad ⭐⭐'}
                            </span>
                          </td>

                          <td style={{ padding: '14px 18px', fontWeight: '800', color: '#0F172A', fontSize: '0.95rem' }}>
                            ${parseFloat(b.price).toFixed(2)}
                          </td>

                          <td style={{ padding: '14px 18px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <button
                                onClick={() => handleUpdateStock(b.id, -5)}
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '6px',
                                  border: '1px solid #CBD5E1',
                                  background: '#F8FAFC',
                                  fontWeight: '800',
                                  cursor: 'pointer'
                                }}
                              >
                                -
                              </button>
                              <span style={{ fontWeight: '800', minWidth: '32px', textAlign: 'center' }}>
                                {stockVal}
                              </span>
                              <button
                                onClick={() => handleUpdateStock(b.id, 5)}
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '6px',
                                  border: '1px solid #CBD5E1',
                                  background: '#F8FAFC',
                                  fontWeight: '800',
                                  cursor: 'pointer'
                                }}
                              >
                                +
                              </button>
                            </div>
                          </td>

                          <td style={{ padding: '14px 18px' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              padding: '3px 10px',
                              borderRadius: '9999px',
                              background: isOutOfStock ? '#FEF2F2' : isLowStock ? '#FFFBEB' : '#ECFDF5',
                              color: isOutOfStock ? '#DC2626' : isLowStock ? '#D97706' : '#059669'
                            }}>
                              <span style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: isOutOfStock ? '#DC2626' : isLowStock ? '#D97706' : '#059669'
                              }} />
                              {isOutOfStock ? 'Agotado' : isLowStock ? 'Bajo Stock' : 'Disponible'}
                            </span>
                          </td>

                          <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                            <button
                              onClick={() => handleDeleteBurger(b.id)}
                              style={{
                                background: '#FEE2E2',
                                color: '#DC2626',
                                border: '1px solid #FECACA',
                                padding: '5px 10px',
                                borderRadius: '8px',
                                fontSize: '0.74rem',
                                fontWeight: '700',
                                cursor: 'pointer'
                              }}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================== VIEW 2: MÉTRICAS DE CONSUMIDORES/CLIENTES SEGÚN CONSUMO ===================== */}
        {activeView === 'consumidores' && (
          <div className="fade-in">
            {/* KPI Cards Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '18px' }}>
                <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Total Consumidores</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>
                  {metrics.summary.total_consumers.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.76rem', color: '#059669', fontWeight: '700', marginTop: '4px' }}>
                  ↑ +14.2% este mes
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '18px' }}>
                <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Consumidores Activos</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>
                  {metrics.summary.active_consumers_month.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.76rem', color: '#2563EB', fontWeight: '700', marginTop: '4px' }}>
                  62.7% del padrón total
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '18px' }}>
                <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Ticket Promedio</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#EA580C', marginTop: '4px' }}>
                  ${metrics.summary.average_ticket.toFixed(2)}
                </div>
                <div style={{ fontSize: '0.76rem', color: '#059669', fontWeight: '700', marginTop: '4px' }}>
                  ↑ +$2.40 con combos dobles
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '18px' }}>
                <div style={{ fontSize: '0.76rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Facturación Mensual</div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>
                  ${metrics.summary.total_monthly_revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: '0.76rem', color: '#059669', fontWeight: '700', marginTop: '4px' }}>
                  Retención: {metrics.summary.retention_rate}
                </div>
              </div>
            </div>

            {/* Segmentación según Consumo */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
            }}>
              <div style={{ marginBottom: '18px' }}>
                <span style={{
                  background: '#FFF7ED',
                  color: '#EA580C',
                  fontSize: '0.74rem',
                  fontWeight: '800',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  textTransform: 'uppercase'
                }}>
                  Comportamiento de Clientes
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0F172A', marginTop: '6px' }}>
                  Segmentación de Consumidores según Frecuencia y Volumen de Consumo
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                  Distribución de clientes clasificados según su frecuencia de pedidos mensuales y ticket promedio.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {metrics.consumption_segments.map(seg => (
                  <div
                    key={seg.segment}
                    style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '16px',
                      padding: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: seg.badge_color
                        }} />
                        <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#059669' }}>{seg.growth}</span>
                      </div>

                      <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0F172A', lineHeight: 1.3 }}>
                        {seg.segment}
                      </h4>

                      <div style={{ margin: '14px 0 10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                          <span style={{ color: '#64748B' }}>Total en Segmento:</span>
                          <span style={{ fontWeight: '800', color: '#0F172A' }}>{seg.count} clientes ({seg.percentage}%)</span>
                        </div>
                        {/* Segment bar */}
                        <div style={{ height: '6px', background: '#E2E8F0', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${seg.percentage}%`, height: '100%', background: seg.badge_color }} />
                        </div>
                      </div>
                    </div>

                    <div style={{ borderTop: '1px dashed #E2E8F0', paddingTop: '10px', marginTop: '10px', fontSize: '0.78rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ color: '#64748B' }}>Gasto Promedio:</span>
                        <span style={{ fontWeight: '800', color: '#EA580C' }}>${seg.avg_spend.toFixed(2)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748B' }}>Burger Favorita:</span>
                        <span style={{ fontWeight: '700', color: '#0F172A' }}>{seg.favorite_item}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ranking de Mejores Consumidores */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
                Top Clientes y Consumidores Frecuentes
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '16px' }}>
                Clientes con mayor fidelidad y volumen de compras en Hamburger Rapid.
              </p>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: '0.74rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 14px' }}>Cliente</th>
                      <th style={{ padding: '12px 14px' }}>Nivel Fidelidad</th>
                      <th style={{ padding: '12px 14px' }}>N° Pedidos</th>
                      <th style={{ padding: '12px 14px' }}>Total Gastado</th>
                      <th style={{ padding: '12px 14px' }}>Hamburguesa Favorita</th>
                      <th style={{ padding: '12px 14px' }}>Último Consumo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.top_consumers.map(c => (
                      <tr key={c.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '12px 14px', fontWeight: '700', color: '#0F172A' }}>
                          {c.name}
                          <div style={{ fontSize: '0.7rem', color: '#94A3B8' }}>{c.id}</div>
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{
                            background: c.tier.includes('Platino') ? '#FEF3C7' : '#EFF6FF',
                            color: c.tier.includes('Platino') ? '#92400E' : '#1E40AF',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontWeight: '800',
                            fontSize: '0.74rem'
                          }}>
                            {c.tier}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px', fontWeight: '800' }}>{c.orders_count} pedidos</td>
                        <td style={{ padding: '12px 14px', fontWeight: '800', color: '#EA580C' }}>${c.total_spent.toFixed(2)}</td>
                        <td style={{ padding: '12px 14px', color: '#334155', fontWeight: '600' }}>{c.favorite_burger}</td>
                        <td style={{ padding: '12px 14px', color: '#64748B', fontSize: '0.78rem' }}>{c.last_order}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================== VIEW 3: ESTADO DE LA BASE DE DATOS ===================== */}
        {activeView === 'database' && (
          <div className="fade-in">
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '28px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <span style={{
                    background: serverHealth?.database?.connected ? '#ECFDF5' : '#FFFBEB',
                    color: serverHealth?.database?.connected ? '#065F46' : '#92400E',
                    fontSize: '0.76rem',
                    fontWeight: '800',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    textTransform: 'uppercase'
                  }}>
                    DIAGNÓSTICO DEL SISTEMA EN VIVO
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A', marginTop: '8px' }}>
                    Estado de Conexión a Base de Datos
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748B' }}>
                    Monitoreo en tiempo real del motor relacional de persistencia de Hamburger Rapid.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={fetchData}
                    style={{
                      background: '#0F172A',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    Test de Conexión
                  </button>
                  <button
                    onClick={handleResetCatalog}
                    style={{
                      background: '#EA580C',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    Restablecer Tabla Products
                  </button>
                </div>
              </div>

              {/* Status Box */}
              <div style={{
                background: serverHealth?.database?.connected ? '#F0FDF4' : '#FFFBEB',
                border: serverHealth?.database?.connected ? '1px solid #BBF7D0' : '1px solid #FDE68A',
                borderRadius: '16px',
                padding: '20px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{ fontSize: '2.4rem' }}>
                  {serverHealth?.database?.connected ? '🐬' : '⚡'}
                </div>
                <div>
                  <div style={{
                    fontSize: '1.25rem',
                    fontWeight: '800',
                    color: serverHealth?.database?.connected ? '#166534' : '#92400E'
                  }}>
                    {serverHealth?.database?.mode === 'mysql'
                      ? 'Conexión Activa a Servidor MySQL'
                      : 'Modo In-Memory Activo (Fallback Seguro de Alta Disponibilidad)'}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '2px' }}>
                    {serverHealth?.database?.connected
                      ? `Conectado y sincronizado en host: ${serverHealth?.database?.host} &bull; Base de Datos: ${serverHealth?.database?.database}`
                      : 'El backend provee persistencia en memoria automática para garantizar disponibilidad continua.'}
                  </div>
                </div>
              </div>

              {/* Detailed DB Specs Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '16px', borderRadius: '14px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Host Configurado</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>
                    {serverHealth?.database?.host || 'Auto-Discovery / In-Memory'}
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '16px', borderRadius: '14px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Base de Datos</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>
                    {serverHealth?.database?.database || 'hamburger_rapid_db'}
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '16px', borderRadius: '14px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Productos Registrados</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#EA580C', marginTop: '4px' }}>
                    {burgers.length} hamburguesas
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '16px', borderRadius: '14px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Estado de la API</div>
                  <div style={{ fontSize: '1rem', fontWeight: '800', color: '#059669', marginTop: '4px' }}>
                    Saludable (Uptime: {serverHealth?.uptime ? `${Math.round(serverHealth.uptime)}s` : 'OK'})
                  </div>
                </div>
              </div>

              {/* Endpoints & Dokploy reference */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '16px'
              }}>
                <div style={{ fontWeight: '800', fontSize: '0.88rem', color: '#0F172A', marginBottom: '8px' }}>
                  Endpoints JSON Disponibles para Integraciones:
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <a
                    href="/api/health"
                    target="_blank"
                    rel="noreferrer"
                    style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', color: '#2563EB', textDecoration: 'none', fontWeight: '700' }}
                  >
                    /api/health ↗
                  </a>
                  <a
                    href="/api/products"
                    target="_blank"
                    rel="noreferrer"
                    style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', color: '#2563EB', textDecoration: 'none', fontWeight: '700' }}
                  >
                    /api/products ↗
                  </a>
                  <a
                    href="/api/admin/metrics"
                    target="_blank"
                    rel="noreferrer"
                    style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', color: '#2563EB', textDecoration: 'none', fontWeight: '700' }}
                  >
                    /api/admin/metrics ↗
                  </a>
                  <a
                    href="/api/orders"
                    target="_blank"
                    rel="noreferrer"
                    style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', color: '#2563EB', textDecoration: 'none', fontWeight: '700' }}
                  >
                    /api/orders ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal: Crear Nueva Hamburguesa */}
      {isModalOpen && (
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
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '520px',
            width: '100%',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A' }}>
                Agregar Nueva Hamburguesa
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: '#F1F5F9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontWeight: '800' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBurger} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Nombre de la Hamburguesa:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Burger Especial Trufada"
                  value={newBurger.name}
                  onChange={(e) => setNewBurger({ ...newBurger, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Categoría:
                  </label>
                  <select
                    value={newBurger.category}
                    onChange={(e) => setNewBurger({ ...newBurger, category: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  >
                    <option value="Especialidades">Especialidades</option>
                    <option value="Clásicas">Clásicas</option>
                    <option value="Dobles & Smash">Dobles & Smash</option>
                    <option value="Pollo Crujiente">Pollo Crujiente</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Precio ($):
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="14.50"
                    value={newBurger.price}
                    onChange={(e) => setNewBurger({ ...newBurger, price: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Nivel de Especialidad:
                  </label>
                  <input
                    type="text"
                    placeholder="Gourmet Especial ⭐⭐⭐"
                    value={newBurger.specialty_level}
                    onChange={(e) => setNewBurger({ ...newBurger, specialty_level: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                    Stock Inicial:
                  </label>
                  <input
                    type="number"
                    value={newBurger.stock}
                    onChange={(e) => setNewBurger({ ...newBurger, stock: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                  Descripción de Ingredientes:
                </label>
                <textarea
                  rows="2"
                  placeholder="Carne Angus 200g, queso cheddar fundido, cebolla crispy y salsa de la casa."
                  value={newBurger.description}
                  onChange={(e) => setNewBurger({ ...newBurger, description: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '8px 16px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{ background: '#EA580C', color: '#FFFFFF', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Guardar Hamburguesa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
