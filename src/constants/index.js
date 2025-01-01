import {
  // Languages
  python, 
  mobile,
  github,
  backend,
  web,
  fullstack,
  placeholder,

  // Awards
  chess,
  tubitak,

  // Education
  miu,
  padua,
  aksaray,
  ventspils,

  // Work Experience
  goglobal,
  orsan,
  teknoworld,
  virac,

  // Projects
  resume_builder_tex,
  envmasker,
  wildlife_detector,
  chess_board,
  rf_energy_harvesting,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "education",
    title: "Education",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "skills",
    title: "Skills",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
  {
    id: "blog",
    title: "Blog",
    isExternal: true,
    path: "https://blog.mujakayadan.com"
  },
];

const services = [
  {
    title: "Software Engineer",
    icon: fullstack,
  },
  {
    title: "Machine Learning Engineer",
    icon: backend,
  },
  {
    title: "Computer Vision Engineer",
    icon: mobile,
  },
  {
    title: "Electrical Electronics Engineer",
    icon: web,
  },
];

const education = [
  {
    title: "Master's Degree in Computer Science",
    company_name: "Maharishi International University",
    icon: miu,
    iconBg: "#fff",
    date: "2023 - now",
    location: "Iowa, USA",
    description: "Currently pursuing my Master's in Computer Science with a focus on AI and Machine Learning. Maintaining strong academic performance while working on cutting-edge projects in artificial intelligence and web development.",
    gpa: "3.03",
    points: [
      "Artificial Intelligence",
      "Algorithms",
      "Fundamental Programming Practices",
      "Modern Programming",
      "Web Application Programming",
      "Software Architecture",
      "Big Data Analytics",
      "Cloud Computing",
    ],
  },
  {
    title: "Master's Degree in Computer and Information Sciences",
    company_name: "University of Padua", 
    icon: padua,
    iconBg: "#fff",
    date: "2021 - 2023",
    location: "Padua, Italy",
    description: "Completed my Master's with distinction, specializing in Computer Vision and Machine Learning. Engaged in advanced research projects and collaborated with international teams.",
    gpa: "3.70",
    points: [
      "Computer Vision",
      "Digital And Interactive Multimedia",
      "Digital Signal Processing",
      "Game Theory",
      "Human Data Analytics",
      "Machine Learning", 
      "Network Science",
      "Telecommunication Principles (I.C.)",
      "History Of Animation",
      "Human Computer Interaction",
      "Web Applications",
      "Relational Marketing",
      "Internet Of Things And Smart Cities",
      "Organization Development And Behaviour",
      "Project Management",
      "Internship",
      "English Language B2",
      "Final Project",
    ],
  },
  {
    title: "Master's Degree in Electrical Electronics Engineering",
    company_name: "Aksaray University",
    icon: aksaray,
    iconBg: "#fff", 
    date: "2019 - 2021",
    location: "Aksaray, Turkey",
    description: "Completed my Master's with distinction, specializing in Computer Vision and Machine Learning. Engaged in advanced research projects and collaborated with international teams.",
    gpa: "3.79",
    points: [
      "Mobile Robots: Models and Algorithms",
      "Machine Learning Theory",
      "Optical Wireless Communication",
      "VLSI Design",
    ],
  },
  {
    title: "Bachelor's Degree (Exchange) in Computer and Information Sciences",
    company_name: "Ventspils University College",
    icon: ventspils,
    iconBg: "#fff",
    date: "2018",
    location: "Ventspils, Latvia", 
    description: "Completed my Bachelor's with distinction, specializing in Computer Vision and Machine Learning. Engaged in advanced research projects and collaborated with international teams.",
    gpa: "3.68",
    points: [
      "Optimisation Methods",
      "Programming I",
      "Object Oriented Programming", 
      "English For Engineers II",
      "Optics And Optoelectronics",
      "Antenna Theory",
      "Circuit Theory I",
      "Electronics And Manufacturing Technology",
      "Electronic Circuit Design",
      "Semiconductor Electronics",
    ],
  },
  {
    title: "Bachelor's Degree in Electrical Electronics Engineering",
    company_name: "Aksaray University",
    icon: aksaray,
    iconBg: "#fff",
    date: "2015 - 2019",
    location: "Aksaray, Turkey",
    description: "Completed my Bachelor's with distinction, specializing in Computer Vision and Machine Learning. Engaged in advanced research projects and collaborated with international teams.",
    gpa: "3.68",
    points: [
      "Introduction To Electrical-Electronics Engineering",
      "Information Technologies And Their Applications",
      "Introduction To Algorithms And Programming",
      "Physics I",
      "English I",
      "Chemistry I", 
      "Mathematics I",
      "Turkish Language I",
      "Ee & Computer Hobby Applications",
      "Structured Programming",
      "Academic Presentation Techniques",
      "General Physics II",
      "English Language II",
      "Mathematics II",
      "Linear Algebra",
      "Turkish Language II",
      "History Of Revolution And Ataturk's Principles I",
      "Electrical Circuits I",
      "Electromagnetic Fields Theory",
      "Electrical Circuits Lab I",
      "Discrete Structures",
      "Data Structures",
      "Extracurricular Activities I",
      "Occupational Health And Safety I",
      "Differential Equations",
      "History Of Revolution And Ataturk's Principles II",
      "Electrical Circuits II",
      "Electromagnetic Wave Theory",
      "Electrical Circuits Lab II",
      "Logic Circuits",
      "Materials Knowledge",
      "Probability And Statistics",
      "Extracurricular Activities II",
      "Occupational Health And Safety II",
      "Summer Practice I",
      "Signals And Systems",
      "Electronics I",
      "Electronics Lab I",
      "Electrical Machinery Lab I",
      "Electric Transmission Systems",
      "Electrical Machinery I",
      "Electronic Signature And Security",
      "Computer Architecture",
      "Photonics I",
      "Analogue Communication",
      "Electronics II",
      "Electronics Lab II",
      "Electrical Machinery Lab II",
      "High Voltage Technique",
      "Electrical Machinery II",
      "Introduction To Control Systems",
      "Summer Practice II",
      "Applications Of Geography Information System",
      "Digital Signal Processing",
      "Digital Communication",
      "Lasers I",
      "Artificial Intelligence",
      "Ecology",
      "Cmmi (Talent Model Integration)",
      "Graduation Project I",
      "Engineering Equipment",
      "Antennas And Spreading",
      "Optoelectronic",
      "Design Algorithm",
      "Object-Oriented Software Development",
      "Graduation Project II",
    ],
  },
];

