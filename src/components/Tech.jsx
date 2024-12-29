import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

// Import all assets
import {
  // Languages
  python,
  java,
  cplusplus,
  matlab,
  octave,
  c,

  // Machine Learning
  opencv,
  tensorflow,
  pytorch,
  keras,
  scikit,
  pillow,
  pandas,
  numpy,
  matplotlib,
  seaborn,
  scipy,
  ollama,
  spacy,
  langchain,
  openai,
  onnx,
  cuda,
  openvino,
  // Cloud Platforms
  amazonapigateway,
  amazoncloudwatch,
  amazondocumentdb,
  amazondynamodb,
  amazonec2,
  amazonecs,
  amazonelasticache,
  amazonrds,
  amazonroute53,
  amazons3,
  amazonsqs,
  azurecloud,
  digitalocean,
  googlecloud,
  computeengine,

  // Miscellaneous  
  mongodb,
  mysql,
  postgresql,
  sqlite,
  docker,
  githubactions,
  git,
  elasticsearch,
  fastapi,
  flask,
  gradle,
  hibernate,
  jupyter,
  latex,
  pytest,
  qt,
  spring,
  streamlit,
  linux,
  selenium,
  milvus,
  // Platforms
  arduino,
  esp32,
  jetson,
  raspberrypi,
  stm32,
} from "../assets";

const programming_languages = [
  { name: "Python", icon: python, url: "https://www.python.org" },
  { name: "Java", icon: java, url: "https://www.java.com" },
  { name: "C", icon: c, url: "https://en.wikipedia.org/wiki/C_(programming_language)" },
  { name: "C++", icon: cplusplus, url: "https://isocpp.org" },  
  { name: "Matlab", icon: matlab, url: "https://www.mathworks.com/products/matlab.html" },
  { name: "Octave", icon: octave, url: "https://octave.org" },
];

const machine_learning = [
  { name: "OpenCV", icon: opencv, url: "https://opencv.org" },
  { name: "TensorFlow", icon: tensorflow, url: "https://www.tensorflow.org" },
  { name: "PyTorch", icon: pytorch, url: "https://pytorch.org" },
  { name: "Keras", icon: keras, url: "https://keras.io" },
  { name: "Scikit-Learn", icon: scikit, url: "https://scikit-learn.org" },
  { name: "Pillow", icon: pillow, url: "https://pypi.org/project/pillow/" },
  { name: "Pandas", icon: pandas, url: "https://pandas.pydata.org" },
  { name: "NumPy", icon: numpy, url: "https://numpy.org" },
  { name: "Matplotlib", icon: matplotlib, url: "https://matplotlib.org" },
  { name: "Seaborn", icon: seaborn, url: "https://seaborn.pydata.org" },
  { name: "SciPy", icon: scipy, url: "https://scipy.org" },
  { name: "Ollama", icon: ollama, url: "https://ollama.ai" },
  { name: "Spacy", icon: spacy, url: "https://spacy.io" },
  { name: "Langchain", icon: langchain, url: "https://www.langchain.com" },
  { name: "OpenAI", icon: openai, url: "https://openai.com" },
  { name: "ONNX", icon: onnx, url: "https://onnx.ai" },
  { name: "OpenVINO", icon: openvino, url: "https://openvino.ai" },
];

const cloud_platforms = [
  { name: "Amazon API Gateway", icon: amazonapigateway, url: "https://aws.amazon.com/api-gateway" },
  { name: "Amazon CloudWatch", icon: amazoncloudwatch, url: "https://aws.amazon.com/cloudwatch" },
  { name: "Amazon DocumentDB", icon: amazondocumentdb, url: "https://aws.amazon.com/documentdb" },
  { name: "Amazon DynamoDB", icon: amazondynamodb, url: "https://aws.amazon.com/dynamodb" },
  { name: "Amazon EC2", icon: amazonec2, url: "https://aws.amazon.com/ec2" },
  { name: "Amazon ECS", icon: amazonecs, url: "https://aws.amazon.com/ecs" },
  { name: "Amazon Elasticache", icon: amazonelasticache, url: "https://aws.amazon.com/elasticache" },
  { name: "Amazon RDS", icon: amazonrds, url: "https://aws.amazon.com/rds" },
  { name: "Amazon Route 53", icon: amazonroute53, url: "https://aws.amazon.com/route53" },
  { name: "Amazon S3", icon: amazons3, url: "https://aws.amazon.com/s3" },
  { name: "Amazon SQS", icon: amazonsqs, url: "https://aws.amazon.com/sqs" },
  { name: "Azure Cloud", icon: azurecloud, url: "https://azure.microsoft.com" },
  { name: "DigitalOcean", icon: digitalocean, url: "https://www.digitalocean.com" },
  { name: "Google Cloud", icon: googlecloud, url: "https://cloud.google.com" },
  { name: "Compute Engine", icon: computeengine, url: "https://cloud.google.com/compute" },
];

