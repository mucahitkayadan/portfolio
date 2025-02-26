import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

import { styles } from '../styles';
import { SectionWrapper } from '../hoc';
import { fadeIn } from '../utils/motion';
import { profilepic } from '../assets';

const About: React.FC = () => {
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
                src={profilepic}
                alt="Muja Kayadan"
                className="w-[150%] h-[150%] object-cover rounded-full"
                style={{
                  objectPosition: '33.7% 22%',
                  transform: 'scale(1.5)',
                }}
              />
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-5 justify-center">
            <motion.button
              className="px-6 py-3 text-white bg-gradient-to-r from-blue-400 to-blue-600 rounded-md shadow-md hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition duration-500 ease-in-out hover:scale-105 active:translate-y-1 active:shadow-none no-select"
              style={{ boxShadow: '0px 5px 0px 0px rgba(0,0,0,0.6)', transition: 'all ease 0.1s' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://www.linkedin.com/in/muja-kayadan/', '_blank')}
            >
              <span className="font-semibold">LinkedIn</span>
            </motion.button>

            <motion.button
              className="px-6 py-3 text-white bg-gradient-to-r from-gray-600 to-gray-800 rounded-md shadow-md hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transform transition duration-500 ease-in-out hover:scale-105 active:translate-y-1 active:shadow-none no-select"
              style={{ boxShadow: '0px 5px 0px 0px rgba(0,0,0,0.6)', transition: 'all ease 0.1s' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://github.com/mucahitkayadan', '_blank')}
            >
              <span className="font-semibold">GitHub</span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div variants={fadeIn('left', 'spring', 0.5, 0.75)} className="w-full md:w-2/3">
          <motion.ul
            variants={fadeIn('', '', 0.1, 1)}
            className="mt-4 text-secondary text-[17px] max-w-3xl space-y-6 list-none"
          >
            <motion.li className="flex items-start" variants={fadeIn('up', 'spring', 0.1, 0.75)}>
              <span className="mr-4 text-2xl flex-shrink-0">👨‍💻</span>
              <span>
                I&apos;m a Software Engineer with 3 years of experience developing software
                solutions with a focus on machine learning, specializing in LLMs and computer vision
                applications.
              </span>
            </motion.li>
            <motion.li className="flex items-start" variants={fadeIn('up', 'spring', 0.2, 0.75)}>
              <span className="mr-4 text-2xl flex-shrink-0">🎓</span>
              <span>
                3 Master&apos;s Degrees and 4 work experiences in 5 countries across 3 different
                continents.
              </span>
            </motion.li>
            <motion.li className="flex items-start" variants={fadeIn('up', 'spring', 0.3, 0.75)}>
              <span className="mr-4 text-2xl flex-shrink-0">🛠</span>
              <span>
                Currently working as an ML Engineer on LLMs, RAG, Chatbots and developing
                intelligent solutions that bridge the gap between human language and machine
                understanding to create more intuitive and powerful AI applications.
              </span>
            </motion.li>
            <motion.li className="flex items-start" variants={fadeIn('up', 'spring', 0.4, 0.75)}>
              <span className="mr-4 text-2xl flex-shrink-0">🔧</span>
              <span>
                I enjoy automating workflows, optimizing systems, and turning complex challenges
                into real results. 📈
              </span>
            </motion.li>
            <motion.li className="flex items-start" variants={fadeIn('up', 'spring', 0.5, 0.75)}>
              <span className="mr-4 text-2xl flex-shrink-0">💡</span>
              <span>I&apos;m always curious and constantly learning.</span>
            </motion.li>
            <motion.li className="flex items-start" variants={fadeIn('up', 'spring', 0.6, 0.75)}>
              <span className="mr-4 text-2xl flex-shrink-0">📚</span>
              <span>
                Published research in{' '}
                <a
                  href="https://www.nature.com/articles/s41598-023-27772-4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:text-purple-400 transition-colors duration-300"
                >
                  Nature - Scientific Reports
                </a>{' '}
                on &quot;High Accuracy Gender Determination Using the Egg Shape Index&quot; (Jan
                2023), contributing to innovative machine learning applications in biological
                sciences.
              </span>
            </motion.li>
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, 'about');
