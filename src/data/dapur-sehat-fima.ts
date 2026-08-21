export type FimaIngredient = {
  name: string;
  nutrition: string;
};

export type FimaIngredientGroup = {
  title: string;
  items: string[];
};

export type FimaNutrition = {
  energy?: string;
  protein?: string;
  fat?: string;
  carbohydrate?: string;
  fiber?: string;
  vitamins?: string[];
  minerals?: string[];
};

export type FimaRecipe = {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  readTime: string;
  image: string;
  excerpt: string;
  description: string;
  product?: {
    name: string;
    slug: string;
    image: string;
  };
  ingredientGroups?: FimaIngredientGroup[];
  ingredients: FimaIngredient[];
  steps: string[];
  nutrition?: FimaNutrition;
  nutritionNotes: string[];
};

const productImages = {
  entramix:
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRAMIX/ENTRAMIX VANILA 1.png",
  peptisol:
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/PEPTISOL/Peptisol Vanila 1.png",
  entrasoy:
    "/images/client-assets/Packshoot 3D Susu Mednut terbaru 2026 - Per Halaman/ENTRASOY PACKSHOOT/ENTRASOY.png",
};

export const fimaRecipes: FimaRecipe[] = [
  {
    slug: "mix-banana-oatmeal-pan-seared-chicken",
    title: "Mix Banana Oatmeal with Pan Seared Chicken",
    subtitle: "Oatmeal lembut, pisang, dan ayam panggang untuk sajian bernutrisi yang mengenyangkan.",
    category: "Menu Dewasa & Lansia",
    readTime: "25 menit",
    image: "/images/mednut/recipes/mix-banana-oatmeal-chicken.webp",
    excerpt:
      "Perpaduan oatmeal pisang yang lembut dengan pan seared chicken sebagai inspirasi menu lengkap.",
    description:
      "Sajian hangat yang memadukan sumber karbohidrat, protein, dan serat dalam satu piring. Entramix ditampilkan sebagai produk nutrisi terkait dan digunakan sesuai petunjuk penyajian pada kemasan.",
    product: {
      name: "Entramix",
      slug: "entramix",
      image: productImages.entramix,
    },
    ingredientGroups: [
      {
        title: "Bahan A",
        items: [
          "50 g oatmeal",
          "1 buah pisang matang, iris",
          "200 ml air atau susu cair sesuai kebutuhan",
          "Kayu manis secukupnya",
        ],
      },
      {
        title: "Bahan B",
        items: [
          "120 g dada ayam tanpa kulit",
          "1 sdt minyak zaitun",
          "Lada dan rempah secukupnya",
          "Entramix sesuai takaran saji pada kemasan",
        ],
      },
    ],
    ingredients: [
      { name: "Oatmeal, pisang, air atau susu cair, dan kayu manis", nutrition: "Sumber karbohidrat dan serat." },
      { name: "Dada ayam, minyak zaitun, lada, dan rempah", nutrition: "Sumber protein hewani." },
      { name: "Entramix sesuai takaran saji", nutrition: "Gunakan sesuai petunjuk pada kemasan." },
    ],
    steps: [
      "Masak oatmeal bersama air atau susu cair dengan api kecil hingga teksturnya lembut.",
      "Tambahkan sebagian pisang, lalu aduk perlahan sampai tercampur. Sisihkan agar suhunya turun sebelum menambahkan produk nutrisi.",
      "Bumbui dada ayam dengan lada dan rempah, lalu pan-sear menggunakan minyak zaitun hingga matang merata.",
      "Iris ayam, tata bersama oatmeal, lalu tambahkan sisa pisang dan Entramix sesuai petunjuk penyajian pada kemasan.",
    ],
    nutrition: {
      energy: "Berasal dari oatmeal, pisang, ayam, dan bahan cair yang digunakan.",
      protein: "Berasal terutama dari dada ayam dan bahan cair yang dipilih.",
      fat: "Berasal dari minyak zaitun serta bahan cair yang digunakan.",
      carbohydrate: "Berasal terutama dari oatmeal dan pisang.",
      fiber: "Berasal dari oatmeal dan pisang.",
      vitamins: ["Vitamin B6", "Vitamin yang terkandung pada bahan dan produk terkait"],
      minerals: ["Kalium", "Mineral yang terkandung pada bahan dan produk terkait"],
    },
    nutritionNotes: [
      "Nilai gizi akhir dapat berbeda sesuai merek bahan dan besar porsi.",
      "Gunakan Entramix sesuai petunjuk penyajian pada kemasan.",
    ],
  },
  {
    slug: "avocado-toast",
    title: "Avocado Toast",
    subtitle: "Roti gandum dengan alpukat segar untuk menu praktis yang kaya rasa dan tekstur.",
    category: "Menu Pemulihan",
    readTime: "15 menit",
    image: "/images/mednut/recipes/avocado-toast.webp",
    excerpt:
      "Avocado toast segar dan mudah disiapkan sebagai inspirasi sarapan atau selingan.",
    description:
      "Menu praktis berbahan roti gandum, alpukat, dan sayuran segar. Peptisol ditampilkan sebagai produk nutrisi terkait dan digunakan sesuai petunjuk penyajian pada kemasan.",
    product: {
      name: "Peptisol",
      slug: "peptisol",
      image: productImages.peptisol,
    },
    ingredientGroups: [
      {
        title: "Bahan A",
        items: [
          "2 lembar roti gandum",
          "1 buah alpukat matang",
          "1 sdt air lemon",
          "Lada secukupnya",
        ],
      },
      {
        title: "Bahan B",
        items: [
          "Tomat ceri, belah dua",
          "Microgreens atau sayuran daun secukupnya",
          "Biji wijen secukupnya",
          "Peptisol sesuai takaran saji pada kemasan",
        ],
      },
    ],
    ingredients: [
      { name: "Roti gandum, alpukat, lemon, dan lada", nutrition: "Sumber karbohidrat, lemak, dan serat." },
      { name: "Tomat ceri, sayuran daun, dan biji wijen", nutrition: "Memberikan variasi vitamin, mineral, dan tekstur." },
      { name: "Peptisol sesuai takaran saji", nutrition: "Gunakan sesuai petunjuk pada kemasan." },
    ],
    steps: [
      "Panggang roti gandum hingga permukaannya renyah tetapi bagian tengah tetap lembut.",
      "Haluskan sebagian alpukat bersama air lemon dan lada, lalu sisakan beberapa irisan untuk topping.",
      "Oleskan alpukat pada roti dan tata irisan alpukat, tomat ceri, sayuran daun, serta biji wijen.",
      "Sajikan bersama Peptisol yang telah disiapkan terpisah sesuai petunjuk penyajian pada kemasan.",
    ],
    nutrition: {
      energy: "Berasal dari roti gandum, alpukat, dan biji wijen.",
      protein: "Berasal dari roti gandum, biji wijen, dan produk terkait.",
      fat: "Berasal terutama dari alpukat dan biji wijen.",
      carbohydrate: "Berasal terutama dari roti gandum.",
      fiber: "Berasal dari roti gandum, alpukat, dan sayuran.",
      vitamins: ["Vitamin C", "Vitamin E", "Folat"],
      minerals: ["Kalium", "Magnesium"],
    },
    nutritionNotes: [
      "Nilai gizi akhir dapat berbeda sesuai merek bahan dan besar porsi.",
      "Siapkan Peptisol sesuai petunjuk penyajian pada kemasan.",
    ],
  },
  {
    slug: "vegan-salad-stuffed-sweet-potato",
    title: "Vegan Salad Stuffed Sweet Potato",
    subtitle: "Ubi manis panggang dengan isian salad segar berbasis bahan nabati.",
    category: "Menu Berbasis Nabati",
    readTime: "35 menit",
    image: "/images/mednut/recipes/vegan-salad-stuffed-sweet-potato.webp",
    excerpt:
      "Ubi panggang berisi salad kacang arab dan sayuran untuk pilihan menu nabati yang berwarna.",
    description:
      "Menu berbasis nabati yang memadukan ubi manis, kacang arab, dan sayuran segar. Entrasoy ditampilkan sebagai produk nutrisi terkait dan digunakan sesuai petunjuk penyajian pada kemasan.",
    product: {
      name: "Entrasoy",
      slug: "entrasoy",
      image: productImages.entrasoy,
    },
    ingredientGroups: [
      {
        title: "Bahan A",
        items: [
          "2 buah ubi manis ukuran sedang",
          "1 sdt minyak zaitun",
          "Lada dan rempah secukupnya",
        ],
      },
      {
        title: "Bahan B",
        items: [
          "100 g kacang arab matang",
          "Mentimun dan tomat ceri, potong kecil",
          "Kol ungu dan daun peterseli secukupnya",
          "1 sdt air lemon",
          "Entrasoy sesuai takaran saji pada kemasan",
        ],
      },
    ],
    ingredients: [
      { name: "Ubi manis, minyak zaitun, lada, dan rempah", nutrition: "Sumber karbohidrat dan serat." },
      { name: "Kacang arab, mentimun, tomat, kol ungu, peterseli, dan lemon", nutrition: "Sumber protein nabati, serat, vitamin, dan mineral." },
      { name: "Entrasoy sesuai takaran saji", nutrition: "Gunakan sesuai petunjuk pada kemasan." },
    ],
    steps: [
      "Cuci ubi hingga bersih, oles tipis dengan minyak zaitun, lalu panggang sampai empuk.",
      "Campurkan kacang arab, mentimun, tomat ceri, kol ungu, peterseli, air lemon, lada, dan rempah.",
      "Belah ubi panggang memanjang tanpa memutus bagian bawahnya, lalu tekan perlahan agar terbuka.",
      "Isi ubi dengan salad dan sajikan bersama Entrasoy yang disiapkan terpisah sesuai petunjuk pada kemasan.",
    ],
    nutrition: {
      energy: "Berasal dari ubi manis, kacang arab, dan minyak zaitun.",
      protein: "Berasal terutama dari kacang arab dan produk terkait.",
      fat: "Berasal dari minyak zaitun.",
      carbohydrate: "Berasal terutama dari ubi manis dan kacang arab.",
      fiber: "Berasal dari ubi, kacang arab, dan sayuran.",
      vitamins: ["Beta-karoten (provitamin A)", "Vitamin C", "Folat"],
      minerals: ["Kalium", "Magnesium", "Zat besi"],
    },
    nutritionNotes: [
      "Nilai gizi akhir dapat berbeda sesuai merek bahan dan besar porsi.",
      "Siapkan Entrasoy sesuai petunjuk penyajian pada kemasan.",
    ],
  },
];

export function getFimaRecipeBySlug(slug: string) {
  return fimaRecipes.find((recipe) => recipe.slug === slug);
}