const experiences = [
  {
    title: "Machine Learning Engineer",
    company_name: "Go Global World Inc.",
    icon: goglobal,
    iconBg: "#fff",
    date: "Mar 2024 - Present",
    location: "Remote",
    description: "Go Global World is a platform that connects investors with startups. I am working on the AI team to develop AI-powered solutions for investor-founder matching and automated due diligence processes.",
    points: [
      "Architected and implemented an investor-founder matching system leveraging advanced similarity measures and vector embeddings for optimized performance.",
      "Developed a chatbot powered by LangChain and RAG, integrating OpenAI APIs for seamless personalized query resolution and information retrieval.",
      "Optimized search performance using Faiss and custom-built vector similarity ranking models, ensuring high-speed and accurate investor-startup matches.",
      "Designed and automated an MLOps pipeline on Digital Ocean using Kubernetes for container orchestration and MongoDB for scalable data storage.",
      "Integrated machine learning models with Pinecone and Weaviate vector databases, streamlining search workflows and reducing API latency.",
      "Fine-tuned the Llama 3.1 model for natural language understanding tasks, implementing low-rank adaptation (LoRA) for efficient fine-tuning at scale.",
      "Engineered a robust data preprocessing pipeline with feature scaling, normalization, and embedding generation for high-dimensional data.",
      "Collaborated with DevOps teams to implement CI/CD pipelines for machine learning models, achieving continuous delivery and reliable deployments.",
      "Monitored production ML systems with Prometheus and Grafana, ensuring uptime and identifying bottlenecks in real-time.",
      "Performed advanced exploratory data analysis using Python and SQL, uncovering actionable insights into user engagement patterns and system performance."
    ],
  },
  {
    title: "R&D Machine Learning Engineer",
    company_name: "Orsan (Mercedes-Benz Turk A.S)",
    icon: orsan,
    iconBg: "#fff", 
    date: "Jan 2020 - May 2021",
    location: "Aksaray, Turkey",
    description: "Orsan is a company that manufactures automotive parts for / under Mercedes-Benz. I worked on the R&D team to develop computer vision solutions for steel welding quality control.",
    points: [
      "Developed a custom computer vision pipeline using U-Net architectures for detecting welding defects with pixel-level accuracy.",
      "Integrated PLC data streams with deep learning models to create predictive maintenance systems, leveraging PyTorch for model training and evaluation.",
      "Built real-time quality control frameworks using OpenCV, ensuring precise defect identification during laser welding processes.",
      "Designed convolutional neural networks (CNNs) for defect classification, utilizing transfer learning to improve accuracy with limited labeled data.",
      "Optimized edge inference by deploying TensorRT-accelerated models on NVIDIA Jetson devices, enabling real-time feedback in manufacturing lines.",
      "Implemented advanced image preprocessing techniques, including histogram equalization and edge detection, to improve model robustness.",
      "Configured Docker-based containerized deployments for ML workflows, ensuring consistent performance across different manufacturing environments.",
      "Performed hyperparameter tuning with Bayesian optimization to enhance defect detection model precision and recall scores.",
      "Collaborated with production engineers to integrate ML pipelines with SCADA systems for comprehensive manufacturing monitoring.",
      "Conducted periodic performance audits to ensure model alignment with evolving manufacturing requirements and industry standards.",
    ],
  },
  {
    title: "Application Engineer",
    company_name: "TeknoWorld GmbH",
    icon: teknoworld,
    iconBg: "#1294C8", 
    date: "Jun 2019 - Dec 2019",
    location: "Dusseldorf, Germany",
    description: "TeknoWorld is a company that provides security solutions for variety of clients, such as houses, supermarkets and embassies. I worked on the R&D team to develop computer vision solutions for security cameras.",
    points: [
      "Deployed AI-powered computer vision solutions using YOLO for object detection and deep learning for image analytics, improving surveillance efficiency.",
      "Configured smart camera systems leveraging Dahua SDKs for real-time video processing and anomaly detection in high-security environments.",
      "Designed end-to-end AI solutions incorporating TensorFlow Lite for edge processing, reducing latency and enhancing data privacy.",
      "Implemented secure communication protocols using AES-256 encryption to ensure data integrity in surveillance systems.",
      "Optimized surveillance analytics by developing real-time alert generation modules using Kafka for scalable event streaming.",
      "Collaborated with cross-functional teams to develop RESTful APIs for integrating AI systems with client applications.",
      "Engineered robust pipelines for data preprocessing, including video segmentation and feature extraction, ensuring high model reliability.",
      "Conducted detailed system analyses to align AI solutions with client requirements, enhancing operational scalability and customization.",
      "Led on-site installations and system testing, ensuring flawless deployment and immediate operational readiness for clients.",
      "Utilized JIRA for task management and documentation, streamlining project tracking and ensuring timely delivery of technical solutions."
    ],
  },
  {
    title: "Software Engineer",
    company_name: "Ventspils International Radio-Astronomy Center",
    icon: virac,
    iconBg: "#fff",
    date: "Jun 2018 - Oct 2018",
    location: "Ventspils, Latvia",
    description: "Ventspils International Radio-Astronomy Center is the 8th largest radio telescope in the world. I worked on the R&D team to develop software solutions for radio astronomy.",
    points: [
      "Developed GUIs for RF transceivers using PyQt5, enabling real-time interaction with hardware systems and efficient data visualization.",
      "Implemented real-time signal visualization features using Matplotlib and NumPy, providing actionable insights into RF system performance.",
      "Enhanced user workflows by designing modular GUI components, streamlining complex operations and reducing system downtime.",
      "Integrated logging mechanisms using Python logging libraries, facilitating detailed diagnostics and performance monitoring for RF systems.",
      "Developed automated GUI testing scripts with Selenium, ensuring reliability across various configurations and usage scenarios.",
      "Collaborated with RF hardware engineers to align software functionalities with operational requirements, enabling seamless integration.",
      "Optimized GUI performance by profiling and refactoring code, achieving a 30% reduction in resource consumption during peak operations.",
      "Deployed GUIs on multi-platform environments, ensuring compatibility with both Linux and Windows operating systems.",
      "Implemented socket-based communication protocols for interfacing GUIs with RF hardware in real-time operations.",
      "Documented workflows and user guides to enhance onboarding for future engineers, improving long-term project sustainability."
    ],
  },
];

