import React, { useState, useCallback } from "react";
import { Tilt } from "react-tilt";

import { styles } from "../styles";
import { github, placeholder } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";

const ProjectCard = ({ name, description, tags, image, source_code_link, live_project_link }) => {

  return (
    <div className="w-full sm:w-[360px]">
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />

          {source_code_link && (
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
                <img
                  src={github}
                  alt="github"
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>

        {live_project_link && (
          <a 
            href={live_project_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-3"
          >
            <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md font-medium transition-all duration-300">
              Live Project
            </button>
          </a>
        )}
      </Tilt>
    </div>
  );
};

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      setVisibleProjects(prev => Math.min(prev + 6, projects.length));
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <>
      <div className="relative z-0">
        <div className="text-center">
          <h2 className={styles.sectionHeadText}>Projects.</h2>
          <p className={styles.sectionSubText}>My work</p>
        </div>

        <div className="mt-20 flex flex-wrap gap-7 justify-center">
          {projects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard
              key={`project-${index}`}
              {...project}
            />
          ))}
        </div>

        {visibleProjects < projects.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md font-medium transition-all duration-300"
            >
              {isLoading ? 'Loading...' : 'Load More Projects'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SectionWrapper(Projects, "projects");
