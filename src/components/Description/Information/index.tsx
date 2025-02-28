import React from 'react';
import motion from 'framer-motion';
import './styles.css';

interface InformationProps {
    isOpen: boolean;
    onClose: () => void;
    description_1: string;
    description_2: string;
    title: string;
}

function Information({ isOpen, onClose, description_1, description_2, title }){
    return (
        <div className={`information-popup ${isOpen ? 'open' : ''}`}>
            <div className="information-content">
                <p>{description_1}</p>
                <p>{description_2}</p>
            </div>
            <h1 className='title_information'>{title}</h1>
        </div>
    );
};

export default Information;