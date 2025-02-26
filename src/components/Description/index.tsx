import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import images from '../../data/images';
import imageVoirPlus from '../../data/imageDetail';
import './styles.css';

function Description() {
    const location = useLocation();
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [associatedImages, setAssociatedImages] = useState<any[]>([]);

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

    if (!selectedImage) return <div className="description-container"><h1>Image not found</h1></div>;

    return (
        <div className="description-container">
            <div className="img-preview">
                <img src={selectedImage.src} alt={selectedImage.title} />
            </div>
        </div>
    );
}

export default Description; 