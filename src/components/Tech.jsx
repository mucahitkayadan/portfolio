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

  // Technologies
  docker,
  postgresql,
  mongodb,
  aws,
  ubuntu,
  powershell,
  azure,
  photoshop,
  premiere,
  cinema4d,
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
  { name: "CUDA", icon: cuda, url: "https://developer.nvidia.com/cuda-toolkit" },
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

const itTools = [
  { name: "Docker", icon: docker, url: "https://www.docker.com" },
  { name: "PostgreSQL", icon: postgresql, url: "https://www.postgresql.org" },
  { name: "MongoDB", icon: mongodb, url: "https://www.mongodb.com" },
  { name: "AWS", icon: aws, url: "https://aws.amazon.com" },
  { name: "Ubuntu", icon: ubuntu, url: "https://ubuntu.com" },
  { name: "PowerShell", icon: powershell, url: "https://docs.microsoft.com/powershell" },
  { name: "Azure", icon: azure, url: "https://azure.microsoft.com" },
];

const contentProduction = [
  { name: "Photoshop", icon: photoshop, url: "https://www.adobe.com/products/photoshop.html" },
  { name: "Premiere Pro", icon: premiere, url: "https://www.adobe.com/products/premiere.html" },
  { name: "Cinema 4D", icon: cinema4d, url: "https://www.maxon.net/cinema-4d" },
];

const Tech = () => {
  const [rows, setRows] = useState({
    programming: [],
    itTools: [],
    contentProduction: [],
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
        itTools: calculateRows(window.innerWidth, itTools),
        contentProduction: calculateRows(window.innerWidth, contentProduction),
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
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} text-center`}>Technical Proficiencies</p>
          <h2 className={`${styles.sectionHeadText} text-center`}>Skills</h2>
        </motion.div>
        {renderCategory("programming_languages", rows.programming_languages)}
        {renderCategory("machine_learning", rows.machine_learning)}
        {renderCategory("cloud_platforms", rows.cloud_platforms)}
        {renderCategory("itTools", rows.itTools)}
        {renderCategory("contentProduction", rows.contentProduction)}
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "skills");