const awards = [
  {
    title: "68th Iowa Reserve Chess Championship Winner",
    type: "Chess Competition",
    icon: chess,
    iconBg: "#000000", 
    date: "Aug 2023",
    description: "Issued by Iowa State Chess Association, 4 Rounds G/60 d5"
  },
  {
    title: "High Honors Degree",
    type: "Academic Achievement",
    icon: aksaray,
    iconBg: "#FFFFFF",
    date: "Jun 2019",
    description: "Awarded to Bachelor alumni who have graduated with a 3.60 GPA as 3rd of the faculty by Aksaray University"
  },
  {
    title: "TUBITAK Scientist Support Programs Presidency Winner",
    type: "Research Competition",
    icon: tubitak,
    iconBg: "#050C18",
    date: "Jun 2019", 
    description: "\"Egg Sex Classification with Morphological Methods\" at the Food and Agriculture Category of 2242-University Students Research Project Competitions organized by TUBITAK Scientist Support Programs Presidency won the first prize in the Kayseri Regional Exhibition"
  },
  {
    title: "University of Padua Scholarship",
    type: "Academic Scholarship",
    icon: padua,
    iconBg: "#CCCFD8",
    date: "Sep 2021 - Sep 2023",
    description: "Awarded to graduate students who have been successful in the educational and professional area. Fee waiver + 7000 Euro / year grant"
  }
];

