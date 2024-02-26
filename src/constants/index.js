import {
  mobile,
  backend,
  web,
  fullstack,
  javascript,
  java,
  html,
  css,
  reactjs,
  ubuntu,
  tailwind,
  mysql,
  linux,
  git,
  samaritans,
  oist,
  nextinnovation,
  cognizant,
  internshala,
  linkedin,
  hackerrank,
  karate,
  portfolio,
  pglife,
  sortingvisualiser,
  aws,
  python,
  cplusplus,
  typescript,
  node_js,
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
    id: "extracurricular",
    title: "Certifications",
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
];

const services = [
  {
    title: "Software Developer",
    icon: fullstack,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Frontend Developer",
    icon: mobile,
  },
  {
    title: "Web Developer",
    icon: web,
  },
];

const education = [
  {
    title: "Honours Computer Science (H. BSc)",
    company_name: "Ontario Tech University, Oshawa, ON",
    icon: oist,
    iconBg: "#fff",
    date: "2022 - Present",
    points: [
      "Courses undertaken: Data Structures and Algorithms, Object-Oriented Programming, REST API Development and Integration, Software Design UML, Python Data Analysis, Discrete Mathematics, Computer Architecture, Operating Systems, Database Systems, Software Engineering.",
    ],
  },
  {
    title: "High School",
    company_name: "Richmond Hill High School, ON",
    icon: samaritans,
    iconBg: "#fff",
    date: "2018-2022",
    points: [
      "Achievements: Valedictorian, Ontario Scholar",
      "Percentage: 96%",
      ,
    ],
  },
];

const technologies = [
  {
    name: "Java",
    icon: java,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "C++",
    icon: cplusplus,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "Typescript",
    icon: typescript,
  },
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Ubuntu",
    icon: ubuntu,
  },
  {
    name: "NodeJS",
    icon: node_js,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "AWS",
    icon: aws,
  },
];

const experiences = [
  {
    title: "IT Technician - L3",
    company_name: "Canada's Wonderland",
    icon: cognizant,
    iconBg: "#fff",
    date: "Jun 2023 - Present",
    points: [
      "Managed Tier 1-3/L3 device management and deployment for 1500+ devices park-wide.",
      "Extensively utilized PowerShell scripting for server drive mapping, storage management, and mass changes to remote workstations.",
      "Utilized Oracle EMC and Symphony for POS/KDS system deployment and management.",
      "Administered Cisco CUCM for VOIP line configuration and Cisco ASA/Palo Alto Firewall technologies for secure connections.",
      "Ran Ethernet cables/patching and ensured LAN functionality by closely monitoring with LinkRunner AT/IntelliTone.",
      "Implemented LAN/WAN framework with Cisco routers, switches, and catalysts, ensuring seamless park-wide network functionality.",
      "Managed RSAT and Domain integration in systems including AD(LDAP), GP, FTP, NAS/SAN, AP Clusters, Bitlocker.",
      "Perform remote control and management using Connectwise/VNC/PS.",
  ],
  },
  {
    title: "System Support Specialist - L2",
    company_name: "Mackenzie Health Hospital",
    icon: nextinnovation,
    iconBg: "#fff",
    date: "Jan 2023 - Aug 2023 (8 mos.)",
    points: [
      "Supported 300+ bedside iPads/tablets for premium services and managed device configuration through remote portal access.",
      "Contributed to software development and system maintenance using Java, Python, and SQL.",
      "Worked on system maintenance for Mackenzie Health's IT infrastructure, spanning Citrix, VMware, VDI, Hyper-V, ESXi technologies.",
      "Optimized entertainment app efficiency by 25%, providing IPTV service, VOIP, movie service, games, and meal ordering.",
      "Conducted CLI scripting for system services resolution and comprehensive audits for bedside application code pushes.",
      "Leveraged Cortex XDR for monitoring network traffic and detecting malicious malware reports.",
    ],
  },
  {
    title: "Junior Systems Administrator",
    company_name: "Privcurity Consulting Corporation",
    icon: internshala,
    iconBg: "#1294C8",
    date: "May 2021 - Sep 2021 (5 mos.)",
    points: [
      "Managed virtual machines on Azure AD domain and implemented malware prevention measures.",
      "Conducted routine software updates and cloud file management with SSH, utilizing Python and SQL for analysis.",
      "Configured firewalls and monitored web traffic security using Wireshark/tcpdump.",
      "Monitored 2FA protocols and collaborated in deploying DDOS attack prevention measures.",
      "Maintained Privacy Security Architecture (PSA) systems for compliant data handling and protection.",
    ],
  },
];

