// ts-nocheck
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import images from "../../data/images";
import { motion } from "framer-motion";
import Loader from "../Loader";
import "./styles.css";
import { del } from "framer-motion/client";

function Gallery() {
  const [items, setItems] = useState<any[]>([]);
  const [isImageClicked, setIsImageClicked] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const currentX = useRef(0);
  const currentY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);

  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedGallery");

    if (!hasVisited) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasVisitedGallery", "true");
      }, 5000);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loading || items.length === 0) return;

    const positionImages = () => {
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
        { top: "20%", left: "40%" },
      ];

      itemsElements.forEach((item, index) => {
        const pos = positions[index % positions.length];
        item.style.position = "absolute";
        item.style.top = pos.top;
        item.style.left = pos.left;
      });
    };

    // Ajoute un léger délai pour s'assurer que le DOM est mis à jour
    setTimeout(positionImages, 100);
  }, [loading, items]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isImageClicked) return;

      const { clientX, clientY, currentTarget } = e;
      const { width, height } = (
        currentTarget as HTMLElement
      ).getBoundingClientRect();
      const centerX = width / 2;
      const centerY = height / 2;

      mouseX.current = clientX;
      mouseY.current = clientY;

      const sensitivity = 2.3; //plus elle est haut, plus la zone de déplacement est petite
      targetX.current = (centerX - clientX) / sensitivity;
      targetY.current = (centerY - clientY) / sensitivity;
    };

    const animate = () => {
      if (isImageClicked) return;

      const lerp = 0.05;
      currentX.current += (targetX.current - currentX.current) * lerp;
      currentY.current += (targetY.current - currentY.current) * lerp;

      if (galleryRef.current) {
        galleryRef.current.style.transform = `translate(calc(-50% + ${currentX.current}px), calc(-50% + ${currentY.current}px))`;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    const container = document.querySelector(".container");
    container?.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      container?.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isImageClicked]);

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

  const handleClick = (
    id: string,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    setIsImageClicked(true);

    const items = document.querySelectorAll(".item");
    items.forEach((item) => item.classList.add("active"));

    setTimeout(() => {
      window.location.href = `/description?id=${encodeURIComponent(id)}`;
    }, 900);
  };

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : (
        <div className="gallery__container" ref={galleryRef}>
          <motion.div
            className="gallery"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              scale: { duration: 1, ease: [0, 0, 0, 1]},
              opacity: { duration: 1, ease: "easeIn"},
            }}
          >
            {items.map((item) => (
              <Link
                key={item.id}
                to={`/description?id=${encodeURIComponent(item.id)}`}
                className="item"
                data-id={item.id}
                onClick={(e) => handleClick(item.id, e)}
              >
                <img
                  src={item.image.src}
                  alt={item.image.title}
                  className="img"
                  draggable={false}
                />
              </Link>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Gallery;