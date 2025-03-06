// @ts-nocheck
import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import images from '../../data/images';
import imageVoirPlus from '../../data/imageDetail';
import Information from './Information';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './styles.css';

function Description() {
    const location = useLocation();
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [associatedImages, setAssociatedImages] = useState<any[]>([]);
    const [dimensions, setDimensions] = useState({
        itemSize: 0,
        containerSize: 0,
        indicatorSize: 0,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const previewImageRef = useRef<HTMLImageElement>(null);
    const animationRef = useRef<number>(null);

    const [isHorizontal, setIsHorizontal] = useState(window.innerWidth <= 900);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    
    // Utiliser useRef pour les variables qui doivent persister entre les rendus
    const maxTranslateRef = useRef(0);
    const currentTranslateRef = useRef(0);
    const targetTranslateRef = useRef(0);
    const isClickMoveRef = useRef(false);
    const currentImageIndexRef = useRef(0);
    const activeItemOpacity = 0.5;

    // Mettre à jour maxTranslate quand dimensions change
    useEffect(() => {
        maxTranslateRef.current = dimensions.containerSize - dimensions.indicatorSize;
    }, [dimensions]);

    // Chargement initial des images
    useEffect(() => {
        const imageId = new URLSearchParams(location.search).get('id');
        if (imageId) {
            const imageDetail = images.find((img) => img.id === imageId);
            const associatedImageDetail = imageVoirPlus.find((img) => img.id === imageId);
            if (imageDetail) {
                setSelectedImage(imageDetail);
                if (associatedImageDetail) {
                    setAssociatedImages([associatedImageDetail.src_1, associatedImageDetail.src_2, associatedImageDetail.src_3]);
                }
            }
        }
    }, [location]);

    // Mise à jour des dimensions
    useEffect(() => {
        const updateDimensions = () => {
            const isCurrentHorizontal = window.innerWidth <= 900;
            setIsHorizontal(isCurrentHorizontal);
            
            const itemElements = document.querySelectorAll('.description-item');
            if (itemElements.length > 0) {
                let newDimensions = {
                    itemSize: 0,
                    containerSize: 0,
                    indicatorSize: 0,
                };

                if (isCurrentHorizontal) {
                    newDimensions = {
                        itemSize: itemElements[0].getBoundingClientRect().width,
                        containerSize: itemsRef.current?.scrollWidth || 0,
                        indicatorSize: indicatorRef.current?.getBoundingClientRect().width || 0,
                    };
                } else {
                    newDimensions = {
                        itemSize: itemElements[0].getBoundingClientRect().height,
                        containerSize: itemsRef.current?.getBoundingClientRect().height || 0,
                        indicatorSize: indicatorRef.current?.getBoundingClientRect().height || 0,
                    };
                }
                setDimensions(newDimensions);
            }
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);

        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, [associatedImages]);

    // Configuration initiale après dimensions mises à jour
    useEffect(() => {
        const itemElements = document.querySelectorAll('.description-item img');
        if (itemElements.length > 0) {
            itemElements[0].style.opacity = activeItemOpacity.toString();
            updatePreviewImage(0);
            
            // Démarrer l'animation
            if (!animationRef.current) {
                animate();
            }
        }
    }, [dimensions]);

    // Gestionnaires d'événements pour wheel/touch
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        
        const handleWheel = (e) => {
            if (isInfoOpen) return; // Ne pas réagir si l'info est ouverte
            
            e.preventDefault();
            isClickMoveRef.current = false;

            const delta = e.deltaY;
            const scrollVelocity = Math.min(Math.max(delta * 0.5, -20), 20);

            targetTranslateRef.current = Math.min(
                Math.max(targetTranslateRef.current - scrollVelocity, -maxTranslateRef.current),
                0
            );
        };

        let touchStartY = 0;
        
        const handleTouchStart = (e) => {
            if (isInfoOpen) return; // Ne pas réagir si l'info est ouverte
            
            if (isHorizontal) {
                touchStartY = e.touches[0].clientY;
            }
        };

        const handleTouchMove = (e) => {
            if (isInfoOpen) return; // Ne pas réagir si l'info est ouverte
            
            if (isHorizontal) {
                const touchY = e.touches[0].clientY;
                const deltaY = touchStartY - touchY;

                const scrollVelocity = Math.min(Math.max(deltaY * 0.5, -20), 20);

                targetTranslateRef.current = Math.min(
                    Math.max(targetTranslateRef.current - scrollVelocity, -maxTranslateRef.current),
                    0
                );

                touchStartY = touchY;
                e.preventDefault();
            }
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart);
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [dimensions, isHorizontal, isInfoOpen]);

    // Définir handleItemClick comme useCallback pour éviter de recréer la fonction à chaque render
    const handleItemClick = useCallback((index) => {
        if (isInfoOpen) return; // Ne pas réagir si l'info est ouverte
        
        isClickMoveRef.current = true;
        targetTranslateRef.current =
            -index * dimensions.itemSize +
            (dimensions.indicatorSize - dimensions.itemSize) / 2;
        targetTranslateRef.current = Math.max(
            Math.min(targetTranslateRef.current, 0), 
            -maxTranslateRef.current
        );
    }, [dimensions, isInfoOpen]);

    function lerp(start, end, factor) {
        return start + (end - start) * factor;
    }

    function getItemInIndicator() {
        const itemImages = document.querySelectorAll('.description-item img');
        itemImages.forEach((img) => {
            img.style.opacity = '1';
        });

        const indicatorStart = -currentTranslateRef.current;
        const indicatorEnd = -currentTranslateRef.current + dimensions.indicatorSize;

        let maxOverlap = 0;
        let selectedIndex = 0;

        const itemElements = document.querySelectorAll('.description-item');
        itemElements.forEach((item, index) => {
            const itemStart = index * dimensions.itemSize;
            const itemEnd = itemStart + dimensions.itemSize;

            const overlapStart = Math.max(indicatorStart, itemStart);
            const overlapEnd = Math.min(indicatorEnd, itemEnd);
            const overlap = Math.max(0, overlapEnd - overlapStart);

            if (overlap > maxOverlap) {
                maxOverlap = overlap;
                selectedIndex = index;
            }
        });
        
        if (itemImages[selectedIndex]) {
            itemImages[selectedIndex].style.opacity = activeItemOpacity.toString();
        }
        return selectedIndex;
    }

    function updatePreviewImage(index) {
        if (currentImageIndexRef.current !== index) {
            currentImageIndexRef.current = index;
            const targetItem = document.querySelectorAll('.description-item img')[index];
            const targetSrc = targetItem?.getAttribute('src');
            if (previewImageRef.current && targetSrc) {
                previewImageRef.current.setAttribute('src', targetSrc);
            }
        }
    }

    function animate() {
        const lerpFactor = isClickMoveRef.current ? 0.05 : 0.075;
        currentTranslateRef.current = lerp(
            currentTranslateRef.current, 
            targetTranslateRef.current, 
            lerpFactor
        );

        if (Math.abs(currentTranslateRef.current - targetTranslateRef.current) > 0.01) {
            const transform = isHorizontal
                ? `translateX(${currentTranslateRef.current}px)`
                : `translateY(${currentTranslateRef.current}px)`;
                
            if (itemsRef.current) {
                itemsRef.current.style.transform = transform;
            }

            const activeIndex = getItemInIndicator();
            updatePreviewImage(activeIndex);
        } else {
            isClickMoveRef.current = false;
        }

        animationRef.current = requestAnimationFrame(animate);
    }

    // Animations GSAP
    useEffect(() => {
        gsap.fromTo(
            ".img-preview-description img",
            { y: "100vh" },
            { y: 0, duration: 1, ease: "power3.out" }
        );
    
        const items = document.querySelectorAll(".description-item");
        items.forEach((item, index) => {
            gsap.fromTo(
                item,
                { x: index % 2 === 0 ? "2vw" : "-2vw", y: "-5vh", opacity: 0, scale: 0.5 },
                { x: 0, y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out", delay: index * 0.2 }
            );
        });
    
        gsap.fromTo(
            ".indicator", 
            { opacity: 0 },
            { opacity: 1, duration: 0.5, delay: items.length}
        );

        gsap.fromTo(
            ".info-button",
            { y: "10vh" },
            { y: 0, duration: 0.5, ease: "power3.out" }
        );
        
        // Clean up animation frame when component unmounts
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [associatedImages]);

    const navigate = useNavigate();

    const handleBackClick = (e) => {
        e.preventDefault();

        gsap.to(".img-preview-description img", {
            scale: 0.5,
            opacity: 0,
            duration: 0.5,
            ease: "power3.in",
            onComplete: () => {
                navigate("/");
            }
        });

        gsap.to(".description-items", {
            x: "20vw",
            duration: 0.5,
            ease: "power3.in"
        });

        gsap.to(".indicator", {
            x: "20vw",
            duration: 0.5,
            ease: "power3.in"
        });
    };

    const toggleInfo = useCallback(() => {
        setIsInfoOpen(prev => !prev);
    }, []);

    return (
        <div className="description-container" ref={containerRef}>
            <div className="img-preview-description">
            {selectedImage && (
                <img
                    ref={previewImageRef}
                    src={selectedImage.src}
                    alt={selectedImage.title}
                />
            )}
            </div>

            <div className="minimap">
                <div className="indicator" ref={indicatorRef}></div>
                <div className="description-items" ref={itemsRef}>
                    {selectedImage && (
                        <div className="description-item" onClick={() => !isInfoOpen && handleItemClick(0)}>
                            <img src={selectedImage.src} alt={selectedImage.title} />
                        </div>
                    )}
                    {associatedImages.map((src, index) => (
                        <div key={index} className="description-item" onClick={() => !isInfoOpen && handleItemClick(index + 1)}>
                            <img src={src} alt={`Associated image ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
            <button className="info-button" onClick={toggleInfo}>
                {isInfoOpen ? 'Fermer' : 'Informations'}
            </button>

            {selectedImage && (
                <Information
                    isOpen={isInfoOpen}
                    onClose={toggleInfo}
                    description_1={selectedImage.description_1}
                    description_2={selectedImage.description_2}
                    title={selectedImage.title}
                />
            )}
        </div>
    );
}

export default Description;