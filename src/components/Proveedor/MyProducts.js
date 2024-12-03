// MyProducts.js
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const MyProducts = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [stock, setStock] = useState("");
  const [foto, setFoto] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get("/api/productos/all");
        setProductos(response.data);
      } catch (error) {
        toast.error("Error al cargar productos.");
        console.error(error);
      }
    };

    const fetchCategorias = async () => {
      try {
        const response = await api.get("/api/productos/categorias");
        setCategorias(response.data);
      } catch (error) {
        toast.error("Error al cargar categorías.");
        console.error(error);
      }
    };

    fetchProductos();
    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación para asegurar que se seleccionen valores válidos
    if (!nombre || !precio || !categoriaId || !stock || !foto) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    try {
      const productoData = {
        nombre,
        precio: parseFloat(precio),
        categoriaId: parseInt(categoriaId),
        stock: parseFloat(stock),
        foto,
      };

      if (isEditing) {
        await api.put(`/api/productos/update/${editingProductId}`, productoData);
        toast.success("Producto actualizado con éxito.");
      } else {
        await api.post("/api/productos/save", productoData);
        toast.success("Producto agregado con éxito.");
      }

      const response = await api.get("/api/productos/all");
      setProductos(response.data);
      resetForm();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data); // Muestra el mensaje del backend si hay error en los datos
      } else {
        toast.error("Error al guardar el producto.");
      }
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/productos/delete/${id}`);
      toast.success("Producto eliminado con éxito.");
      setProductos(productos.filter((producto) => producto.idProducto !== id));
    } catch (error) {
      toast.error("Error al eliminar el producto.");
      console.error(error);
    }
  };

  const handleEdit = (producto) => {
    setIsEditing(true);
    setEditingProductId(producto.idProducto);
    setNombre(producto.nombre);
    setPrecio(producto.precio);
    setCategoriaId(producto.categoria.id);
    setStock(producto.stock);
    setFoto(producto.foto);
  };

  const handleToggleActivo = async (id, activo) => {
    try {
      await api.put(`/api/productos/toggle/${id}`); // Cambiar la ruta al endpoint correcto
      toast.success(`Producto ${activo ? "desactivado" : "activado"} con éxito.`);
      const response = await api.get("/api/productos/all");
      setProductos(response.data);
    } catch (error) {
      toast.error("Error al actualizar el estado del producto.");
      console.error(error);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingProductId(null);
    setNombre("");
    setPrecio("");
    setCategoriaId("");
    setStock("");
    setFoto("");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Productos</h1>
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Precio del producto"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Stock en kg"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="URL de la foto del producto"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
          required
          className="p-2 border rounded w-full"
        />
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          required
          className="p-2 border rounded w-full"
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.categoria}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isEditing ? "Actualizar Producto" : "Agregar Producto"}
        </button>
        {isEditing && (
          <button onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
            Cancelar
          </button>
        )}
      </form>

      <table className="w-full border-collapse bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Foto</th>
            <th className="p-2 border">Categoría</th>
            <th className="p-2 border">Activo</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={`prod-${producto.idProducto}`} className="hover:bg-gray-100">
              <td className="p-2 border">{producto.idProducto}</td>
              <td className="p-2 border">{producto.nombre}</td>
              <td className="p-2 border">{producto.precio}</td>
              <td className="p-2 border">{producto.stock} kg</td>
              <td className="p-2 border">
                <img src={producto.foto} alt={producto.nombre} className="w-16 h-16 object-cover" />
              </td>
              <td className="p-2 border">{producto.categoria.categoria}</td>
              <td className="p-2 border">{producto.activo ? "Sí" : "No"}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEdit(producto)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(producto.idProducto)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleToggleActivo(producto.idProducto, producto.activo)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  {producto.activo ? "Desactivar" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyProducts;
