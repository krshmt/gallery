import { useEffect } from "react";
import gsap from "gsap";
import "./styles.css";
import { g } from "framer-motion/client";

function Loader() {
  useEffect(() => {
    const counter3 = document.querySelector(".counter-3");

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.className = 'num';
        div.textContent = j.toString();
        counter3?.appendChild(div);
      }
    }

    const finalDiv = document.createElement("div");
    finalDiv.className = 'num';
    finalDiv.textContent = '0';
    counter3?.appendChild(finalDiv);

    function animate(counter: any, duration: number, delay = 0) {
      const numHeight = counter.querySelector('.num').clientHeight;
      const totalDistance =
        (counter.querySelectorAll('.num').length - 1) * numHeight;

      gsap.to(counter, {
        y: -totalDistance,
        duration: duration,
        delay: delay,
        ease: 'power2.inOut',
      });
    }

    animate(counter3, 3);
    animate(document.querySelector('.counter-2'), 3.5);
    animate(document.querySelector('.counter-1'), 1, 2.3);

    gsap.to(".digit", {
        top: "-150px",
        stagger: {
            amount: 0.25,
        },
        delay: 4,
        duration: 0.75,
        ease: "power4.inOut",
    });

    gsap.to(".loader-1", {
        width: "300px",
        duration: 3,
        ease: "power2.inOut",
    });

    gsap.to(".loader-1", {
        width: "50px",
        duration: 1,
        delay: 3.3,
        ease: "bounce.out",
    });

    gsap.to(".loader", {
        width: "50px",
        duration: 1,
        delay: 3.3,
        ease: "bounce.out",
    });

    gsap.to(".loader", {
        scale: 40,
        duration: 0.75,
        delay: 4.5,
        ease: "power2.inOut",
    });

    gsap.to(".loading-screen", {
        opacity: 0,
        duration: 0.75,
        delay: 5.5,
        ease: "power2.inOut",
    });

  }, []);

  return (
    <div className="loading-screen">
      <div className="loader">
        <div className="loader-1"></div>
      </div>

      <div className="counter">
        <div className="counter-1 digit">
          <div className="num">0</div>
          <div className="num num1offset1">1</div>
        </div>
        <div className="counter-2 digit">
          <div className="num">0</div>
          <div className="num num1offset2">1</div>
          <div className="num">2</div>
          <div className="num">3</div>
          <div className="num">4</div>
          <div className="num">5</div>
          <div className="num">6</div>
          <div className="num">7</div>
          <div className="num">8</div>
          <div className="num">9</div>
          <div className="num">0</div>
        </div>
        <div className="counter-3 digit">
          <div className="num">0</div>
          <div className="num">1</div>
          <div className="num">2</div>
          <div className="num">3</div>
          <div className="num">4</div>
          <div className="num">5</div>
          <div className="num">6</div>
          <div className="num">7</div>
          <div className="num">8</div>
          <div className="num">9</div>
        </div>
      </div>
    </div>
  );
}

export default Loader;