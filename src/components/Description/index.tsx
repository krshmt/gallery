import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate, useLocation } from 'react-router-dom';
import images from '../../data/images';
import './styles.css';

function Description() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const imageId = new URLSearchParams(location.search).get('id');
  const image = images.find((img) => img.id === imageId);

  useEffect(() => {
    if (!imageId) return; // Si l'id est manquant, ne rien faire
  
    if (containerRef.current && image) {
      const tl = gsap.timeline();
      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  }, [imageId, image]);
  

  const handleBack = () => {
    if (containerRef.current) {
      const tl = gsap.timeline({
        onComplete: () => navigate('/'),
      });
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
      });
    }
  };

  if (!image) return (
    <div ref={containerRef} className="description-container">
      <h1>Image not found</h1>
      <button onClick={() => navigate('/')}>Go back to Gallery</button>
    </div>
  );
  

  return (
    <div ref={containerRef} className="description-container">
      <button onClick={handleBack}>Back</button>
      <h1>{image.title}</h1>
      <p>{image.description}</p>
      <img className='clicked__image' src={image.src} alt={image.title} />
    </div>
  );
}

export default Description;