const projects = [
  {
    name: "Dynamic Resume Generator",
    description: 
      "Developed a Streamlit-based web application that generates tailored resumes based on user-provided job descriptions. Implemented an AI-powered system using OpenAI's API to process and optimize resume content for specific job requirements. Created a modular architecture with separate loaders for JSON data, LaTeX templates, and prompts, enhancing maintainability and scalability. Utilized natural language processing techniques to analyze job descriptions and extract key requirements for resume customization.",
    tags: [
      {
        name: "Streamlit",
        color: "blue-text-gradient",
      },
      {
        name: "OpenAI",
        color: "green-text-gradient",
      },
      {
        name: "LaTeX",
        color: "pink-text-gradient",
      },
    ],
    image: resume_builder_tex,
    source_code_link: "https://github.com/mucahitkayadan/Resume-Builder-TeX",
    live_project_link: "https://github.com/mucahitkayadan/Resume-Builder-TeX",
  },
  {
    name: "Fairfield Wildlife Surveillance",
    description: 
      "Implemented YOLOv8 object detection on Raspberry Pi4 and RoboFlow server, achieving 95% F1 score for wildlife surveillance. Developed website for customizable animal detection settings, including class selection and confidence threshold adjustment. Created database for animal info storage, video capture, and heatmap generation to track wildlife patterns. Optimized real-time detection and tracking of multiple animal species in diverse environments. Integrated analytics tools for insights on wildlife behavior and population trends. Designed user-friendly mobile app for remote monitoring and system control. Collaborated with experts to improve detection accuracy for region-specific animal species.",
    tags: [
      {
        name: "YOLOv8",
        color: "blue-text-gradient",
      },
      {
        name: "Raspberry Pi",
        color: "green-text-gradient",
      },
      {
        name: "Computer Vision",
        color: "pink-text-gradient",
      },
      {
        name: "IoT",
        color: "blue-text-gradient",
      },
    ],
    image: wildlife_detector,
    source_code_link: "https://github.com/mucahitkayadan",
    live_project_link: "https://github.com/mucahitkayadan",
  },
  {
    name: "EnvMasker",
    description: 
      "Developed a tool to mask .env file values with asterisks to protect sensitive information. Implemented using Java with Docker containerization for enhanced deployment. Features include user-friendly interface, comprehensive unit tests, efficient handling of large files, and seamless logging. Contributed to open-source community via GitHub.",
    tags: [
      {
        name: "Java",
        color: "blue-text-gradient",
      },
      {
        name: "Docker",
        color: "green-text-gradient",
      },
      {
        name: "Security",
        color: "pink-text-gradient",
      }
    ],
    image: envmasker,
    source_code_link: "https://github.com/mucahitkayadan",
    live_project_link: "https://github.com/mucahitkayadan",
  },
  {
    name: "LLM Chess Evaluation",
    description:
      "Developed a chess playing benchmark framework for evaluating large language models (LLMs) using Python. Created comprehensive evaluation metrics and visualization tools for assessing LLM performance against standard chess engines. Implemented automated benchmarking with support for multiple LLMs and detailed analysis of game outcomes. Shared as open-source project with extensive documentation.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "LLM",
        color: "green-text-gradient",
      },
      {
        name: "Chess",
        color: "pink-text-gradient",
      },
      {
        name: "Benchmarking",
        color: "blue-text-gradient",
      }
    ],
    image: chess_board,
    source_code_link: "https://github.com/mucahitkayadan",
    live_project_link: "https://github.com/mucahitkayadan",
  },
  {
    name: "RF Energy Harvesting Circuit",
    description: 
      "Developed RF energy harvesting system using custom antenna designs and rectifier circuits. Implemented Schottky diode rectification, optimized impedance matching, and integrated LTC3108-1 DC converter for efficient low-power energy management.",
    tags: [
      {
        name: "RF",
        color: "blue-text-gradient",
      },
      {
        name: "CST",
        color: "green-text-gradient",
      },
      {
        name: "ADS",
        color: "pink-text-gradient",
      }
    ],
    image: rf_energy_harvesting,
    source_code_link: "https://github.com/mucahitkayadan",
    live_project_link: "https://github.com/mucahitkayadan",
  },
  {
    name: "Fit Coach with OmniPose and Palm",
    description:
      "Developed fitness system with personalized diet plans and workouts using OpenAI API. Integrated features for dietary preferences and fitness goals, ensuring customized user experience. Implemented pose estimation and sensor data analysis for real-time exercise performance assessment. Provided actionable insights and corrections on proper form and technique during exercises.",
    tags: [
      {
        name: "OpenAI API",
        color: "blue-text-gradient",
      },
      {
        name: "OmniPose",
        color: "green-text-gradient",
      },
      {
        name: "Palm API",
        color: "pink-text-gradient",
      },
      {
        name: "Pose Estimation",
        color: "blue-text-gradient",
      },
    ],
    image: placeholder,
    source_code_link: "https://github.com/mucahitkayadan",
    live_project_link: "https://github.com/mucahitkayadan",
  },
  {
    name: "Mortal Combat Game Controller Using Kinect v2 and Kinect SDK",
    description:
      "Developed app using Kinect v2 and SDK for camera-based game control via pose detection. Implemented 14 control key bindings mapped to human poses for seamless game interaction. Used pose detection algorithms to classify 14 distinct poses for intuitive gameplay control. Enhanced gaming with novel, immersive control using motion and gesture recognition.",
    tags: [
      {
        name: "Kinect v2",
        color: "blue-text-gradient",
      },
      {
        name: "Kinect SDK",
        color: "green-text-gradient",
      },
      {
        name: "Pose Detection",
        color: "pink-text-gradient",
      },
      {
        name: "Motion Control",
        color: "blue-text-gradient",
      },
    ],
    image: placeholder,
    source_code_link: "https://github.com/mucahitkayadan",
    live_project_link: "https://github.com/mucahitkayadan",
  },
  {
    name: "NFS Most Wanted Self-Driving Car with OpenCV and TensorFlow",
    description:
      "Developed self-driving car system for NFS Most Wanted using OpenCV and TensorFlow. Implemented computer vision for line and lane detection, enabling in-lane navigation. Used object detection to track vehicles and pedestrians, avoiding collisions. Integrated adaptive speed control for safer cornering and improved maneuverability. Created immersive self-driving experience showcasing CV and ML in virtual environments.",
    tags: [
      {
        name: "OpenCV",
        color: "blue-text-gradient",
      },
      {
        name: "TensorFlow", 
        color: "green-text-gradient",
      },
      {
        name: "Computer Vision",
        color: "pink-text-gradient",
      },
      {
        name: "Machine Learning",
        color: "blue-text-gradient",
      }
    ],
    image: placeholder,
    source_code_link: "https://github.com/mucahitkayadan",
    live_project_link: "https://github.com/mucahitkayadan",
  },
  {
    name: "Raspberry Pi-based Wild Boar Detection System for Corn Fields",
    description: 
      "Developed YOLO5 object detection model for wild boars, addressing crop threats. Used Raspberry Pi4, sensors, and peripherals for a comprehensive detection system. Created system to emit noise, activate lights, capture video, and send alerts upon detection. Achieved high-accuracy real-time boar detection, minimizing false positives. Designed user-friendly interface for remote system monitoring and control.",
    tags: [
      {
        name: "YOLO5",
        color: "blue-text-gradient",
      },
      {
        name: "Raspberry Pi",
        color: "green-text-gradient", 
      },
      {
        name: "Object Detection",
        color: "pink-text-gradient",
      },
      {
        name: "IoT",
        color: "blue-text-gradient",
      }
    ],
    image: placeholder,
    source_code_link: "https://github.com/mucahitkayadan",
    live_project_link: "https://github.com/mucahitkayadan",
  },
  {
    name: "Image Stitching with OpenCV - C++",
    description:
      "Conducted image stitching using C++ and OpenCV, focusing on challenges of stitching numerous images. Developed system for seamlessly combining multiple image pieces into cohesive panoramas. Implemented keypoint, feature, and descriptor-based techniques for high-quality image stitching. Used SLAM algorithm to create maps from videos, especially drone footage, enhancing versatility. Optimized real-time stitching of high-res images, reducing processing time by 40%. Implemented multi-threading to parallelize image processing, improving efficiency. Developed user-friendly interface for easy configuration of stitching parameters. Integrated error handling and quality assessment for robust performance across inputs.",
    tags: [
      {
        name: "C++",
        color: "blue-text-gradient",
      },
      {
        name: "OpenCV",
        color: "green-text-gradient",
      },
      {
        name: "SLAM",
        color: "pink-text-gradient",
      },
      {
        name: "Image Processing",
        color: "blue-text-gradient",
      },
    ],
    image: placeholder,
    source_code_link: "https://github.com/mucahitkayadan",
    live_project_link: "https://github.com/mucahitkayadan",
  },
  {
    name: "Sex Classification by Egg Shape: Deep Learning and Image Processing Analysis",
    description:
      "Developed egg shape tech to determine gender pre-incubation, addressing mass culling of male chicks. Applied ML and image processing for 91% accuracy across chicken breeds. Won scientific award, led to startup in Ireland. Published in Nature - Scientific Reports. Secured $20,000 funding from research councils in Turkey and Ireland. Used computer vision to extract egg shape features, boosting accuracy by 15%. Created user-friendly interface for farmers to integrate tech into incubation. Conducted field trials on poultry farms, validating real-world effectiveness. Worked with ethics committees to align tech with animal welfare standards.",
    tags: [
      {
        name: "Deep Learning",
        color: "blue-text-gradient",
      },
      {
        name: "Computer Vision", 
        color: "green-text-gradient",
      },
      {
        name: "Image Processing",
        color: "pink-text-gradient",
      },
    ],
    image: placeholder,
    source_code_link: "https://github.com/mucahitkayadan",
    live_project_link: "https://github.com/mucahitkayadan",
  },
  {
    name: "Mountain Climber Assistant",
    description:
      "Designed system to detect climber actions using sensors in custom devices for enhanced mountaineering safety. Developed project architecture, aligning requirements with objectives for climber safety and performance tracking. Engineered compact device for vital signs and location monitoring, using RF tech for remote terrain tracking. Secured $20,000 funding, demonstrating project's significance for mountain climbing safety advancements. Implemented ML algorithms, achieving 95% precision in action classification for accurate climber monitoring. Optimized power consumption, extending device battery life to 72 hours for long climbing expeditions. Integrated emergency alert system, reducing response time to critical situations by 40% for improved safety.",
    tags: [
      {
        name: "IoT",
        color: "blue-text-gradient",
      },
      {
        name: "Machine Learning",
        color: "green-text-gradient",
      },
      {
        name: "Embedded Systems",
        color: "pink-text-gradient",
      },
    ],
    image: placeholder,
    source_code_link: "https://github.com/mucahitkayadan",
    live_project_link: "https://github.com/mucahitkayadan",
  },
  {
    name: "Steel Sheet Washing Machine with Siemens S7 PLC",
    description:
      "Designed steel sheet washing machine using Siemens S7 PLC for efficient industrial cleaning. Implemented control logic for oily surface removal, improving product quality. Integrated sensors and actuators for precise washing process control and monitoring. Developed HMI for operator control and real-time performance monitoring. Optimized washing for minimal water and energy use while maintaining high efficiency. Implemented safety features to comply with industrial standards and regulations. Designed modular architecture for easy maintenance and future upgrades.",
    tags: [
      {
        name: "PLC",
        color: "blue-text-gradient",
      },
      {
        name: "Industrial Automation",
        color: "green-text-gradient",
      },
      {
        name: "HMI",
        color: "pink-text-gradient",
      },
    ],
    image: placeholder,
    source_code_link: "https://github.com/mucahitkayadan",
    live_project_link: "https://github.com/mucahitkayadan",
  },
  {
    name: "Esty Mate: Real-Time Multiplayer Estimation Game",
    description:
      "Built a real-time multiplayer estimation game app using Flask, Flask-SocketIO, and PostgreSQL. Created 5000 estimation structured questions and with OpenAI API. Implemented secure user authentication with Flask-Login for registration, login, and logout. Designed a dynamic question database with SQLAlchemy for random, culturally relevant questions. Utilized WebSockets for real-time game events like joining rooms, starting games, and updating scores. Adopted an application factory pattern for scalability and maintainability.",
    tags: [
      {
        name: "Flask",
        color: "blue-text-gradient",
      },
      {
        name: "WebSocket",
        color: "green-text-gradient",
      },
      {
        name: "PostgreSQL",
        color: "pink-text-gradient",
      },
    ],
    image: placeholder,
    source_code_link: "https://github.com/mucahitkayadan",
    live_project_link: "https://github.com/mucahitkayadan",
  },
  {
    name: "Patently: AI-Powered Patent Search and Analysis",
    description:
      "Architected a patent analysis platform utilizing fine-tuned Llama 3.1 for semantic search and prior art retrieval, streamlining IP workflows. Engineered a vector-based similarity ranking system with Faiss, enabling rapid retrieval of relevant patents from a large-scale database. Designed a modular pipeline for user-generated idea prompts, integrating NLP models to produce detailed patent analysis reports. Developed an automated patent application generator with advanced NLP techniques, enhancing accuracy and reducing manual intervention.",
    tags: [
      {
        name: "NLP",
        color: "blue-text-gradient",
      },
      {
        name: "LLM",
        color: "green-text-gradient",
      },
      {
        name: "Vector Search",
        color: "pink-text-gradient",
      },
    ],
    image: placeholder,
    source_code_link: "https://github.com/mucahitkayadan",
    live_project_link: "https://github.com/mucahitkayadan",
  },
  {
    name: "MyCTO: AI-Powered CTO for Startups",
    description:
      "Architected an AI-powered CTO platform using fine-tuned transformer models to evaluate startup technical requirements and offer strategic guidance. Developed intelligent project analysis workflows leveraging Llama 3.1 to align budget constraints with scalable technical solutions. Engineered a developer-matching system integrating graph databases and embeddings for precise skill-to-project alignment. Designed a scalable talent-matching engine using Pinecone for vector search, optimizing developer selection for technical roles.",
    tags: [
      {
        name: "LLMs",
        color: "blue-text-gradient",
      },
      {
        name: "Vector Search",
        color: "green-text-gradient", 
      },
      {
        name: "AWS",
        color: "pink-text-gradient",
      },
    ],
    image: placeholder,
    source_code_link: "https://github.com/mucahitkayadan",
    live_project_link: "https://github.com/mucahitkayadan",
  },
  {
    name: "AR Marble Visualization System",
    description:
      "Developed an advanced in-home AR application for Tez Marble, allowing users to scan rooms and visualize custom marble surfaces in real time with high fidelity. Integrated Matterport Showcase SDK with SLAM for precise 3D room scanning and NVIDIA Instant NeRF for rapid neural rendering, enabling life-like previews. Utilized a high-performance hardware stack for NeRF processing, incorporating NVIDIA RTX A6000 GPUs for accelerated neural rendering and Tensor Cores for optimized AI inference.",
    tags: [
      {
        name: "AR",
        color: "blue-text-gradient",
      },
      {
        name: "NeRF",
        color: "green-text-gradient",
      },
      {
        name: "WebGL",
        color: "pink-text-gradient",
      },
    ],
    image: placeholder,
    source_code_link: "https://github.com/mucahitkayadan", 
    live_project_link: "https://github.com/mucahitkayadan",
  },
  {
    name: "BMS and Battery Package Systems for Nenessa Electric Car",
    description:
      "Led battery team for TUBITAK Efficiency Challenge, implementing BMS with STM32F030 and designing battery pack for 3kW 60V Kelly motor controller. Optimized battery management algorithms, integrated real-time monitoring, and created custom UI for diagnostics.",
    tags: [
      {
        name: "STM32",
        color: "blue-text-gradient",
      },
      {
        name: "BMS",
        color: "green-text-gradient", 
      },
      {
        name: "LiFePo4",
        color: "pink-text-gradient",
      }
    ],
    image: placeholder,
    source_code_link: "https://github.com/mucahitkayadan",
    live_project_link: "https://github.com/mucahitkayadan",
  },
];

