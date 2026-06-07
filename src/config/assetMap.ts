import {
  placeholder,
  chess,
  tubitak,
  miu,
  padua,
  aksaray,
  ventspils,
  tesla,
  dopple,
  goglobal,
  orsan,
  teknoworld,
  virac,
  resume_builder_tex,
  envmasker,
  wildlife_detector,
  chess_board,
  rf_energy_harvesting,
  profilepic,
  python,
  java,
  cplusplus,
  matlab,
  octave,
  c,
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
  arduino,
  esp32,
  jetson,
  raspberrypi,
  stm32,
} from '../assets';

export const DEFAULT_PROFILE_PICTURE = profilepic;
export const DEFAULT_PROJECT_IMAGE = placeholder;

const TAG_COLORS = ['blue-text-gradient', 'green-text-gradient', 'pink-text-gradient'] as const;

export const normalizeKey = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const companyIconEntries: Array<[string, string]> = [
  ['maharishi international university', miu],
  ['university of padua', padua],
  ['aksaray university', aksaray],
  ['ventspils university college', ventspils],
  ['tesla', tesla],
  ['dopple', dopple],
  ['go global world', goglobal],
  ['orsan', orsan],
  ['teknoworld', teknoworld],
  ['virac', virac],
  ['ventspils international radio astronomy center', virac],
];

const projectImageEntries: Array<[string, string]> = [
  ['yarba', resume_builder_tex],
  ['resume builder', resume_builder_tex],
  ['wildlife', wildlife_detector],
  ['envmasker', envmasker],
  ['chess', chess_board],
  ['rf energy', rf_energy_harvesting],
];

const awardIconEntries: Array<[string, string]> = [
  ['chess', chess],
  ['tubitak', tubitak],
  ['padua', padua],
  ['aksaray', aksaray],
];

const skillMetaEntries: Array<[string, { icon: string; url: string }]> = [
  ['python', { icon: python, url: 'https://www.python.org' }],
  ['java', { icon: java, url: 'https://www.java.com' }],
  ['c++', { icon: cplusplus, url: 'https://isocpp.org' }],
  ['c', { icon: c, url: 'https://en.wikipedia.org/wiki/C_(programming_language)' }],
  ['matlab', { icon: matlab, url: 'https://www.mathworks.com/products/matlab.html' }],
  ['octave', { icon: octave, url: 'https://octave.org' }],
  ['opencv', { icon: opencv, url: 'https://opencv.org' }],
  ['tensorflow', { icon: tensorflow, url: 'https://www.tensorflow.org' }],
  ['pytorch', { icon: pytorch, url: 'https://pytorch.org' }],
  ['keras', { icon: keras, url: 'https://keras.io' }],
  ['scikit learn', { icon: scikit, url: 'https://scikit-learn.org' }],
  ['scikit-learn', { icon: scikit, url: 'https://scikit-learn.org' }],
  ['pillow', { icon: pillow, url: 'https://pypi.org/project/pillow/' }],
  ['pandas', { icon: pandas, url: 'https://pandas.pydata.org' }],
  ['numpy', { icon: numpy, url: 'https://numpy.org' }],
  ['matplotlib', { icon: matplotlib, url: 'https://matplotlib.org' }],
  ['seaborn', { icon: seaborn, url: 'https://seaborn.pydata.org' }],
  ['scipy', { icon: scipy, url: 'https://scipy.org' }],
  ['ollama', { icon: ollama, url: 'https://ollama.ai' }],
  ['spacy', { icon: spacy, url: 'https://spacy.io' }],
  ['langchain', { icon: langchain, url: 'https://www.langchain.com' }],
  ['openai', { icon: openai, url: 'https://openai.com' }],
  ['onnx', { icon: onnx, url: 'https://onnx.ai' }],
  ['openvino', { icon: openvino, url: 'https://openvino.ai' }],
  ['amazon api gateway', { icon: amazonapigateway, url: 'https://aws.amazon.com/api-gateway' }],
  ['amazon cloudwatch', { icon: amazoncloudwatch, url: 'https://aws.amazon.com/cloudwatch' }],
  ['amazon documentdb', { icon: amazondocumentdb, url: 'https://aws.amazon.com/documentdb' }],
  ['amazon dynamodb', { icon: amazondynamodb, url: 'https://aws.amazon.com/dynamodb' }],
  ['amazon ec2', { icon: amazonec2, url: 'https://aws.amazon.com/ec2' }],
  ['amazon ecs', { icon: amazonecs, url: 'https://aws.amazon.com/ecs' }],
  ['amazon elasticache', { icon: amazonelasticache, url: 'https://aws.amazon.com/elasticache' }],
  ['amazon rds', { icon: amazonrds, url: 'https://aws.amazon.com/rds' }],
  ['amazon route 53', { icon: amazonroute53, url: 'https://aws.amazon.com/route53' }],
  ['amazon s3', { icon: amazons3, url: 'https://aws.amazon.com/s3' }],
  ['amazon sqs', { icon: amazonsqs, url: 'https://aws.amazon.com/sqs' }],
  ['azure', { icon: azurecloud, url: 'https://azure.microsoft.com' }],
  ['digitalocean', { icon: digitalocean, url: 'https://www.digitalocean.com' }],
  ['google cloud', { icon: googlecloud, url: 'https://cloud.google.com' }],
  ['compute engine', { icon: computeengine, url: 'https://cloud.google.com/compute' }],
  ['mongodb', { icon: mongodb, url: 'https://www.mongodb.com' }],
  ['mysql', { icon: mysql, url: 'https://www.mysql.com' }],
  ['postgresql', { icon: postgresql, url: 'https://www.postgresql.org' }],
  ['sqlite', { icon: sqlite, url: 'https://www.sqlite.org' }],
  ['docker', { icon: docker, url: 'https://www.docker.com' }],
  ['github actions', { icon: githubactions, url: 'https://github.com/features/actions' }],
  ['git', { icon: git, url: 'https://git-scm.com' }],
  ['elasticsearch', { icon: elasticsearch, url: 'https://www.elastic.co/elasticsearch' }],
  ['fastapi', { icon: fastapi, url: 'https://fastapi.tiangolo.com' }],
  ['flask', { icon: flask, url: 'https://flask.palletsprojects.com' }],
  ['gradle', { icon: gradle, url: 'https://gradle.org' }],
  ['hibernate', { icon: hibernate, url: 'https://hibernate.org' }],
  ['jupyter', { icon: jupyter, url: 'https://jupyter.org' }],
  ['latex', { icon: latex, url: 'https://www.latex-project.org' }],
  ['pytest', { icon: pytest, url: 'https://docs.pytest.org' }],
  ['qt', { icon: qt, url: 'https://www.qt.io' }],
  ['spring', { icon: spring, url: 'https://spring.io' }],
  ['streamlit', { icon: streamlit, url: 'https://streamlit.io' }],
  ['selenium', { icon: selenium, url: 'https://www.selenium.dev' }],
  ['milvus', { icon: milvus, url: 'https://milvus.io' }],
  ['linux', { icon: linux, url: 'https://www.linux.org' }],
  ['arduino', { icon: arduino, url: 'https://www.arduino.cc' }],
  ['esp32', { icon: esp32, url: 'https://www.espressif.com' }],
  ['jetson', { icon: jetson, url: 'https://developer.nvidia.com/jetson' }],
  ['raspberry pi', { icon: raspberrypi, url: 'https://www.raspberrypi.org' }],
  ['stm32', { icon: stm32, url: 'https://www.st.com/stm32' }],
  ['cuda', { icon: cuda, url: 'https://developer.nvidia.com/cuda-toolkit' }],
  ['react', { icon: git, url: 'https://react.dev' }],
  ['llm', { icon: openai, url: 'https://openai.com' }],
];

