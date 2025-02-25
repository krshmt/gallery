import { useEffect, useState, useRef } from "react";
import images from "../../data/images";
import "./styles.css";

function Gallery() {
    const galleryRef = useRef<HTMLDivElement>(null);
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        //Génération des images
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

        //Positionnement des images
        const items = document.querySelectorAll('.item');
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

        items.forEach((item, index) => {
            const pos = positions[index % positions.length];
            item.style.top = pos.top;
            item.style.left = pos.left;
        });

        //Effet du mouvement de souris
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY, currentTarget } = e;
            const { width, height } = (currentTarget as HTMLElement).getBoundingClientRect();
            const centerX = width / 2;
            const centerY = height / 2;

            const sensitivity = 2.3;
            const deltaX = (centerX - clientX) / sensitivity;
            const deltaY = (centerY - clientY) / sensitivity;

            galleryRef.current.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`;
        };

        const container = document.querySelector('.container');
        container?.addEventListener('mousemove', handleMouseMove);

        return () => {
            container?.removeEventListener('mousemove', handleMouseMove);
        }

    }, [items]);

    useEffect(() => {

    }, [items]);

    return (
        <>
            <div className="container">
                <div className="gallery__container" ref={galleryRef}>
                    <div className="gallery">
                        {items.map((item) => (
                            <div key={item.id} className="item">
                                <div className="preview-img">
                                    <img src={item.image.src} alt={item.image.title} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}


export default Gallery;