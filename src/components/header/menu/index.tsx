import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";


const menuLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'A propos', path: '/about' },
    { label: 'Contact', path: '/contact' }
];

function Menu() {

    const container = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const tl = useRef();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    useGSAP(
        () => {
        gsap.set(".menu-link-item-holder", { y: -75 });

        tl.current = gsap
            .timeline({ paused: true })
            .to(".menu-overlay", {
                duration: 1.25,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "power4.inOut"
            })
            .to(".menu-link-item-holder", {
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
                    <Link to="/">GALLERY</Link>
                </div>
                <div className="menu-open" onClick={toggleMenu}>
                    <p>MENU</p>
                </div>
            </div>
            <div className="menu-overlay">
                <div className="menu-overlay-bar">
                    <div className="menu-logo">
                        <Link to="/">GALLERY</Link>
                    </div>
                    <div className="menu-close" onClick={toggleMenu}>
                        <p>CLOSE</p>
                    </div>
                </div>
                <div className="menu-close-icon">
                    <p>&#x2715;</p>
                </div>
                <div className="menu-copy">
                    <div className="menu-links">
                        {menuLinks.map((link, index) => (
                            <div className="menu-link-item" key={index}>
                                <div className="menu-link-item-holder" onClick={toggleMenu}>
                                    <Link className='menu-link' to={link.path}>{link.label}</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="menu-info">
                        <div className="menu-info-col">
                            <a href="">Instagram</a>
                            <a href="">Tiktok</a>
                            <a href="">LinkedIn</a>
                            <a href="">Github</a>
                        </div>
                        <div className="menu-info-col">
                            <p>tourekris16@gmail.com</p>
                            <p>07 07 07 07 07</p>
                        </div>
                    </div>
                </div>
                <div className="menu-preview">
                    <p>Voir plus</p>
                </div>
            </div>
        </div>
    );
}

export default Menu;