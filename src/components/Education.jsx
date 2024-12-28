import React, { useRef, useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion, useAnimation, useInView } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { education } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const EducationCard = ({ education }) => {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const initialCoursesToShow = 0;

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={education.date}
      iconStyle={{ background: education.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={education.icon}
            alt={education.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{education.title}</h3>
        <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>
          {education.company_name}
        </p>
        
        <p className="text-white-100 text-[14px] mt-2">
          {education.location}
        </p>

        <p className="text-white-100 text-[14px] mt-4">
          {education.description}
        </p>

        <div className="mt-4 p-2 bg-black-200 rounded">
          <p className="text-white font-semibold text-[16px]">
            GPA: {education.gpa}
          </p>
        </div>

        {showAllCourses && (
          <div className="mt-4">
            <p className="text-white text-[16px] font-semibold mb-2">Courses:</p>
            <ul className="list-disc ml-5 space-y-2">
              {education.points.slice(0, education.points.length - 1).map((point, index) => (
                <li
                  key={`education-point-${index}`}
                  className="text-white-100 text-[14px] pl-1 tracking-wider"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => setShowAllCourses(!showAllCourses)}
          className="mt-4 text-[14px] text-secondary hover:text-white transition-colors duration-200"
        >
          {showAllCourses ? "Hide Courses" : `Show Courses (${education.points.length - 1})`}
        </button>
      </div>
    </VerticalTimelineElement>
  );
};

const Education = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

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
        <p className={`${styles.sectionSubText} text-center`}>What I have Studied so far</p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={mainControls}
        variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        }}
      >
        <h2 className={`${styles.sectionHeadText} text-center`}>Education.</h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {education.map((education, index) => (
            <EducationCard key={`experience-${index}`} education={education} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default SectionWrapper(Education, "education");
