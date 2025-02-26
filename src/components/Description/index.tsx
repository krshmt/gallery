import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import images from '../../data/images';
import imageVoirPlus from '../../data/imageDetail';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

    let isHorizontal = window.innerWidth <= 900;
    let maxTranslate = dimensions.containerSize - dimensions.indicatorSize;
    let currentTranslate = 0;
    let targetTranslate = 0;
    let isClickMove = false;
    let currentImageIndex = 0;
    const activeItemOpacity = 0.3;    

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

    useEffect(() => {
        const updateDimensions = () => {
            const itemElements = document.querySelectorAll('.description-item');
            if (itemElements.length > 0) {
                const isHorizontal = window.innerWidth <= 900;
                let newDimensions = {
                    itemSize: 0,
                    containerSize: 0,
                    indicatorSize: 0,
                };

                if (isHorizontal) {
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

    useEffect(() => {
        const itemElements = document.querySelectorAll('.description-item img');
        if (itemElements.length > 0) {
            itemElements[0].style.opacity = activeItemOpacity.toString();
            updatePreviewImage(0);
            animate();
        }
    }, [dimensions]);

    useEffect(() => {
        const container = containerRef.current;
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            isClickMove = false;

            const delta = e.deltaY;
            const scrollVelocity = Math.min(Math.max(delta * 0.5, -20), 20);

            targetTranslate = Math.min(
                Math.max(targetTranslate - scrollVelocity, -maxTranslate),
                0
            );
        };

        container?.addEventListener("wheel", handleWheel, { passive: false });

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            if (isHorizontal) {
                touchStartY = e.touches[0].clientY;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (isHorizontal) {
                const touchY = e.touches[0].clientY;
                const deltaY = touchStartY - touchY;

                const delta = deltaY;
                const scrollVelocity = Math.min(Math.max(delta * 0.5, -20), 20);

                targetTranslate = Math.min(
                    Math.max(targetTranslate - scrollVelocity, -maxTranslate),
                    0
                );

                touchStartY = touchY;
                e.preventDefault();
            }
        };

        container?.addEventListener("touchstart", handleTouchStart);
        container?.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container?.removeEventListener("wheel", handleWheel);
            container?.removeEventListener("touchstart", handleTouchStart);
            container?.removeEventListener("touchmove", handleTouchMove);
        };
    }, [dimensions, isHorizontal, maxTranslate]);

    const handleItemClick = (index: number) => {
        isClickMove = true;
        targetTranslate =
            -index * dimensions.itemSize +
            (dimensions.indicatorSize - dimensions.itemSize) / 2;
        targetTranslate = Math.max(Math.min(targetTranslate, 0), -maxTranslate);
    };

    function lerp(start: number, end: number, factor: number) {
        return start + (end - start) * factor;
    }

    function getItemInIndicator() {
        const itemImages = document.querySelectorAll('.description-item img');
        itemImages.forEach((img) => {
            (img as HTMLImageElement).style.opacity = '1';
        });

        const indicatorStart = -currentTranslate;
        const indicatorEnd = -currentTranslate + dimensions.indicatorSize;

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
        itemImages[selectedIndex].style.opacity = activeItemOpacity.toString();
        return selectedIndex;
    }

    function updatePreviewImage(index: number) {
        if (currentImageIndex !== index) {
            currentImageIndex = index;
            const targetItem = document.querySelectorAll('.description-item img')[index];
            const targetSrc = targetItem?.getAttribute('src');
            previewImageRef.current?.setAttribute('src', targetSrc || '');
        }
    }

    function animate() {
        const lerpFactor = isClickMove ? 0.05 : 0.075;
        currentTranslate = lerp(currentTranslate, targetTranslate, lerpFactor);

        if (Math.abs(currentTranslate - targetTranslate) > 0.01) {
            const transform = isHorizontal
                ? `translateX(${currentTranslate}px)`
                : `translateY(${currentTranslate}px)`;
            itemsRef.current!.style.transform = transform;

            const activeIndex = getItemInIndicator();
            updatePreviewImage(activeIndex);
        } else {
            isClickMove = false;
        }

        requestAnimationFrame(animate);
    }

    return (
        <div className="description-container" ref={containerRef}>
            <div className="back">
                <Link to="/">Back</Link>
            </div>
            <div className="img-preview-description">
            {selectedImage && (
                <motion.img
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
                        <div className="description-item" onClick={() => handleItemClick(0)}>
                            <img src={selectedImage.src} alt={selectedImage.title} />
                        </div>
                    )}
                    {associatedImages.map((src, index) => (
                        <div key={index} className="description-item" onClick={() => handleItemClick(index + 1)}>
                            <img src={src} alt={`Associated image ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Description;