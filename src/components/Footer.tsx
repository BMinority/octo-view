import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaGlobe,
} from "react-icons/fa";
import "../styles/Footer.scss";

function Footer() {
  return (
    <footer className="bc-footer">
      <div className="bc-footer__content">
        <p className="bc-footer__dev">Desenvolvido por Bruno Coelho</p>

        <div className="bc-footer__links">
          <a
            href="mailto:brunocoelho66@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Enviar e-mail"
          >
            <FaEnvelope />
          </a>

          <a
            href="https://wa.me/5581989206365"
            target="_blank"
            rel="noopener noreferrer"
            title="Enviar mensagem no WhatsApp"
          >
            <FaWhatsapp />
          </a>

          <a
            href="https://github.com/BMinority"
            target="_blank"
            rel="noopener noreferrer"
            title="Acessar GitHub"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/dev-bcoelho/"
            target="_blank"
            rel="noopener noreferrer"
            title="Acessar LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://brunocoelhodd.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            title="Ver portfólio"
          >
            <FaGlobe />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
