# 🍔 Hamburger Rapid - Plataforma Comercial Fast-Food

Primera versión comercial de **Hamburger Rapid**: Fast-Food Gourmet con entrega ultra rápida, arquitectura full-stack moderna y diseño en **paleta clara premium**.

---

## 🏗️ Arquitectura de la Plataforma

La solución está construida sobre una arquitectura monorepo de 3 capas integradas con un backend unificado:

| Capa | Directorio | Tecnología | Ruta / URL | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| **E-commerce Landing** | `apps/ecommerce` | Astro + CSS Moderno | `/` | Catálogo de 10 variantes destacadas, fichas técnicas con modal de ingredientes, niveles de especialidad y reseñas. |
| **App PWA Móvil** | `apps/pwa` | React + Vite + PWA | `/app` | App móvil con barra de navegación inferior (Menú, Ofertas, Órdenes, Perfil), simulación de compra, tracking en vivo y cupones. |
| **Panel Admin** | `apps/admin` | React + Vite | `/admin` | Dashboard administrativo con catálogo en tiempo real, métricas de consumo de clientes y estado de la base de datos. |
| **API & Servidor** | `server` | Node.js + Express + MySQL | `/api/*` | API REST para productos, métricas de consumo, órdenes y health check con soporte MySQL / In-Memory fallback. |

---

## 🍔 Catálogo de Hamburguesas Destacadas

1. **Rey de las Burgers** (\$15.99) &bull; *Leyenda de la Casa ⭐⭐⭐*
2. **Burger Real Clásica** (\$10.99) &bull; *Clásica Insignia ⭐*
3. **Burger Real Doble** (\$13.99) &bull; *Doble Smash Gourmet ⭐⭐*
4. **Burger Doble Especial** (\$14.50) &bull; *Edición Especial del Chef ⭐⭐⭐*
5. **Smash Trufa & Funghi** (\$14.90) &bull; *Gourmet Reserva ⭐⭐⭐*
6. **Crispy Chicken Royal** (\$11.99) &bull; *Especialidad Pollo Crujiente ⭐⭐*
7. **Bacon Lovers Deluxe** (\$13.50) &bull; *Favorita del Público ⭐⭐*
8. **Smoky BBQ Jack** (\$12.90) &bull; *Sabor Texano a la Leña ⭐⭐*
9. **Avocado Green Smash** (\$12.50) &bull; *Equilibrio Fresh ⭐*
10. **Volcán de Quesos Cheddar** (\$15.50) &bull; *Experiencia Quesera Extrema ⭐⭐⭐*

---

## 🚀 Comandos de Construcción y Despliegue

```bash
# 1. Compilar todas las aplicaciones y sincronizar en server/public
npm run build:all

# 2. Iniciar servidor unificado
npm start
```

Listo para despliegue automatizado con **Docker** y **Dokploy**.
