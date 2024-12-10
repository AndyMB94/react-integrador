import React, { useState } from "react";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // Validar que todos los campos estén llenos
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    // Simulación de envío de datos (puedes reemplazar esto con un servicio real)
    toast.success("Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.");
    console.log("Mensaje enviado:", formData);

    // Reiniciar formulario
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-74px)] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Contáctanos</h1>
        <p className="text-gray-600 mb-4">
          ¿Tienes preguntas sobre nuestros servicios? ¿Quieres saber más sobre los proveedores o productos disponibles en
          <strong> FruitCommerce</strong>? ¡Estamos aquí para ayudarte!
        </p>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-left text-gray-700 mb-2" htmlFor="name">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={onChangeHandler}
              placeholder="Ingrese su nombre completo"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-left text-gray-700 mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              placeholder="Ingrese su correo electrónico"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-left text-gray-700 mb-2" htmlFor="subject">
              Asunto
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={onChangeHandler}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccione un asunto</option>
              <option value="Productos">Consultas sobre productos</option>
              <option value="Proveedores">Consultas sobre proveedores</option>
              <option value="Soporte">Soporte técnico</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
          <div>
            <label className="block text-left text-gray-700 mb-2" htmlFor="message">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={onChangeHandler}
              placeholder="Escriba su mensaje aquí"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
