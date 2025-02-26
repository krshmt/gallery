import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import images from "../../data/images";
import { gsap } from "gsap";
import "./styles.css";

function Gallery() {
    const galleryRef = useRef<HTMLDivElement>(null);
    const [items, setItems] = useState<any[]>([]);
    const [isImageClicked, setIsImageClicked] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const generateItems = () => {
            const rows = [
                { id: 1, count: 4 },
                { id: 2, count: 3 },
                { id: 3, count: 4 },
            ];
            const newItems = rows.flatMap((row) => {
                return Array.from({ length: row.count }, (_, index) => {
                    const itemId = `${row.id}-${index + 1}`;
                    const image = images.find((i) => i.id === itemId);
                    return {
                        id: itemId,
                        rowId: row.id,
                        image: image || "",
                    };
                });
            });
            setItems(newItems);
        };
        generateItems();
    }, []);

    useEffect(() => {
        if (items.length === 0) return;

        const itemsElements = document.querySelectorAll('.item');
        const positions = [
            { top: '25%', left: '10%' },
            { top: '20%', left: '25%' },
            { top: '40%', left: '40%' },
            { top: '40%', left: '80%' },
            { top: '65%', left: '25%' },
            { top: '0%', left: '40%' },
            { top: '30%', left: '55%' },
            { top: '60%', left: '60%' },
            { top: '10%', left: '70%' },
            { top: '0%', left: '100%' },
            { top: '20%', left: '30%' },
        ];

        itemsElements.forEach((item, index) => {
            const pos = positions[index % positions.length];
            item.style.position = 'absolute';
            item.style.top = pos.top;
            item.style.left = pos.left;
        });
    }, [items]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (location.pathname !== '/' || isImageClicked) return;
            const { clientX, clientY, currentTarget } = e;
            const { width, height } = (currentTarget as HTMLElement).getBoundingClientRect();
            const centerX = width / 2;
            const centerY = height / 2;

            const sensitivity = 2.3;
            const deltaX = (centerX - clientX) / sensitivity;
            const deltaY = (centerY - clientY) / sensitivity;

            if (galleryRef.current) {
                galleryRef.current.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`;
            }
        };

        const container = document.querySelector('.container');
        container?.addEventListener('mousemove', handleMouseMove);

        return () => {
            container?.removeEventListener('mousemove', handleMouseMove);
        };
    }, [location.pathname, isImageClicked]);

    const handleClick = (id: string) => {
        setIsImageClicked(true);
    
        const selectedItem = document.querySelector(`.item[data-id="${id}"]`) as HTMLElement;
        const otherItems = document.querySelectorAll(`.item:not([data-id="${id}"])`);
    
        if (!selectedItem) return;
    
        const itemBounds = selectedItem.getBoundingClientRect();
        
        // Calcul de la position centrale réelle
        const centerX = window.innerWidth / 2 - itemBounds.width / 2;
        const centerY = window.innerHeight / 2 - itemBounds.height / 2;
    
        sessionStorage.setItem("imagePosition", JSON.stringify({
            top: itemBounds.top,
            left: itemBounds.left,
            width: itemBounds.width,
            height: itemBounds.height,
        }));
    
        // Masquer les autres images avec une transition fluide
        gsap.to(otherItems, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                otherItems.forEach(item => item.classList.add('hidden'));
            }
        });
    
        // Placer l'image à sa position initiale (celle de la galerie)
        gsap.set(selectedItem, {
            position: "fixed",
            top: itemBounds.top,
            left: itemBounds.left,
            width: itemBounds.width,
            height: itemBounds.height,
            zIndex: 1000,
        });
    
        // Animation fluide vers le centre de l'écran
        gsap.to(selectedItem, {
            top: centerY,
            left: centerX,
            width: "50vw",
            height: "50vh",
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
                navigate(`/description?id=${encodeURIComponent(id)}`);
            }
        });
    };
  
    

    return (
        <div className="container">
            <div className="gallery__container" ref={galleryRef}>
                <div className="gallery">
                    {items.map((item) => (
                        <div key={item.id} className="item" data-id={item.id} onClick={() => handleClick(item.id)}>
                            <div className="preview-img">
                                <img src={item.image.src} alt={item.image.title} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Gallery;