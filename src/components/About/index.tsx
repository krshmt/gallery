import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './styles.css';

const phrase1 = [
  "Kris, etudiant en BUT Informatique a l'IUT d'Orleans et developpeur au Mouvement Associatif. J'ai choisi de creer cette application pour promouvoir et ameliorer mes competences en developpement WEB afin de rejoindre une ecole et une entreprise l'annee prochaine.",
];

const phrase2 = [
  "Je remercie toutes les personnes qui ont contribuer aux photos de l'album afin d'avoir un projet complet",
];

function About() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -500]);

  return (
    <div className="container-about">
      <MaskText listPhrases={phrase1} />
      <MaskText listPhrases={phrase2} />
      <motion.img
        src="/images/image1.jpg"
        alt="Parallax Image"
        className="parallax-image"
        style={{ y }}
      />
    </div>
  );
}

export default About;

interface MaskTextProps {
  listPhrases: string[];
}

function MaskText({ listPhrases }: MaskTextProps) {
  const animation = {
    initial: { y: "100%" },
    enter: (i: number) => ({ y: "0", transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1], delay: 0.02 * i } })
  };

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  return (
    <div ref={ref}>
      {listPhrases.map((phrase, phraseIndex) => (
        <div key={phraseIndex} className='line-mask'>
          {phrase.split(" ").map((word, wordIndex) => (
            <div key={wordIndex} className='word-mask-container'>
              <motion.span
                custom={wordIndex}
                variants={animation}
                initial="initial"
                animate={inView ? "enter" : ""}
                className='word-mask'
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}