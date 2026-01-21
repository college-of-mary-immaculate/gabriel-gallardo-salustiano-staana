// server/utils/candidateGenerator.js

const filipinoFirstNames = {
  male: [
    "Juan",
    "Jose",
    "Miguel",
    "Francisco",
    "Antonio",
    "Pedro",
    "Ramon",
    "Carlos",
    "Ricardo",
    "Roberto",
    "Fernando",
    "Manuel",
    "Eduardo",
    "Rodrigo",
    "Rafael",
    "Gabriel",
    "Daniel",
    "Angelo",
    "Marco",
    "Luis",
    "Vincent",
    "Christian",
    "Joshua",
    "Michael",
    "John Paul",
    "Mark Anthony",
    "Ryan",
    "Kevin",
    "Jerome",
  ],
  female: [
    "Maria",
    "Rosa",
    "Carmen",
    "Ana",
    "Teresa",
    "Elena",
    "Isabel",
    "Josefa",
    "Luisa",
    "Sofia",
    "Cristina",
    "Angela",
    "Patricia",
    "Michelle",
    "Jennifer",
    "Katherine",
    "Angelica",
    "Stephanie",
    "Princess",
    "Andrea",
    "Jasmine",
    "Nicole",
    "Sarah",
    "Grace",
    "Faith",
    "Hope",
    "Joy",
    "Charity",
  ],
};

const filipinoLastNames = [
  "Santos",
  "Reyes",
  "Cruz",
  "Bautista",
  "Ocampo",
  "Garcia",
  "Mendoza",
  "Torres",
  "Gonzales",
  "Lopez",
  "Flores",
  "Ramos",
  "Rivera",
  "Aquino",
  "Perez",
  "Castillo",
  "De Leon",
  "Villanueva",
  "San Jose",
  "Del Rosario",
  "Diaz",
  "Fernandez",
  "Soriano",
  "Valdez",
  "Santiago",
  "Marquez",
  "Hernandez",
  "Castro",
  "Mercado",
  "Salazar",
  "Navarro",
  "Gutierrez",
  "Velasco",
  "Domingo",
  "Pascual",
  "Manalo",
  "Evangelista",
  "De Guzman",
  "Tolentino",
  "Angeles",
  "Aguilar",
  "Morales",
  "Miranda",
  "Tan",
  "Lim",
  "Sy",
  "Ong",
  "Chua",
  "Go",
  "Yap",
];

const middleInitials = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

const educationBackgrounds = [
  "Ateneo de Manila University - Political Science",
  "University of the Philippines - Public Administration",
  "De La Salle University - Business Administration",
  "University of Santo Tomas - Law",
  "Polytechnic University of the Philippines - Economics",
  "Far Eastern University - Political Science",
  "Adamson University - Business Management",
  "Manuel L. Quezon University - Public Administration",
  "San Beda University - Law",
  "Lyceum of the Philippines - International Relations",
  "Harvard University - Public Policy",
  "Oxford University - International Relations",
];

const professionalBackgrounds = [
  "Former Mayor",
  "Former Governor",
  "Business Executive",
  "Lawyer",
  "Community Organizer",
  "Former Congressman/Congresswoman",
  "NGO Director",
  "Economist",
  "Environmental Advocate",
  "Human Rights Lawyer",
  "Labor Union Leader",
  "Agricultural Specialist",
  "Healthcare Professional",
  "Educator",
  "Journalist",
  "Former Diplomat",
  "Social Entrepreneur",
  "Tech Entrepreneur",
];

const advocacies = [
  "Education Reform",
  "Healthcare Access",
  "Anti-Corruption",
  "Economic Development",
  "Environmental Protection",
  "Labor Rights",
  "Women's Rights",
  "Indigenous Peoples' Rights",
  "Agricultural Modernization",
  "Infrastructure Development",
  "Technology Innovation",
  "Peace and Order",
  "Good Governance",
  "Poverty Alleviation",
  "Climate Action",
];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateGender() {
  return Math.random() > 0.5 ? "male" : "female";
}

function generateFullName(gender = null) {
  const selectedGender = gender || generateGender();
  const firstName = getRandomElement(filipinoFirstNames[selectedGender]);
  const middleInitial = getRandomElement(middleInitials);
  const lastName = getRandomElement(filipinoLastNames);

  return `${firstName} ${middleInitial}. ${lastName}`;
}

function generateDescription() {
  const background = getRandomElement(professionalBackgrounds);
  const education = getRandomElement(educationBackgrounds);
  const yearsExperience = Math.floor(Math.random() * 25) + 5;
  const primaryAdvocacy = getRandomElement(advocacies);
  const secondaryAdvocacy = getRandomElement(advocacies.filter((a) => a !== primaryAdvocacy));

  return `${background} with ${yearsExperience} years of experience. ` + `${education}. ` + `Primary focus: ${primaryAdvocacy}. Also advocates for ${secondaryAdvocacy}.`;
}

export function generateCandidate(position) {
  return {
    fullname: generateFullName(),
    description: generateDescription(),
    imageUrl: "",
  };
}

export function generateElectionCandidates(config = {}) {
  const { presidents = 10, vicePresidents = 10, senators = 24, partyLists = 30 } = config;

  return {
    presidents: Array.from({ length: presidents }, () => generateCandidate("President")),
    vicePresidents: Array.from({ length: vicePresidents }, () => generateCandidate("Vice President")),
    senators: Array.from({ length: senators }, () => generateCandidate("Senator")),
    partyLists: Array.from({ length: partyLists }, () => generateCandidate("Party-List")),
  };
}
