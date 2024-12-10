import React from "react";
import { Link } from "react-router-dom";
import Buttons from "../utils/Buttons";
import { motion } from "framer-motion";
import { useMyContext } from "../store/ContextApi";

const fadeInFromTop = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const fadeInFromBottom = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const LandingPage = () => {
  const { token } = useMyContext();

  return (
    <div className="min-h-[calc(100vh-74px)] flex flex-col items-center">
      {/* Hero Section */}
      <header className="hero bg-cover bg-center w-full h-[400px] flex flex-col items-center justify-center text-white text-center bg-green-700">
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeInFromTop}
        >
          Bienvenido a FruitCommerce
        </motion.h1>
        <p className="text-lg mb-6">
          Conecta proveedores y compradores de frutas frescas directamente.
        </p>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInFromBottom}
          className="flex items-center gap-4"
        >
          <Link to="/shop">
            <Buttons className="bg-green-600 text-white px-6 py-3 rounded-md">
              Explorar Productos
            </Buttons>
          </Link>
          {!token && (
            <Link to="/signup">
              <Buttons className="bg-yellow-500 text-white px-6 py-3 rounded-md">
                Regístrate Ahora
              </Buttons>
            </Link>
          )}
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-100 w-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-8">
            ¿Por qué elegir FruitCommerce?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature text-center">
              <img
                src="/images/access.png"
                alt="Acceso Directo"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">Acceso a Proveedores</h3>
              <p>
                Encuentra proveedores confiables con precios competitivos para
                tu negocio.
              </p>
            </div>
            <div className="feature text-center">
              <img
                src="/images/prices.png"
                alt="Precios Competitivos"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">Comparación de Precios</h3>
              <p>
                Compara ofertas en tiempo real y elige la mejor opción para tu
                negocio.
              </p>
            </div>
            <div className="feature text-center">
              <img
                src="/images/speed.png"
                alt="Rápido y Seguro"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">Gestión Simplificada</h3>
              <p>
                Realiza compras y administra tus pedidos de forma rápida y
                segura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white w-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-8">Testimonios</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="testimonial p-6 shadow-md bg-gray-100 rounded-md">
              <p className="italic">
                "FruitCommerce ha transformado la forma en que compramos frutas
                para nuestro negocio."
              </p>
              <h4 className="font-bold mt-4">— María López</h4>
            </div>
            <div className="testimonial p-6 shadow-md bg-gray-100 rounded-md">
              <p className="italic">
                "Ahora puedo comparar precios y elegir al mejor proveedor en
                minutos."
              </p>
              <h4 className="font-bold mt-4">— José Ramírez</h4>
            </div>
            <div className="testimonial p-6 shadow-md bg-gray-100 rounded-md">
              <p className="italic">
                "Una plataforma intuitiva y eficiente. Altamente recomendada."
              </p>
              <h4 className="font-bold mt-4">— Carla Fernández</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-16 bg-green-700 text-white w-full text-center">
        <h2 className="text-3xl font-semibold mb-4">¡Comienza hoy mismo!</h2>
        <p className="text-lg mb-6">
          Regístrate y conecta con los mejores proveedores o compradores.
        </p>
        {!token && (
          <Link to="/signup">
            <Buttons className="bg-yellow-500 px-6 py-3 rounded-md text-white">
              Regístrate Ahora
            </Buttons>
          </Link>
        )}
      </footer>
    </div>
  );
};

export default LandingPage;
