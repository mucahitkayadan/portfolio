import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

import { usePortfolio } from '../context/PortfolioContext';
import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn } from '../utils/motion';

const About = () => {
  const { fullName, profilePictureUrl, linkedin, github, aboutBullets } = usePortfolio();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  return (
    <div ref={sectionRef} className="pt-[60px] md:pt-0 overflow-hidden">
      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        className="text-center"
      >
        <p className={`${styles.sectionSubText} text-center`}>Introduction</p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        className="text-center"
      >
        <h2 className={`${styles.sectionHeadText} text-center`}>Overview.</h2>
      </motion.div>

      <div className="mt-10 flex flex-col md:flex-row items-center md:items-start gap-10">
        <motion.div
          variants={fadeIn('right', 'spring', 0.5, 0.75)}
          className="w-full md:w-1/3 flex flex-col items-center"
        >
          <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-[0_0_22.5px_7.5px_rgba(128,0,1028,1.0)]">
            <div className="w-full h-full overflow-hidden">
              <img
                src={profilePictureUrl}
                alt={fullName}
                className="w-[150%] h-[150%] object-cover rounded-full"
                style={{
                  objectPosition: '33.7% 22%',
                  transform: 'scale(1.5)',
                }}
              />
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-5 justify-center">
            {linkedin && (
              <motion.button
                type="button"
                className="px-6 py-3 text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-md shadow-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition duration-500 ease-in-out hover:scale-105 active:translate-y-1 active:shadow-none no-select"
                style={{
                  boxShadow: '0px 5px 0px 0px rgba(0,0,0,0.6)',
                  transition: 'all ease 0.1s',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(linkedin, '_blank')}
              >
                <span className="font-semibold">LinkedIn</span>
              </motion.button>
            )}

            {github && (
              <motion.button
                type="button"
                className="px-6 py-3 text-white bg-gradient-to-r from-gray-600 to-gray-800 rounded-md shadow-md hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transform transition duration-500 ease-in-out hover:scale-105 active:translate-y-1 active:shadow-none no-select"
                style={{
                  boxShadow: '0px 5px 0px 0px rgba(0,0,0,0.6)',
                  transition: 'all ease 0.1s',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(github, '_blank')}
              >
                <span className="font-semibold">GitHub</span>
              </motion.button>
            )}
          </div>
        </motion.div>

        <motion.div variants={fadeIn('left', 'spring', 0.5, 0.75)} className="w-full md:w-2/3">
          <motion.ul
            variants={fadeIn('', '', 0.1, 1)}
            className="mt-4 text-secondary text-[17px] max-w-3xl space-y-6 list-none"
          >
            {aboutBullets.map((bullet, index) => (
              <motion.li
                key={`${bullet.text.slice(0, 24)}-${index}`}
                className="flex items-start"
                variants={fadeIn('up', 'spring', 0.1 * (index + 1), 0.75)}
              >
                <span className="mr-4 text-2xl flex-shrink-0">{bullet.emoji}</span>
                <span>
                  {bullet.text}
                  {bullet.link && (
                    <>
                      {' '}
                      <a
                        href={bullet.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-500 hover:text-purple-400 transition-colors duration-300"
                      >
                        {bullet.link.label}
                      </a>
                    </>
                  )}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, 'about');
