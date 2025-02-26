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
        if (!imageId || !image) return;
    
        const imageData = sessionStorage.getItem("imagePosition");
        const imgElement = document.querySelector(".clicked__image") as HTMLImageElement;
        
        // Vérifier si c'est l'image qui a déjà été animée dans la galerie
        const isSameImage = document.querySelector(".selected-item");
    
        if (imageData && imgElement) {
            const { top, left, width, height } = JSON.parse(imageData);
    
            if (isSameImage) {
                // Si l'image était déjà animée, on la repositionne immédiatement sans animation
                gsap.set(imgElement, {
                    position: "fixed",
                    top,
                    left,
                    width,
                    height,
                    zIndex: 1000,
                });
    
                return; // Éviter de relancer l'animation
            }
    
            // Animation uniquement si l'image est nouvelle
            gsap.set(imgElement, {
                position: "fixed",
                top,
                left,
                width,
                height,
                zIndex: 1000,
            });
    
            gsap.to(imgElement, {
                top: "50%",
                left: "50%",
                width: "50vw",
                height: "50vh",
                xPercent: -50,
                yPercent: -50,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => {
                    gsap.set(imgElement, {
                        position: "relative",
                        top: "auto",
                        left: "auto",
                        transform: "none",
                    });
                }
            });
        }
    }, [imageId, image]); 
  
    const handleBack = () => {
        const imgElement = document.querySelector(".clicked__image") as HTMLImageElement;
        const imageData = sessionStorage.getItem("imagePosition");
    
        if (imgElement && imageData) {
            const { top, left, width, height } = JSON.parse(imageData);
    
            gsap.to(imgElement, {
                top,
                left,
                width,
                height,
                xPercent: 0,
                yPercent: 0,
                duration: 0.6,
                ease: "power2.in",
                onComplete: () => navigate('/'),
            });
        } else {
            navigate('/');
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
            <div className="image-wrapper">
                <img className="clicked__image" src={image.src} alt={image.title} />
            </div>
        </div>
    );
    
}

export default Description;