const miscellaneous = [
  { name: "MongoDB", icon: mongodb, url: "https://www.mongodb.com" },
  { name: "MySQL", icon: mysql, url: "https://www.mysql.com" },
  { name: "PostgreSQL", icon: postgresql, url: "https://www.postgresql.org" },
  { name: "SQLite", icon: sqlite, url: "https://www.sqlite.org" },
  { name: "Docker", icon: docker, url: "https://www.docker.com" },
  { name: "GitHub Actions", icon: githubactions, url: "https://github.com/features/actions" },
  { name: "Git", icon: git, url: "https://git-scm.com" },
  { name: "Elasticsearch", icon: elasticsearch, url: "https://www.elastic.co/elasticsearch" },
  { name: "FastAPI", icon: fastapi, url: "https://fastapi.tiangolo.com" },
  { name: "Flask", icon: flask, url: "https://flask.palletsprojects.com" },
  { name: "Gradle", icon: gradle, url: "https://gradle.org" },
  { name: "Hibernate", icon: hibernate, url: "https://hibernate.org" },
  { name: "Jupyter", icon: jupyter, url: "https://jupyter.org" },
  { name: "Latex", icon: latex, url: "https://www.latex-project.org" },
  { name: "Pytest", icon: pytest, url: "https://docs.pytest.org" },
  { name: "Qt", icon: qt, url: "https://www.qt.io" },
  { name: "Spring", icon: spring, url: "https://spring.io" },
  { name: "Streamlit", icon: streamlit, url: "https://streamlit.io" },
  { name: "Selenium", icon: selenium, url: "https://www.selenium.dev" },
  { name: "Milvus", icon: milvus, url: "https://milvus.io" },
];

const platforms = [
  { name: "Linux", icon: linux, url: "https://www.linux.org" },
  { name: "Arduino", icon: arduino, url: "https://www.arduino.cc" },
  { name: "ESP32", icon: esp32, url: "https://www.espressif.com" },
  { name: "Jetson", icon: jetson, url: "https://developer.nvidia.com/jetson" },
  { name: "Raspberry Pi", icon: raspberrypi, url: "https://www.raspberrypi.org" },
  { name: "STM32", icon: stm32, url: "https://www.st.com/stm32" },
  { name: "CUDA", icon: cuda, url: "https://developer.nvidia.com/cuda-toolkit" },
];

const Tech = () => {
  const [rows, setRows] = useState({
    programming_languages: [],
    machine_learning: [],
    cloud_platforms: [],
    miscellaneous: [],
    platforms: [],
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    amount: 0.2
  });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const calculateRows = (width, techArray) => {
    let dynamicRows = [];
    let startIndex = 0;
    let rowSize = 6;

    if (width < 500) {
      dynamicRows = [
        techArray.slice(0, 3),
        techArray.slice(3, 5),
        techArray.slice(5, 8),
        techArray.slice(8, 10),
      ];
    } else {
      while (startIndex < techArray.length) {
        const endIndex = startIndex + rowSize;
        dynamicRows.push(techArray.slice(startIndex, endIndex));
        startIndex += rowSize;
        rowSize = rowSize === 6 ? 5 : 6;
      }
    }

    return dynamicRows;
  };

  useEffect(() => {
    const calculateRowsForAllCategories = () => {
      const rowsData = {
        programming_languages: calculateRows(window.innerWidth, programming_languages),
        machine_learning: calculateRows(window.innerWidth, machine_learning),
        cloud_platforms: calculateRows(window.innerWidth, cloud_platforms),
        miscellaneous: calculateRows(window.innerWidth, miscellaneous),
        platforms: calculateRows(window.innerWidth, platforms),
      };
      setRows(rowsData);
    };

    calculateRowsForAllCategories();

    const handleResize = () => {
      calculateRowsForAllCategories();
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hexagonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        delay: Math.random() * 1.5, 
        duration: 0.5, 
        type: "spring" 
      } 
    },
    hover: {
      scale: 1.05,
      zIndex: 2,
      transition: { duration: 0.3 }
    }
  };

  const renderCategory = (categoryName, categoryRows) => (
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
        style={{
          fontFamily: "'', cursive",
          fontSize: "26px",
          background: "linear-gradient(90deg, #915EFF, #00BFFF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textFillColor: "transparent",
          filter: "drop-shadow(0 0 10px #915EFF)",
        }}
      >{`<${categoryName}>`}</motion.h2>
      <div className="honeycomb-grid">
        {categoryRows?.map((row, rowIndex) => (
          <div
            key={`${categoryName}-row-${rowIndex}`}
            className={`honeycomb-row ${rowIndex % 2 === 1 ? "staggered-row" : ""}`}
          >
            {row.map((tech) => (
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
                <img src={tech.icon} alt={tech.name} style={{ userSelect: "none" }} draggable="false"/>
                <div className="tech-name-overlay">
                  {tech.name}
                </div>
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
        style={{
          fontFamily: "'', cursive",
          fontSize: "26px",
          background: "linear-gradient(90deg, #915EFF, #00BFFF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textFillColor: "transparent",
          filter: "drop-shadow(0 0 10px #915EFF)",
        }}
      >{`</${categoryName}>`}</motion.h2>
    </motion.div>
  );

  return (
    
    <section className="skills" ref={ref}>
      <div className="container">
        <motion.div variants={textVariant()} className="skills-header">
          <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider text-center">My Technical Arsenal</p>
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center">Skills.</h2>
        </motion.div>
        {renderCategory("programming_languages", rows.programming_languages)}
        {renderCategory("machine_learning", rows.machine_learning)}
        {renderCategory("cloud_platforms", rows.cloud_platforms)}
        {renderCategory("miscellaneous", rows.miscellaneous)}
        {renderCategory("platforms", rows.platforms)}
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "skills");