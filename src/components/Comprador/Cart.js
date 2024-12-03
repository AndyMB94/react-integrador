import React, { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { formatCurrency } from "../../utils/currencyFormatter";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const carritoResponse = await api.get("/api/carrito/comprador");
        if (!carritoResponse.data || !carritoResponse.data.idCarrito) {
          throw new Error("Carrito no encontrado");
        }
        const carrito = carritoResponse.data;

        const productosResponse = await api.get(
          `/api/carrito-productos/${carrito.idCarrito}/productos`
        );
        setCartItems(productosResponse.data);

        const totalResponse = await api.get(
          `/api/carrito-productos/${carrito.idCarrito}/total`
        );
        setTotal(totalResponse.data);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
        toast.error("Error al cargar el carrito.");
        setCartItems([]);
        setTotal(0);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (idCarritoProducto) => {
    try {
      if (!idCarritoProducto) {
        toast.error("El producto seleccionado no es válido.");
        return;
      }

      await api.delete(`/api/carrito-productos/eliminar/${idCarritoProducto}`);
      toast.success("Producto eliminado del carrito.");

      setCartItems((prevItems) => {
        const updatedItems = prevItems.filter(
          (item) => item.idCarritoProductos !== idCarritoProducto
        );
        const updatedTotal = updatedItems.reduce(
          (acc, item) =>
            acc +
            (item.producto?.precio || 0) * parseFloat(item.cantidad || "0"),
          0
        );
        setTotal(updatedTotal);
        return updatedItems;
      });
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
      toast.error("No se pudo eliminar el producto del carrito.");
    }
  };

  const handleQuantityChange = async (idCarritoProducto, newQuantity) => {
    if (newQuantity <= 0) {
      toast.error("La cantidad debe ser mayor a 0.");
      return;
    }

    try {
      // Enviar la nueva cantidad al backend
      await api.post(`/api/carrito-productos/${idCarritoProducto}/actualizar-cantidad`, {
        cantidad: parseFloat(newQuantity),
      });

      // Actualizar el estado con la nueva cantidad
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.idCarritoProductos === idCarritoProducto
            ? { ...item, cantidad: newQuantity.toString() }
            : item
        )
      );

      // Recalcular el total
      const updatedTotal = cartItems.reduce(
        (acc, item) =>
          acc +
          (item.producto?.precio || 0) *
            (item.idCarritoProductos === idCarritoProducto
              ? parseFloat(newQuantity)
              : parseFloat(item.cantidad || "0")),
        0
      );
      setTotal(updatedTotal);

      toast.success("Cantidad actualizada correctamente.");
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
      toast.error("No se pudo actualizar la cantidad.");
    }
  };

  const igv = total * 0.18; // Calcular IGV (18%)
  const totalPagar = total + igv; // Calcular Total a Pagar

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">El carrito está vacío.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">Nombre del Producto</th>
                  <th className="border border-gray-300 px-4 py-2">Precio x kg</th>
                  <th className="border border-gray-300 px-4 py-2">Cantidad (kg)</th>
                  <th className="border border-gray-300 px-4 py-2">Subtotal</th>
                  <th className="border border-gray-300 px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item.idCarritoProductos || `${item.producto?.idProducto}-${index}`}>
                    <td className="border border-gray-300 px-4 py-2">
                      {item.producto?.nombre}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatCurrency(item.producto?.precio || 0)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={item.cantidad}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.idCarritoProductos,
                            parseFloat(e.target.value)
                          )
                        }
                        className="w-16 border px-2 py-1 rounded"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {formatCurrency(
                        (item.producto?.precio || 0) * parseFloat(item.cantidad || "0")
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleRemoveItem(item.idCarritoProductos)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Subtotal:</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>IGV (18%):</span>
              <span>{formatCurrency(igv)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total a Pagar:</span>
              <span>{formatCurrency(totalPagar)}</span>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => navigate("/shop")}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Continuar Comprando
            </button>
            <button
              onClick={() => toast.success("Funcionalidad en desarrollo")}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Proceder con el Pago
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
