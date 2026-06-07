import { useState, useCallback, useMemo, useTransition, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';

import { styles } from '../styles';
import { type ExperienceEntry } from '../constants';
import { usePortfolio } from '../context/PortfolioContext';
import { SectionWrapper } from '../hoc';
import { fadeIn } from '../utils/motion';

interface ExperienceCardProps {
  experience: ExperienceEntry;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

const ExperienceCard = memo(({ experience, isActive, onClick, index }: ExperienceCardProps) => {
  const iconInset = experience.iconInset ?? false;

  return (
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.1, 0.5)}
      className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${
        isActive ? 'bg-tertiary' : 'bg-primary'
      }`}
      onClick={onClick}
    >
      <div
        className={`flex-shrink-0 w-16 h-16 rounded-full overflow-hidden mr-4 flex items-center justify-center ${
          iconInset ? 'p-2' : ''
        }`}
        style={iconInset ? { backgroundColor: experience.iconBg ?? '#fff' } : undefined}
      >
        <img
          src={experience.icon}
          alt={experience.company_name}
          className={`w-full h-full ${iconInset ? 'object-contain' : 'object-cover'}`}
        />
      </div>
      <div>
        <h3 className="text-white text-[18px] font-bold">{experience.title}</h3>
        <p className="text-secondary text-[14px]">{experience.company_name}</p>
      </div>
    </motion.div>
  );
});
ExperienceCard.displayName = 'ExperienceCard';

interface ExperienceDetailsProps {
  experience: ExperienceEntry;
}

const ExperienceDetails = memo(({ experience }: ExperienceDetailsProps) => {
  const [expandedPoints, setExpandedPoints] = useState(false);
  const [visiblePoints, setVisiblePoints] = useState(5);

  const handleShowMore = () => {
    if (expandedPoints) {
      setVisiblePoints(prev => Math.min(prev + 5, experience.points.length));
    } else {
      setExpandedPoints(true);
    }
  };

  const handleShowLess = () => {
    setExpandedPoints(false);
    setVisiblePoints(5);
  };

  return (
    <motion.div
      key={experience.company_name}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="bg-tertiary p-8 rounded-lg"
    >
      <h3 className="text-white text-[24px] font-bold mb-4">{experience.title}</h3>
      <p className="text-secondary text-[16px] mb-4">{experience.company_name}</p>

      <div className="flex items-center gap-4 mb-4">
        <p className="text-white-100 text-[14px]">{experience.date}</p>
        <span className="text-secondary">•</span>
        <p className="text-white-100 text-[14px]">{experience.location}</p>
      </div>

      <p className="text-white-100 text-[14px] mb-6">{experience.description}</p>

      {expandedPoints ? (
        <ul className="list-disc ml-5 space-y-2">
          {experience.points.slice(0, visiblePoints).map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-white-100 text-[14px] pl-1 tracking-wider"
            >
              {point}
            </li>
          ))}
        </ul>
      ) : (
        <ul className="list-disc ml-5 space-y-2">
          {experience.points.slice(0, 4).map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-white-100 text-[14px] pl-1 tracking-wider"
            >
              {point}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex gap-4">
        {!expandedPoints ? (
          <button
            type="button"
            onClick={handleShowMore}
            className="text-secondary hover:text-white text-[14px] cursor-pointer transition-colors duration-200"
          >
            Show More Details
          </button>
        ) : (
          <>
            {visiblePoints < experience.points.length && (
              <button
                type="button"
                onClick={handleShowMore}
                className="text-secondary hover:text-white text-[14px] cursor-pointer transition-colors duration-200"
              >
                Load More
              </button>
            )}
            <button
              type="button"
              onClick={handleShowLess}
              className="text-secondary hover:text-white text-[14px] cursor-pointer transition-colors duration-200"
            >
              Show Less
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
});
ExperienceDetails.displayName = 'ExperienceDetails';

const Experience = () => {
  const { experiences } = usePortfolio();
  const [activeExperience, setActiveExperience] = useState(0);
  const [isPending, startTransition] = useTransition();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const mainControls = useAnimation();

  const handleExperienceClick = useCallback((index: number) => {
    startTransition(() => {
      setActiveExperience(index);
    });
  }, []);

  const currentExperience = useMemo(
    () => experiences[activeExperience],
    [experiences, activeExperience]
  );

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  if (experiences.length === 0) {
    return null;
  }

  return (
    <div ref={sectionRef}>
      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <p className={`${styles.sectionSubText} text-center`}>My Professional Journey</p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <h2 className={`${styles.sectionHeadText} text-center`}>Work Experience</h2>
      </motion.div>

      <div className="mt-20 flex flex-col md:flex-row gap-10">
        <div className="md:w-1/3">
          <div className="flex flex-col space-y-4">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={`experience-${index}`}
                experience={experience}
                isActive={index === activeExperience}
                onClick={() => handleExperienceClick(index)}
                index={index}
              />
            ))}
          </div>
        </div>
        <div className="md:w-2/3">
          <AnimatePresence mode="wait" initial={false}>
            {!isPending && (
              <ExperienceDetails
                key={currentExperience.company_name}
                experience={currentExperience}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, 'work');
