// Composant pour les prestations de service JWL Marketing
const ServicesSection = () => {
  return `
    <section class="services-section" id="prestations">
      <div class="services-container">
        <h1 class="services-title">Les Prestations de Service de JWL Marketing</h1>
        
        <div class="services-grid">
          <!-- Audit SEO -->
          <div class="service-bubble" data-page="audit-seo">
            <div class="bubble-content">
              <h3>Audit SEO</h3>
            </div>
          </div>

          <!-- Refonte Web -->
          <div class="service-bubble" data-page="refonte-web">
            <div class="bubble-content">
              <h3>Refonte Web</h3>
              <p>Création de l'arborescence de votre site Web avec ou sans SEO</p>
            </div>
          </div>

          <!-- Branding et Logo -->
          <div class="service-bubble" data-page="branding-logo">
            <div class="bubble-content">
              <h3>Branding et Logo</h3>
              <p>Identité visuelle - Logo - Valeurs</p>
            </div>
          </div>

          <!-- Social Media -->
          <div class="service-bubble" data-page="social-media">
            <div class="bubble-content">
              <h3>Social Media</h3>
              <p>Contenu - Mots clés - Conversion</p>
            </div>
          </div>

          <!-- Développement commercial -->
          <div class="service-bubble" data-page="developpement-commercial">
            <div class="bubble-content">
              <h3>Développement commercial</h3>
              <p>Prospection - argumentaire - cloning</p>
            </div>
          </div>

          <!-- Formations -->
          <div class="service-bubble" data-page="formations">
            <div class="bubble-content">
              <h3>Formations</h3>
              <p>Méthode - Confiance - Autonomie</p>
            </div>
          </div>
        </div>

        <!-- Section Jodie LAPAILLERIE (en dehors de la grille) -->
        <div class="consultant-section">
          <div class="consultant-card">
            <h3>Jodie LAPAILLERIE</h3>
            <p>Consultante</p>
          </div>
        </div>
      </div>
    </section>

    <style>
      .services-section {
        padding: 4rem 2rem;
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        min-height: 100vh;
      }

      .services-container {
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
      }

      .services-title {
        font-size: 2.5rem;
        color: #2c3e50;
        margin-bottom: 3rem;
        font-weight: 700;
      }

      .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
      }

      .service-bubble {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
        cursor: pointer;
        border: 3px solid transparent;
        position: relative;
        overflow: hidden;
      }

      .service-bubble::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #3498db, #9b59b6);
      }

      .service-bubble:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        border-color: #3498db;
      }

      .bubble-content h3 {
        color: #2c3e50;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        font-weight: 600;
      }

      .bubble-content p {
        color: #7f8c8d;
        line-height: 1.6;
        margin: 0;
      }

      .consultant-section {
        margin-top: 2rem;
      }

      .consultant-card {
        background: linear-gradient(135deg, #3498db, #9b59b6);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        display: inline-block;
        box-shadow: 0 10px 30px rgba(52, 152, 219, 0.3);
      }

      .consultant-card h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }

      .consultant-card p {
        margin: 0;
        opacity: 0.9;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .services-section {
          padding: 2rem 1rem;
        }

        .services-title {
          font-size: 2rem;
        }

        .services-grid {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .service-bubble {
          padding: 1.5rem;
        }
      }
    </style>

    <script>
      // Gestion des clics sur les bulles
      document.addEventListener('DOMContentLoaded', function() {
        const bubbles = document.querySelectorAll('.service-bubble');
        
        bubbles.forEach(bubble => {
          bubble.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            // Redirection vers la page correspondante
            window.location.href = \`/\${page}\`;
          });
        });
      });
    </script>
  `;
};

// Fonction pour injecter la section dans la page principale
export const initServicesSection = () => {
  const mainElement = document.querySelector('main');
  if (mainElement) {
    mainElement.innerHTML += ServicesSection();
  }
};

// Export du composant pour utilisation
export default ServicesSection;