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

const middleInitials = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

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

const candidateImages = [
  "https://res.cloudinary.com/hamsters-api/image/upload/v1770467979/candidate3_i5emow.jpg",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1770467978/candidate5_i3m6g3.jpg",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1770467977/candidate1_kzebyq.jpg",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1770467977/candidate2_cqb9ec.jpg",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1770467977/candidate4_zqrmz8.jpg",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1770467977/candidate10_tdpppt.jpg",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1770467977/candidate6_xwrltj.jpg",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1770467977/candidate9_chcv7g.jpg",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1770467976/candidate8_x9jewe.jpg",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1770467976/candidate7_oesfsx.jpg",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1770467976/candidate14_fqyfnj.jpg",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1770467976/candidate12_kr2jaf.jpg",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1770467976/candidate11_o5wrxj.jpg",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1770467975/candidate16_bkwpbj.jpg",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1770467975/candidate13_krnhrl.jpg",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1770467975/candidate15_qb4bvy.jpg",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1770467975/candidate17_gkjgb1.jpg",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_2_nj4cvn.png",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_1_ivzpoy.png",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_3_sn1toa.png",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_rhruv8.png",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_4_oye3yj.png",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1768321566/Rectangle_39_5_ggem1u.png",
  "https://res.cloudinary.com/hamsters-api/image/upload/v1767584015/v8_cdshyj.avif",
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

  return (
    `${background} with ${yearsExperience} years of experience. ` +
    `${education}. ` +
    `Primary focus: ${primaryAdvocacy}. Also advocates for ${secondaryAdvocacy}.`
  );
}

export function generateCandidate(position) {
  return {
    fullname: generateFullName(),
    description: generateDescription(),
    imageUrl: getRandomElement(candidateImages),
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
