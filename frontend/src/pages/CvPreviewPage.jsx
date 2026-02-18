import { Link } from "react-router-dom";
import cvImage from "../assets/Renato Barbosa.png";
import "./CvPreviewPage.css";

export default function CvPreviewPage() {
  return (
    <section className="cv-preview-page">
      <div className="cv-preview-inner">
        <div className="cv-preview-head">
          <h1>Curriculum Vitae</h1>
          <Link to="/" className="cv-preview-back">
            Voltar
          </Link>
        </div>

        <img src={cvImage} alt="CV de Renato Barbosa" className="cv-preview-image" />
      </div>
    </section>
  );
}