const extracurricular = [
  {
    title: "Google IT Automation With Python",
    type: "Professional Certificate (600+ hours)",
    icon: hackerrank,
    iconBg: "#050C18",
    date: "Mar 2023",
    points: [
      "Configuration Management, Automation, Google Cloud Platform (GCP), Cloud Servers and VM's, Version Control Tools, Automation.",
    ],
    credential: "https://www.coursera.org/account/accomplishments/specialization/certificate/82SZFUWF4B3T",
  },
  {
    title: "Scientific Computing with Python",
    type: "Certification",
    icon: internshala,
    iconBg: "#1294C8",
    date: "Mar 2023",
    points: ["Arithmetic Formatter, Time Calculator, Budget App, Polygon Area Calculator, Probability Calculator"],
    credential:
      "https://www.freecodecamp.org/certification/sunnypatell/scientific-computing-with-python-v7",
  },
  {
    title: "WHMIS (Worker Health and Safety)",
    type: "Government Workforce Requirement",
    icon: karate,
    iconBg: "#CCCFD8",
    date: "Sep 2020",
    points: ["Hazard Awareness, Legal Compliance, Personal Protection, Accident Prevention"],
  },
];

const projects = [
  {
    name: "Sunnify (Spotify Downloader)",
    description:
      "Sunnify is a Spotify downloader application that allows you to download entire playlists locally onto your Mac/Linux/Windows PC.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "webscraping",
        color: "green-text-gradient",
      },
      {
        name: "pyqt5",
        color: "pink-text-gradient",
      },
      {
        name: "(EDUCATIONAL PURPOSES ONLY)",
        color: "blue-text-gradient",
      },
    ],
    image: portfolio,
    source_code_link: "https://github.com/sunnypatell/sunnify-spotify-downloader",
    live_project_link: "https://github.com/sunnypatell/sunnify-spotify-downloader",
  },
  {
    name: "PG Life",
    description:
      "The PG-Life Web Application is a platform designed to facilitate the management and search for Paying Guest (PG) accommodations. It allows users to explore available PG options, view details, and connect with potential landlords or tenants.",
    tags: [
      {
        name: "html",
        color: "blue-text-gradient",
      },
      {
        name: "css",
        color: "green-text-gradient",
      },
      {
        name: "bootstrap",
        color: "pink-text-gradient",
      },
      {
        name: "javascript",
        color: "green-text-gradient",
      },
    ],
    image: pglife,
    source_code_link: "https://github.com/mohitrajput2002/PG_Life",
    live_project_link: "https://github.com/mohitrajput2002/PG_Life",
  },
  {
    name: "Sorting Visualizer",
    description:
      "The Sorting Visualizer is a web application that provides a visual representation of various sorting algorithms. It allows users to observe and understand how different sorting algorithms work by animating the sorting process.",
    tags: [
      {
        name: "html",
        color: "blue-text-gradient",
      },
      {
        name: "css",
        color: "green-text-gradient",
      },
      {
        name: "javascript",
        color: "pink-text-gradient",
      },
      {
        name: "bootstrap",
        color: "blue-text-gradient",
      },
    ],
    image: sortingvisualiser,
    source_code_link:
      "https://github.com/mohitrajput2002/sorting-visualizer-project.github.io.git",
    live_project_link: "https://sorting-visuallizer.netlify.app/",
  },
];

export {
  services,
  technologies,
  experiences,
  extracurricular,
  projects,
  education,
};
