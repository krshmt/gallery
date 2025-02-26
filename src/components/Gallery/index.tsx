import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import images from "../../data/images";
import { motion } from "framer-motion";
import "./styles.css";

function Gallery() {
    const galleryRef = useRef<HTMLDivElement>(null);
    const [items, setItems] = useState<any[]>([]);
    const [isImageClicked, setIsImageClicked] = useState(false);

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

        const itemsElements = document.querySelectorAll(".item");
        const positions = [
            { top: "25%", left: "10%" },
            { top: "20%", left: "25%" },
            { top: "40%", left: "40%" },
            { top: "40%", left: "80%" },
            { top: "65%", left: "25%" },
            { top: "0%", left: "40%" },
            { top: "30%", left: "55%" },
            { top: "60%", left: "60%" },
            { top: "10%", left: "70%" },
            { top: "0%", left: "100%" },
            { top: "20%", left: "30%" },
        ];

        itemsElements.forEach((item, index) => {
            const pos = positions[index % positions.length];
            item.style.position = "absolute";
            item.style.top = pos.top;
            item.style.left = pos.left;
        });
    }, [items]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isImageClicked) return;
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

        const container = document.querySelector(".container");
        container?.addEventListener("mousemove", handleMouseMove);

        return () => {
            container?.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isImageClicked]);

    return (
        <div className="container">
            <div className="gallery__container" ref={galleryRef}>
                <div className="gallery">
                {items.map((item) => {
                    console.log("Gallery layoutId: ", `image-${item.id}`);  // Affiche l'ID dans la console
                    return (
                        <Link
                            key={item.id}
                            to={`/description?id=${encodeURIComponent(item.id)}`}
                            className="item"
                            data-id={item.id}
                            onClick={() => setIsImageClicked(true)}
                        >
                            <motion.img
                                src={item.image.src}
                                alt={item.image.title}
                                className="img"
                                layoutId={`image-${item.id}`}  // Vérifie l'ID
                            />
                        </Link>
                    );
                })}
                </div>
            </div>
        </div>
    );
}

export default Gallery;