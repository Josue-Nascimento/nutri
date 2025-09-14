import React, { useState, useEffect } from "react";
import Product from "./product";
import Freight from "./Freight";
import Faq from "./Faq";
import Bonus from "./Bonus";
import { Clock } from "lucide-react";

import Guarantee from "./Guarantee";
import Footer from "./Footer";
import Ingredients from "./Ingredients";
import Popup from "./Popup";
import Logo from "./assets/Design sem nome.png";

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [flacons, setFlacons] = useState(48);
  const [animate, setAnimate] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const UNLOCK_TIME = 10;

  useEffect(() => {
    const videoTimer = setInterval(() => {
      setVideoTime((prev) => {
        const newTime = prev + 1;
        if (newTime >= UNLOCK_TIME && !isUnlocked) {
          setIsUnlocked(true);
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(videoTimer);
  }, [isUnlocked]);

  useEffect(() => {
    if (flacons > 0) {
      const interval = setInterval(() => {
        setFlacons((prev) => (prev > 0 ? prev - 1 : 0));
      }, 10000);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (flacons > 0) {
      setAnimate(true);
      setFlipped((prev) => !prev);
      const timer = setTimeout(() => setAnimate(false), 800);
      return () => clearTimeout(timer);
    }
  }, [flacons]);

  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white-50 to-white relative overflow-x-hidden">
      {/* Header Warning Bar */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 text-yellow-100 py-3 px-4 text-center font-semibold text-sm md:text-base sticky top-0 z-40">
        <div className="flex items-center justify-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>
            ATTENTION ! Cette présentation sera disponible seulement jusqu’au:{" "}
            {formattedDate}
          </span>
        </div>
      </div>

      {/* Overlay */}
      <div
        className="fixed inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-30"
        style={{ top: "100vh", minHeight: "200vh" }}
      >
        <div className="text-center p-8">
          <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-green-800">
            Attendi il video per continuare...
          </p>
          <p className="text-gray-600 mt-2">
            Rimangono {UNLOCK_TIME - videoTime} secondi
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <>
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-8">
              <img
                src={Logo}
                alt="SlimVita"
                className="mx-auto w-64 md:w-80"
                style={{ background: "transparent", boxShadow: "none" }}
              />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-6">
              Maigrissez avec santé, légèreté et confiance
            </h2>

            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
              SlimVita est le complément naturel qui accélère votre métabolisme,
              contrôle l’appétit et vous aide à obtenir le corps dont vous avez
              toujours rêvé sans régimes restrictifs ni efforts excessifs.
            </p>

            <div className="bg-green-50 p-8 rounded-2xl shadow-md max-w-2xl mx-auto text-left">
              <h3 className="text-2xl font-semibold text-green-800 mb-4">
                Les bénéfices au quotidien :
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>🔹 Brûle les graisses naturellement</li>
                <li>🔹 Réduit la faim et les compulsions</li>
                <li>🔹 Plus d’énergie et de vitalité</li>
                <li>🔹 Formule 100% naturelle et sûre</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-[rgb(240,253,244)] py-6">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl leading-tight md:text-3xl font-extrabold text-gray-900">
              Choisissez votre forfait SlimVita avec notre remise spéciale à
              durée limitée !
            </h2>

            <p className="mt-3 text-base md:text-lg font-semibold text-gray-800 flex justify-center items-center gap-2">
              <span
                className={`text-lg md:text-xl inline-block transition-transform duration-700 ${
                  flipped ? "rotate-180" : "rotate-0"
                }`}
              >
                ⏳
              </span>
              Flacons SlimVita restantes:{" "}
              <span
                className={`font-extrabold text-green-700 transition-transform duration-500 ${
                  animate ? "scale-125 text-red-600" : ""
                }`}
              >
                {flacons}
              </span>
            </p>
          </div>
        </section>

        <section className="bg-white py-12 px-4 md:px-8">
          <Freight />
          <Product />
        </section>

        <Ingredients />
        <Bonus />

        <section className="bg-white py-12 px-4 md:px-8">
          <Freight />
          <Product />
          <Guarantee flacons={flacons} setFlacons={setFlacons} />
          <Freight />
        </section>

        <Product />
        <Faq />
        <Footer />
      </>

      <Popup />
    </div>
  );
}

export default App;
