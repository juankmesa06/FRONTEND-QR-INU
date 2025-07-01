import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import "../assets/About.css"

// Componente para lazy loading de imágenes
const LazyImage = ({ src, alt, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById(`img-${src}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [src])

  return (
    <div id={`img-${src}`} className={`image-container ${className}`}>
      {isInView && (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={`lazy-image ${isLoaded ? "loaded" : "loading"}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
      {!isLoaded && isInView && (
        <div className="image-skeleton">
          <div className="skeleton-shimmer"></div>
        </div>
      )}
    </div>
  )
}

// Componente para las tarjetas de valores
const ValueCard = ({ title, children, delay = 0 }) => {
  return (
    <motion.div
      className="about-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -12, scale: 1.02 }}
    >
      <h3>{title}</h3>
      {children}
    </motion.div>
  )
}

// Componente principal
function About() {
  const [videoLoaded, setVideoLoaded] = useState(false)

  const galleryImages = [
    { src: "/images/image_2.jpg", alt: "Perro feliz disfrutando del viaje" },
    { src: "/images/gallery-2.jpg", alt: "Paseo pet-friendly por la ciudad" },
    { src: "/images/gallery-3.jpg", alt: "Collar QR INU en acción" },
    { src: "/images/gallery-4.jpg", alt: "Gato protegido con tecnología INU" },
  ]

  const contactInfo = [
    {
      icon: "📧",
      label: "Email",
      value: "soporte@inutrips.com",
      href: "mailto:soporte@inutrips.com",
    },
    {
      icon: "📞",
      label: "Teléfono",
      value: "+57 300 123 4567",
      href: "tel:+573001234567",
    },
    {
      icon: "📍",
      label: "Dirección",
      value: "Calle 123 #45-67, Medellín, Colombia",
      href: "https://maps.google.com/?q=Medellín,Colombia",
    },
    {
      icon: "🌐",
      label: "Web",
      value: "www.inutrips.com",
      href: "https://www.inutrips.com",
    },
  ]

  return (
    <div className="about-container">
      {/* 🎬 Hero con video mejorado */}
      <section className="about-hero-section">
        <div className="video-wrapper">
          <video
            className="about-video"
            src="/videos/hero-inutrips.mp4"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            poster="/images/video-poster.jpg" // Añade un poster
          />
          <div className="video-overlay">
            <motion.h1
              className="about-hero-title"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Movilidad pet-friendly con propósito
            </motion.h1>
          </div>
        </div>
      </section>

      {/* 🐾 Quiénes Somos - Tarjeta principal */}
      <motion.section
        className="about-card"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="about-title">Quiénes Somos</h2>

        <div className="about-content-grid">
          <div className="text-content">
            <p className="about-text">
              <strong>INUTrips</strong> es una plataforma integral de movilidad pet-friendly en Colombia, comprometida
              con ofrecer soluciones tecnológicas seguras para humanos y animales.
            </p>
            <p className="about-text">
              Nuestro producto <strong>QR Mascotas</strong> permite identificar y proteger mascotas con collares
              inteligentes que las conectan con sus familias.
            </p>
            <p className="about-text">
              Esta iniciativa nace del amor por los animales y la visión de una movilidad más empática y conectada.
            </p>
          </div>

          <div className="image-content">
            <LazyImage
              src="/images/gallery-5.jpg"
              alt="Familia con mascota disfrutando de un viaje seguro"
              className="about-img-full"
            />
          </div>
        </div>
      </motion.section>

      {/* 🚀 Misión, Visión, Valores */}
      <section className="about-sections">
        <ValueCard title="Misión" delay={0.1}>
          <p>Conectar la movilidad urbana con el bienestar animal, promoviendo ciudades más seguras y humanas.</p>
        </ValueCard>

        <ValueCard title="Visión" delay={0.2}>
          <p>Ser la red pet-friendly más confiable de Latinoamérica, integrando innovación y empatía.</p>
        </ValueCard>

        <ValueCard title="Valores" delay={0.3}>
          <ul>
            <li>Amor por los animales</li>
            <li>Seguridad e integridad</li>
            <li>Tecnología con propósito</li>
            <li>Movilidad inclusiva</li>
            <li>Sostenibilidad</li>
            <li>Comunidad y colaboración</li>
          </ul>
        </ValueCard>
      </section>

      {/* 🐶 Galería de Mascotas mejorada */}
      <section className="about-gallery">
        <motion.h2
          className="about-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Nuestros Peludos Embajadores
        </motion.h2>

        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 1 }}
            >
              <LazyImage src={image.src} alt={image.alt} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📬 Contacto mejorado */}
      <motion.section
        className="about-contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3>Contáctanos</h3>
        <p>¿Tienes preguntas? ¡Estamos aquí para ayudarte!</p>

        <div className="contact-grid">
          {contactInfo.map((contact, index) => (
            <motion.div
              key={index}
              className="contact-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="contact-icon">{contact.icon}</span>
              <div className="contact-info">
                <span className="contact-label">{contact.label}:</span>
                <a
                  href={contact.href}
                  target={contact.label === "Web" || contact.label === "Dirección" ? "_blank" : undefined}
                  rel={contact.label === "Web" || contact.label === "Dirección" ? "noopener noreferrer" : undefined}
                  className="contact-link"
                >
                  {contact.value}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}

export default About
