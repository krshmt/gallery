import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import './styles.css';


const menuLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'A propos', path: '/about' },
    { label: 'Contact', path: '/contact' }
];

const socialsLinks = [
    { label: 'Instagram', path: '/' },
    { label: 'Tiktok', path: '/about' },
    { label: 'tourekris16@gmail.com', path: '/contact' }
];

function Menu() {

    const container = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const tl = useRef();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const handleNavigation = (path: string) => {
        tl.current.reverse();

        setTimeout(() => {
            navigate(path);
        }, 1000);
    };


    useGSAP(
        () => {
            gsap.set(".menu-link-item-holder, .menu-info-col-holder", { y: 75 });
    
            tl.current = gsap
                .timeline({ paused: true })
                .to(".menu-overlay", {
                    duration: 1.25,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    ease: "power4.inOut"
                })
                .to(".menu-link-item-holder, .menu-info-col-holder", {
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.inOut",
                    delay: -0.75,
                });
        },
        { scope: container }
    );

    useEffect(() => {
        if (isOpen) {
            tl.current.play();
        } else {
            tl.current.reverse();
        }
    }, [isOpen]);

    return (
        <div className="menu-container" ref={container}>
            <div className="menu-bar">
                <div className="menu-logo">
                    <p onClick={() => handleNavigation("/")}> GALLERY</p>
                </div>
                <div className="menu-open" onClick={toggleMenu}>
                    <p>MENU</p>
                </div>
            </div>
            <div className="menu-overlay">
                <div className="menu-overlay-bar">
                    <div className="menu-logo">
                        <p onClick={() => handleNavigation("/")} className='white' to="/">GALLERY</p>
                    </div>
                    <div className="menu-close" onClick={toggleMenu}>
                        <p className='white'>CLOSE</p>
                    </div>
                </div>
                <div className="menu-copy">
                    <div className="menu-links">
                        {menuLinks.map((link, index) => (
                            <div className="menu-link-item" key={index}>
                                <div className="menu-link-item-holder" onClick={() => handleNavigation(link.path)}>
                                    <p className='menu-link white'>{link.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="menu-info">
                        <div className="menu-info-col">
                        {socialsLinks.map((link, index) => (
                            <div className="menu-link-item" key={index}>
                                <div className="menu-info-col-holder animated-link">
                                    <a href={link.path} className='menu-link white'>{link.label}</a>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Menu;