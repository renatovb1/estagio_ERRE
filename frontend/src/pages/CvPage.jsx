import "./CvPage.css";
import { Link } from "react-router-dom";

const CV_IMAGE_URL = "";

export default function CvPage() {
  return (
    <section className="cv-page panel">
      <div className="section-head">
        <span className="section-kicker">CV</span>
        <h1>Imagem do Currículo</h1>
      </div>

      <div className="cv-slot">
        {CV_IMAGE_URL ? (
          <img src={CV_IMAGE_URL} alt="CV" className="cv-image" />
        ) : (
          <div className="cv-empty">
            <p>Coloca a URL da imagem em `CV_IMAGE_URL`.</p>
          </div>
        )}
      </div>

      <div className="cv-actions">
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    </section>
  );
}
