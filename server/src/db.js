const mysql = require('mysql2/promise');

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Rey de las Burgers",
    category: "Especialidades",
    price: 15.99,
    stock: 45,
    specialty_level: "Leyenda de la Casa ⭐⭐⭐",
    badge: "Más Vendida",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80",
    description: "Carne 100% Angus flameada a la leña de roble, queso cheddar añejo 18 meses, panceta glaseada en miel de maple, cebolla crispy y salsa trufada secreta de autor.",
    ingredients: "Carne Angus 220g, Queso Cheddar Vintage, Panceta Ahumada Maple, Cebolla Crujiente, Salsa Trufada, Pan Brioche de Mantequilla",
    calories: "890 kcal",
    prep_time: "12-15 min"
  },
  {
    id: 2,
    name: "Burger Real Clásica",
    category: "Clásicas",
    price: 10.99,
    stock: 65,
    specialty_level: "Clásica Insignia ⭐",
    badge: "Favorita Tradicional",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=700&auto=format&fit=crop&q=80",
    description: "180g de carne Angus premium a la plancha, lechuga romana fresca, rodajas de tomate pera, pepinillos dulces encurtidos en casa y queso cheddar fundido.",
    ingredients: "Carne Angus 180g, Lechuga Romana, Tomate Fresco, Pepinillos Agridulces, Queso Cheddar, Salsa Real Secreta, Pan Brioche Clásico",
    calories: "680 kcal",
    prep_time: "8-10 min"
  },
  {
    id: 3,
    name: "Burger Real Doble",
    category: "Dobles & Smash",
    price: 13.99,
    stock: 50,
    specialty_level: "Doble Smash Gourmet ⭐⭐",
    badge: "2x1 Martes",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=700&auto=format&fit=crop&q=80",
    description: "Doble medallón smash con costra caramelizada al hierro vivo, queso Monterey Jack doble fundido, ración generosa de bacon crocante y aderezo imperial.",
    ingredients: "Doble Medallón Angus (2x110g), Doble Queso Jack & Cheddar, Bacon Ahumado Doble, Cebolla Morada Asada, Aderezo Imperial",
    calories: "920 kcal",
    prep_time: "10-12 min"
  },
  {
    id: 4,
    name: "Burger Doble Especial",
    category: "Edición del Chef",
    price: 14.50,
    stock: 35,
    specialty_level: "Edición Especial del Chef ⭐⭐⭐",
    badge: "Creación de Autor",
    image: "https://images.unsplash.com/photo-1583032015879-6617a2fb0408?w=700&auto=format&fit=crop&q=80",
    description: "Doble carne madurada dry-aged, queso gorgonzola fundido, cebolla caramelizada a fuego lento al vino tinto, rúcula silvestre y mayonesa de ajo negro.",
    ingredients: "Doble Carne Dry-Aged (2x110g), Gorgonzola Italiano D.O.P., Confitura de Cebolla al Tinto, Rúcula Selvática, Mayonesa Ajo Negro",
    calories: "850 kcal",
    prep_time: "12-14 min"
  },
  {
    id: 5,
    name: "Smash Trufa & Funghi",
    category: "Especialidades",
    price: 14.90,
    stock: 30,
    specialty_level: "Gourmet Reserva ⭐⭐⭐",
    badge: "Edición Limitada",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=700&auto=format&fit=crop&q=80",
    description: "Doble smash Angus con salteado de portobellos al tomillo y mantequilla noisette, queso gruyère suizo derretido y crema de trufa negra.",
    ingredients: "Doble Smash Angus 200g, Hongos Portobello Silvestres, Queso Gruyère de Montaña, Crema de Trufa Negra, Pan de Papa Tostado",
    calories: "810 kcal",
    prep_time: "11-13 min"
  },
  {
    id: 6,
    name: "Crispy Chicken Royal",
    category: "Pollo Crujiente",
    price: 11.99,
    stock: 45,
    specialty_level: "Especialidad Pollo Crujiente ⭐⭐",
    badge: "Súper Crujiente",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=700&auto=format&fit=crop&q=80",
    description: "Pechuga de pollo de granja marinada 24h en buttermilk y 11 especias, rebozado japonés ultra crocante, ensalada coleslaw de manzana y miel-mostaza.",
    ingredients: "Pechuga Crispy en Suero de Leche, Coleslaw Morada y Manzana Verde, Pepinillos Encurtidos, Honey-Mustard Casera",
    calories: "740 kcal",
    prep_time: "9-11 min"
  },
  {
    id: 7,
    name: "Bacon Lovers Deluxe",
    category: "Dobles & Smash",
    price: 13.50,
    stock: 55,
    specialty_level: "Favorita del Público ⭐⭐",
    badge: "Bacon Extremo",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=700&auto=format&fit=crop&q=80",
    description: "200g de carne Angus, cuádruple corte de panceta gruesa ahumada en madera de manzano, mermelada artesanal de tocino al bourbon y queso cheddar fundente.",
    ingredients: "Carne Angus 200g, 4 Tiras de Bacon Ahumado, Mermelada Bacon-Bourbon, Doble Queso Cheddar Fundido, Salsa BBQ Chipotle",
    calories: "960 kcal",
    prep_time: "10-12 min"
  },
  {
    id: 8,
    name: "Smoky BBQ Jack",
    category: "A la Parrilla",
    price: 12.90,
    stock: 40,
    specialty_level: "Sabor Texano a la Leña ⭐⭐",
    badge: "Ahumada a la Leña",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=700&auto=format&fit=crop&q=80",
    description: "Medallón a las brasas bañado en barbacoa de ciruela negra, queso pepper jack fundido, aros crujientes de cebolla rebozada y jalapeños dulces.",
    ingredients: "Carne Asada a la Brasa 190g, Queso Pepper Jack, Aros de Cebolla Rebozados, Salsa BBQ Ciruela Negra, Rodajas Jalapeño Dulce",
    calories: "820 kcal",
    prep_time: "11-13 min"
  },
  {
    id: 9,
    name: "Avocado Green Smash",
    category: "Clásicas",
    price: 12.50,
    stock: 35,
    specialty_level: "Equilibrio Fresh ⭐",
    badge: "Opción Fresca",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=700&auto=format&fit=crop&q=80",
    description: "Doble smash Angus con queso havarti cremoso, láminas de aguacate hass fresco de temporada, brotes verdes, tomate cherry asado y alioli cítrico de lima.",
    ingredients: "Doble Smash Angus 180g, Aguacate Hass Madurado, Queso Havarti Suizo, Brotes Tiernos, Tomate Confitado, Alioli de Lima",
    calories: "710 kcal",
    prep_time: "8-10 min"
  },
  {
    id: 10,
    name: "Volcán de Quesos Cheddar",
    category: "Especialidades",
    price: 15.50,
    stock: 25,
    specialty_level: "Experiencia Quesera Extrema ⭐⭐⭐",
    badge: "Espectáculo Fundido",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=700&auto=format&fit=crop&q=80",
    description: "220g de carne rellena de mozzarella fundida, bañada en cascada de salsa de cuatro quesos calientes servida al momento, crumble de bacon tostado y cebollín.",
    ingredients: "Carne Angus 220g Rellena de Mozzarella, Baño Volcán de Cuatro Quesos, Crumble de Tocino Crocante, Cebollines Frescos",
    calories: "1050 kcal",
    prep_time: "13-16 min"
  }
];