const testimonials = [
  {
    testimonial:
      "I highly recommend Sunny for his outstanding technical proficiency and professional approach as a System Support specialist at Mackenzie Hospital. His deep knowledge of iPad systems and troubleshooting abilities were instrumental in ensuring seamless operations and user satisfaction. Sunny's proactive attitude and problem-solving skills made him a reliable asset to our team, and he consistently exceeded expectations in resolving complex issues. I have no hesitation in endorsing him for any tech-related position, as I am confident he will excel in any challenge he takes on.",
    name: "Feda Abukhadrah, BIT | SaaS | Health Tech | MDM | ABM | POS | ITIL®V4 | CompTIA A+",
    designation: "Senior Service Desk Specialist",
    company: "Px Solutions LTD.",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "Sunny Patel's expertise in the technological domain is truly remarkable. Proficient in programming languages like Java, Python, and C++, and highly skilled in Microsoft's suite of tools, Sunny's grasp of networking concepts is extensive. What sets him apart is his experience in handling over 1000 devices remotely and on-site, along with a successful track record in troubleshooting and deploying various software and hardware upgrades. His dedication to tackling complex challenges, grounded in a strong foundation in software design and a rich academic background in computer science, positions Sunny as a valuable asset to any tech-driven team.",
    name: "Sanjay Sharma, MBA, CISSP, CISA, PMP®",
    designation: "Senior Vice-President and Head of Cybersecurity Services",
    company: "Pathway Communications / ex-Toronto Hydro",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "Sunny's proficiency in data entry was impeccable, displaying meticulous attention to detail and accuracy. His commitment to maintaining organized and error-free records significantly improved our operational efficiency. In customer service, Sunny's phone etiquette was truly commendable. He communicated with a warm and professional demeanour, leaving customers with a positive impression and ensuring their needs were met. His ability to multitask and handle multiple customers simultaneously was impressive, showcasing his excellent time management and interpersonal skills. Sunny's dedication to his role and adeptness in data entry, customer service, and managing simultaneous customer interactions made him a valuable asset to our team at Lazer Runner.",
    name: "Michelle Ilizirov",
    designation: "Manager",
    company: "Lazer Runner",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

export {
  services,
  experiences,
  awards,
  projects,
  education,
  testimonials
};
