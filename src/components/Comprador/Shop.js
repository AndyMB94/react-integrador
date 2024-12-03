import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { formatCurrency } from "../../utils/currencyFormatter";

const Shop = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState(""); // Cambiado a un string vacío por defecto

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get("/api/productos/all");
        const activeProductos = response.data.filter((producto) => producto.activo);
        setProductos(activeProductos);
        setFilteredProductos(activeProductos); // Inicializar el filtrado
      } catch (error) {
        toast.error("Error al cargar productos.");
        console.error("Error al obtener productos:", error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await api.get("/api/productos/categorias");
        setCategorias(response.data);
      } catch (error) {
        toast.error("Error al cargar categorías.");
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchProductos();
    fetchCategorias();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilter = (e) => {
    setSelectedCategoria(e.target.value);
  };

  const handleAddToCart = async (productoId) => {
    try {
      // Obtiene el carrito del comprador autenticado
      const carritoResponse = await api.get("/api/carrito/comprador");
      const carrito = carritoResponse.data;

      // Verifica si el producto ya está en el carrito
      const productosCarrito = await api.get(
        `/api/carrito-productos/${carrito.idCarrito}/productos`
      );

      const productoExistente = productosCarrito.data.find(
        (item) => item.producto.idProducto === productoId
      );

      if (productoExistente) {
        toast.error("Este producto ya está en el carrito.");
        return;
      }

      // Agrega el producto al carrito
      const response = await api.post("/api/carrito-productos/agregar", null, {
        params: { productoId },
      });

      if (response.status === 201) {
        toast.success("Producto agregado al carrito.");
      } else {
        toast.error("No se pudo agregar el producto al carrito.");
      }
    } catch (error) {
      toast.error("Error al agregar producto al carrito.");
      console.error("Error al agregar producto:", error);
    }
  };

  useEffect(() => {
    let filtered = productos;

    if (searchTerm) {
      filtered = filtered.filter((producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategoria) {
      filtered = filtered.filter(
        (producto) => producto.categoria.id === parseInt(selectedCategoria)
      );
    }

    setFilteredProductos(filtered);
  }, [searchTerm, selectedCategoria, productos]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tienda</h1>

      {/* Barra de búsqueda y filtro por categoría */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar productos por nombre..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border rounded w-full md:w-1/2"
        />

        <select
          value={selectedCategoria}
          onChange={handleCategoryFilter}
          className="p-2 border rounded w-full md:w-1/3"
        >
          <option value="">Filtrar por categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id.toString()}>
              {categoria.categoria}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProductos.map((producto) => (
          <div key={producto.idProducto} className="border rounded shadow p-4">
            <img
              src={producto.foto}
              alt={producto.nombre}
              className="w-full h-40 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">{producto.nombre}</h2>
            <p className="text-gray-600">Precio: {formatCurrency(producto.precio)}</p>
            <p className="text-gray-600">Stock: {producto.stock} kg</p>
            <button
              onClick={() => handleAddToCart(producto.idProducto)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Agregar al Carrito
            </button>
          </div>
        ))}
        {filteredProductos.length === 0 && (
          <p className="col-span-3 text-center text-gray-600">No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