// Simulated Consumer Metrics according to consumption behavior
const CONSUMER_METRICS = {
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
      badge_color: "#D97706"
    },
    {
      segment: "Consumidores Frecuentes (2-4 pedidos/mes)",
      count: 1080,
      percentage: 44.8,
      avg_spend: 48.20,
      total_spend: 52056.00,
      favorite_item: "Burger Real Doble",
      badge_color: "#2563EB"
    },
    {
      segment: "Consumidores Ocasionales (1 pedido/mes)",
      count: 580,
      percentage: 24.1,
      avg_spend: 19.50,
      total_spend: 11310.00,
      favorite_item: "Burger Real Clásica",
      badge_color: "#10B981"
    },
    {
      segment: "Nuevos Clientes (Primer Pedido)",
      count: 210,
      percentage: 8.7,
      avg_spend: 15.20,
      total_spend: 3192.00,
      favorite_item: "Burger Doble Especial",
      badge_color: "#8B5CF6"
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

let inMemoryProducts = [...INITIAL_PRODUCTS];
let inMemoryOrders = [
  {
    id: "HR-9021",
    customer_name: "Valentina Morales",
    items: [{ name: "Rey de las Burgers", quantity: 2, price: 15.99 }, { name: "Papas Rústicas Trufadas", quantity: 1, price: 4.50 }],
    total: 36.48,
    status: "En Parrilla",
    time: "Hace 10 min",
    payment_method: "Tarjeta de Crédito"
  },
  {
    id: "HR-9020",
    customer_name: "Carlos Rivera",
    items: [{ name: "Burger Real Doble", quantity: 1, price: 13.99 }, { name: "Bebida Refrescante 500ml", quantity: 1, price: 2.50 }],
    total: 16.49,
    status: "En Camino",
    time: "Hace 22 min",
    payment_method: "Apple Pay"
  },
  {
    id: "HR-9019",
    customer_name: "Daniela Castro",
    items: [{ name: "Burger Real Clásica", quantity: 1, price: 10.99 }, { name: "Burger Doble Especial", quantity: 1, price: 14.50 }],
    total: 25.49,
    status: "Entregado",
    time: "Hace 45 min",
    payment_method: "Efectivo"
  }
];

let pool = null;
let isConnectedToMySQL = false;
let lastDbError = null;

async function initDB() {
  const databaseUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;
  const host = process.env.DB_HOST || process.env.MYSQL_HOST;
  const user = process.env.DB_USER || process.env.MYSQL_USER || 'root';
  const password = process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD || '';
  const database = process.env.DB_NAME || process.env.MYSQL_DATABASE || 'demo';
  const port = parseInt(process.env.DB_PORT || '3306', 10);

  if (!databaseUrl && !host) {
    lastDbError = 'Variables DB_HOST ni DATABASE_URL configuradas en el entorno.';
    console.log(`ℹ️ [DB] ${lastDbError} Operando en modo In-Memory para demostración.`);
    return;
  }

  try {
    if (databaseUrl) {
      console.log(`🔄 [DB] Intentando conectar a MySQL vía DATABASE_URL...`);
      pool = mysql.createPool(databaseUrl);
    } else {
      console.log(`🔄 [DB] Intentando conectar a MySQL en ${host}:${port} con usuario "${user}" a la BD "${database}"...`);
      pool = mysql.createPool({
        host,
        user,
        password,
        database,
        port,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 8000
      });
    }

    const connection = await pool.getConnection();
    console.log(`✅ [DB] Conectado exitosamente a MySQL (${host || 'URL'} - BD: ${database})`);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        specialty_level VARCHAR(150),
        badge VARCHAR(100),
        image VARCHAR(500),
        description TEXT,
        ingredients TEXT,
        calories VARCHAR(50),
        prep_time VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Comprobar y actualizar datos
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM products');
    if (rows[0].count === 0) {
      console.log('🌱 [DB] Inicializando catálogo de Hamburger Rapid (10 hamburguesas)...');
      for (const p of INITIAL_PRODUCTS) {
        await connection.query(
          'INSERT INTO products (name, category, price, stock, specialty_level, badge, image, description, ingredients, calories, prep_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [p.name, p.category, p.price, p.stock, p.specialty_level, p.badge, p.image, p.description, p.ingredients, p.calories, p.prep_time]
        );
      }
    }

    connection.release();
    isConnectedToMySQL = true;
    lastDbError = null;
  } catch (error) {
    lastDbError = error.message;
    console.warn(`⚠️ [DB] No se pudo conectar a MySQL: ${error.message}. Operando en modo In-Memory.`);
    isConnectedToMySQL = false;
  }
}

async function getProducts() {
  if (!isConnectedToMySQL && (process.env.DB_HOST || process.env.DATABASE_URL)) {
    await initDB();
  }

  if (isConnectedToMySQL && pool) {
    try {
      const [rows] = await pool.query('SELECT * FROM products ORDER BY id ASC');
      return rows;
    } catch (err) {
      console.error('Error consultando MySQL, recurriendo a memoria temporal:', err.message);
      lastDbError = err.message;
    }
  }
  return inMemoryProducts;
}

async function addProduct({ name, category, price, stock, specialty_level, badge, image, description, ingredients, calories, prep_time }) {
  if (!isConnectedToMySQL && (process.env.DB_HOST || process.env.DATABASE_URL)) {
    await initDB();
  }

  if (isConnectedToMySQL && pool) {
    const [result] = await pool.query(
      'INSERT INTO products (name, category, price, stock, specialty_level, badge, image, description, ingredients, calories, prep_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        name,
        category || 'Especialidades',
        parseFloat(price) || 0,
        parseInt(stock, 10) || 0,
        specialty_level || 'Especialidad de la Casa ⭐⭐',
        badge || 'Nuevo',
        image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80',
        description || '',
        ingredients || '',
        calories || '750 kcal',
        prep_time || '10-12 min'
      ]
    );
    return {
      id: result.insertId,
      name,
      category: category || 'Especialidades',
      price: parseFloat(price) || 0,
      stock: parseInt(stock, 10) || 0,
      specialty_level: specialty_level || 'Especialidad de la Casa ⭐⭐',
      badge: badge || 'Nuevo',
      image,
      description,
      ingredients,
      calories,
      prep_time
    };
  }

  const newProduct = {
    id: Date.now(),
    name,
    category: category || 'Especialidades',
    price: parseFloat(price) || 0,
    stock: parseInt(stock, 10) || 0,
    specialty_level: specialty_level || 'Especialidad de la Casa ⭐⭐',
    badge: badge || 'Nuevo',
    image: image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80',
    description: description || 'Hamburguesa artesanal preparada con carne fresca seleccionada.',
    ingredients: ingredients || 'Carne 100% Angus, Queso Cheddar, Pan Brioche, Salsas Artesanales',
    calories: calories || '750 kcal',
    prep_time: prep_time || '10-12 min'
  };
  inMemoryProducts.push(newProduct);
  return newProduct;
}

