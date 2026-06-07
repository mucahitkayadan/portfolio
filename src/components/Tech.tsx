import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useInView, type Variants } from 'framer-motion';

import { techCategories, techCategoryOrder, type TechCategoryKey } from '../config/skills';
import { SectionWrapper } from '../hoc';
import type { TechItem } from '../types/portfolio';

type TechRows = Record<TechCategoryKey, TechItem[][]>;

const Tech = () => {
  const [rows, setRows] = useState<TechRows>({
    programming_languages: [],
    machine_learning: [],
    cloud_platforms: [],
    miscellaneous: [],
    platforms: [],
  });

  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls]);

  const calculateRows = (width: number, techArray: TechItem[]) => {
    const dynamicRows: TechItem[][] = [];
    let startIndex = 0;
    let rowSize = 6;

    if (width < 500) {
      return [
        techArray.slice(0, 3),
        techArray.slice(3, 5),
        techArray.slice(5, 8),
        techArray.slice(8, 10),
      ];
    }

    while (startIndex < techArray.length) {
      const endIndex = startIndex + rowSize;
      dynamicRows.push(techArray.slice(startIndex, endIndex));
      startIndex += rowSize;
      rowSize = rowSize === 6 ? 5 : 6;
    }

    return dynamicRows;
  };

  useEffect(() => {
    const calculateRowsForAllCategories = () => {
      const width = window.innerWidth;
      setRows({
        programming_languages: calculateRows(width, techCategories.programming_languages),
        machine_learning: calculateRows(width, techCategories.machine_learning),
        cloud_platforms: calculateRows(width, techCategories.cloud_platforms),
        miscellaneous: calculateRows(width, techCategories.miscellaneous),
        platforms: calculateRows(width, techCategories.platforms),
      });
    };

    calculateRowsForAllCategories();

    window.addEventListener('resize', calculateRowsForAllCategories);
    return () => window.removeEventListener('resize', calculateRowsForAllCategories);
  }, []);

  const hexagonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: Math.random() * 1.5,
        duration: 0.5,
        type: 'spring',
      },
    },
    hover: {
      scale: 1.05,
      zIndex: 2,
      transition: { duration: 0.3 },
    },
  };

  const categoryTitleStyle = {
    fontFamily: "'', cursive",
    fontSize: '26px',
    background: 'linear-gradient(90deg, #915EFF, #00BFFF)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 0 10px #915EFF)',
  } as const;

  const renderCategory = (categoryName: TechCategoryKey, categoryRows: TechItem[][]) => (
    <motion.div
      key={categoryName}
      className="category-container"
      initial="hidden"
      animate={mainControls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
      }}
    >
      <motion.h2
        className="category-title top"
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        style={categoryTitleStyle}
      >{`<${categoryName}>`}</motion.h2>
      <div className="honeycomb-grid">
        {categoryRows?.map((row, rowIndex) => (
          <div
            key={`${categoryName}-row-${rowIndex}`}
            className={`honeycomb-row ${rowIndex % 2 === 1 ? 'staggered-row' : ''}`}
          >
            {row.map(tech => (
              <motion.div
                key={tech.name}
                className="hexagon"
                variants={hexagonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onClick={() => window.open(tech.url, '_blank')}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                <img
                  src={tech.icon}
                  alt={tech.name}
                  style={{ userSelect: 'none' }}
                  draggable={false}
                />
                <div className="tech-name-overlay">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
      <motion.h2
        className="category-title bottom"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
        style={categoryTitleStyle}
      >{`</${categoryName}>`}</motion.h2>
    </motion.div>
  );

  return (
    <section className="skills" ref={ref}>
      <div className="container">
        <div className="skills-header mb-12">
          <p className="sm:text-[18px] text-[14px] text-white uppercase tracking-wider text-center">
            My Technical Arsenal
          </p>
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center">
            Skills.
          </h2>
        </div>
        {techCategoryOrder.map(categoryName => renderCategory(categoryName, rows[categoryName]))}
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, 'skills');
