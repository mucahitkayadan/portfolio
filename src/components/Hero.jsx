import { motion } from "framer-motion";

import { styles } from "../styles";

import { ComputersCanvas } from "./canvas";

import { useState, useEffect } from "react";



const TypewriterText = ({ texts }) => {

  const [displayText, setDisplayText] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  const [isTyping, setIsTyping] = useState(true);



  useEffect(() => {

    const typingInterval = setInterval(() => {

      if (isTyping) {

        const currentText = texts[currentIndex];

        if (displayText.length < currentText.length) {

          setDisplayText((prevText) => currentText.slice(0, prevText.length + 1));

        } else {

          setIsTyping(false);

          clearInterval(typingInterval);

          setTimeout(() => {

            setIsTyping(true);

            setDisplayText("");

            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);

          }, 2000);

        }

      }

    }, 100);



    return () => {

      clearInterval(typingInterval);

    };

  }, [currentIndex, isTyping, texts, displayText]);



  return (

    <span className="inline-block text-[#915EFF] font-bold">

      {displayText.split('').map((char, index) => (

        <motion.span

          key={index}

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ duration: 0.1 }}

        >

          {char}

        </motion.span>

      ))}

      {isTyping && (

        <motion.span

          initial={{ opacity: 0 }}

          animate={{ opacity: 1 }}

          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}

          className="inline-block ml-1"

        >

          |

        </motion.span>

      )}

    </span>

  );

};



const WavingHand = () => (

  <img

    src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f44b.png"

    alt="Waving Hand"

    className="wave-emoji inline-block ml-2 w-10 h-10 sm:w-[50px] sm:h-[50px]"

  />

);



const Hero = () => {

  const typedItems = [

    "Software Engineer",

    "Machine Learning Engineer",

    "Computer Vision Engineer",

    "Electrical Electronics Engineer",

    "Machine Vision Engineer",

  ];



  return (

    <section className="relative w-full min-h-screen min-h-[100dvh] mx-auto overflow-hidden">

      <div className="absolute inset-0 z-0 sm:opacity-100 opacity-60">

        <ComputersCanvas />

      </div>



      <div

        className={`absolute inset-x-0 top-[calc(env(safe-area-inset-top,0px)+5.5rem)] sm:top-[120px] bottom-28 sm:bottom-20 z-10 max-w-7xl mx-auto ${styles.paddingX} flex flex-col sm:flex-row items-start gap-3 sm:gap-5 pointer-events-none`}

      >

        <div className="hidden sm:flex flex-col justify-center items-center mt-5">

          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />

          <div className="w-1 sm:h-80 h-40 violet-gradient" />

        </div>



        <div className="w-full max-w-full">

          <h1 className={`${styles.heroHeadText} text-white leading-tight`}>

            Hi, I'm <span className="text-[#915EFF]">Muja</span> <WavingHand />

          </h1>

          <p className={`${styles.heroSubText} mt-2 text-white-100 max-w-xl`}>

            I'm a <TypewriterText texts={typedItems} />

          </p>

        </div>

      </div>



      <div className="absolute bottom-[calc(env(safe-area-inset-bottom,0px)+2.5rem)] sm:bottom-10 z-10 w-full flex justify-center items-center pointer-events-auto">

        <a href="#about" aria-label="Scroll to about section">

          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">

            <motion.div

              animate={{

                y: [0, 24, 0],

              }}

              transition={{

                duration: 1.5,

                repeat: Infinity,

                repeatType: "loop",

              }}

              className="w-3 h-3 rounded-full bg-secondary mb-1"

            />

          </div>

        </a>

      </div>

    </section>

  );

};



export default Hero;