async function updateProduct(id, fields) {
  const numId = parseInt(id, 10);
  const index = inMemoryProducts.findIndex(p => p.id === numId);
  if (index !== -1) {
    inMemoryProducts[index] = { ...inMemoryProducts[index], ...fields };
    return inMemoryProducts[index];
  }
  return null;
}

async function deleteProduct(id) {
  const numId = parseInt(id, 10);
  if (isConnectedToMySQL && pool) {
    await pool.query('DELETE FROM products WHERE id = ?', [numId]);
    return true;
  }
  inMemoryProducts = inMemoryProducts.filter(p => p.id !== numId);
  return true;
}

async function resetProducts() {
  if (isConnectedToMySQL && pool) {
    await pool.query('TRUNCATE TABLE products');
    for (const p of INITIAL_PRODUCTS) {
      await pool.query(
        'INSERT INTO products (name, category, price, stock, specialty_level, badge, image, description, ingredients, calories, prep_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [p.name, p.category, p.price, p.stock, p.specialty_level, p.badge, p.image, p.description, p.ingredients, p.calories, p.prep_time]
      );
    }
    return;
  }
  inMemoryProducts = [...INITIAL_PRODUCTS];
}

function getConsumerMetrics() {
  return CONSUMER_METRICS;
}

function getOrders() {
  return inMemoryOrders;
}

function addOrder(orderData) {
  const newOrder = {
    id: `HR-${Math.floor(1000 + Math.random() * 9000)}`,
    customer_name: orderData.customer_name || 'Cliente Móvil',
    items: orderData.items || [],
    total: orderData.total || 0,
    status: 'En Parrilla',
    time: 'Justo ahora',
    payment_method: orderData.payment_method || 'Tarjeta de Crédito'
  };
  inMemoryOrders.unshift(newOrder);
  return newOrder;
}

function getDbStatus() {
  return {
    mode: isConnectedToMySQL ? 'mysql' : 'in-memory',
    connected: isConnectedToMySQL,
    host: process.env.DB_HOST || (process.env.DATABASE_URL ? 'via-database-url' : 'local-in-memory'),
    database: process.env.DB_NAME || 'hamburger_rapid_db',
    user: process.env.DB_USER || 'admin_user',
    tables: ['products', 'orders', 'consumers'],
    product_count: inMemoryProducts.length,
    active_orders: inMemoryOrders.length,
    error: lastDbError
  };
}

module.exports = {
  initDB,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  resetProducts,
  getConsumerMetrics,
  getOrders,
  addOrder,
  getDbStatus
};
