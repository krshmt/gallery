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

    // Génère les items une seule fois au montage
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

    // Positionne les images UNE FOIS que les items sont générés et rendus
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

    // Effet du mouvement de souris
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

    // Gère le clic sur une image
    const handleClick = (id: string) => {
        setIsImageClicked(true);
    
        const selectedItem = document.querySelector(`.item[data-id="${id}"]`);
        const otherItems = document.querySelectorAll(`.item:not([data-id="${id}"])`);
    
        const tl = gsap.timeline({
            onComplete: () => {
                navigate(`/description?id=${encodeURIComponent(id)}`);
            },
        });
    
        // Cacher les autres images
        tl.to(otherItems, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                otherItems.forEach(item => item.classList.add('hidden'));
            }
        });
    
        if (selectedItem) {
            const itemBounds = selectedItem.getBoundingClientRect();
    
            // Supprimer les contraintes CSS avant l'animation
            gsap.set(selectedItem, {
                position: "fixed",
                top: itemBounds.top,
                left: itemBounds.left,
                width: itemBounds.width,
                height: itemBounds.height,
                maxWidth: "none",         // Supprimer max-width
                overflow: "visible",      // Permettre le débordement pendant l'animation
            });
    
            // Animer la position et la taille
            tl.to(selectedItem, {
                top: window.innerHeight / 2 - (window.innerHeight * 0.5) / 2,
                left: window.innerWidth / 2 - (window.innerWidth * 0.5) / 2,
                width: "50vw",
                height: "50vh",
                duration: 0.5,
                ease: "power2.out"
            });
        }
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