const buildLookup = <T>(entries: Array<[string, T]>): Map<string, T> =>
  new Map(entries.map(([key, value]) => [normalizeKey(key), value]));

const companyIcons = buildLookup(companyIconEntries);
const projectImages = buildLookup(projectImageEntries);
const awardIcons = buildLookup(awardIconEntries);
const skillMeta = buildLookup(skillMetaEntries);

const lookup = <T>(map: Map<string, T>, name: string, fallback: T): T => {
  const key = normalizeKey(name);
  if (map.has(key)) {
    return map.get(key)!;
  }
  for (const [entryKey, value] of map.entries()) {
    if (key.includes(entryKey) || entryKey.includes(key)) {
      return value;
    }
  }
  return fallback;
};

export const getCompanyIcon = (name: string): string =>
  lookup(companyIcons, name, DEFAULT_PROJECT_IMAGE);

export const getProjectImage = (name: string): string =>
  lookup(projectImages, name, DEFAULT_PROJECT_IMAGE);

export const getAwardIcon = (name: string): string => lookup(awardIcons, name, placeholder);

export const getSkillMeta = (name: string): { icon: string; url: string } =>
  lookup(skillMeta, name, { icon: placeholder, url: 'https://github.com/mucahitkayadan' });

export const getProjectTags = (
  name: string,
  bulletPoints: string[]
): Array<{ name: string; color: string }> => {
  const words = [
    ...name.split(/[\s,()/+-]+/),
    ...bulletPoints.flatMap(point => point.split(/[\s,()/+-]+/)),
  ]
    .map(word => word.trim())
    .filter(word => word.length > 2);

  const unique = Array.from(new Set(words)).slice(0, 4);
  if (unique.length === 0) {
    return [{ name: 'Project', color: TAG_COLORS[0] }];
  }

  return unique.map((tag, index) => ({
    name: tag,
    color: TAG_COLORS[index % TAG_COLORS.length],
  }));
};

export const slugifyCategory = (category: string): string =>
  normalizeKey(category).replace(/\s+/g, '_');
