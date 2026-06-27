export type FimaRecipe = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  excerpt: string;
  description: string;
  ingredients: string[];
  steps: string[];
  nutritionNotes: string[];
};

export const fimaRecipes: FimaRecipe[] = [
  {
    slug: "smoothie-entrakid-pisang",
    title: "Smoothie Pisang Entrakid",
    category: "Menu Anak",
    readTime: "5 menit",
    image: "/images/mednut/products/page-assets/entrakid.jpg",
    excerpt:
      "Inspirasi minuman sederhana untuk membantu memenuhi kebutuhan energi dan nutrisi anak.",
    description:
      "Smoothie Pisang Entrakid adalah contoh menu praktis yang dapat disiapkan di rumah sebagai variasi asupan anak. Menu ini menggabungkan pisang, susu, dan Entrakid sesuai arahan penyajian untuk membantu mendukung kebutuhan nutrisi harian si kecil.",
    ingredients: [
      "1 buah pisang matang",
      "200 ml susu cair atau air matang sesuai kebutuhan",
      "Entrakid sesuai takaran saji pada kemasan",
      "Es batu secukupnya bila diperlukan",
    ],
    steps: [
      "Potong pisang menjadi beberapa bagian agar mudah diblender.",
      "Masukkan pisang, susu cair atau air matang, dan Entrakid ke dalam blender.",
      "Blend hingga tekstur lembut dan merata.",
      "Tuang ke gelas saji dan sajikan segera.",
    ],
    nutritionNotes: [
      "Gunakan takaran produk sesuai petunjuk pada kemasan.",
      "Sesuaikan tekstur dengan usia dan kemampuan makan anak.",
      "Untuk anak dengan kondisi medis tertentu, konsultasikan dengan dokter atau ahli gizi.",
    ],
  },
  {
    slug: "oatmeal-entramix-buah",
    title: "Oatmeal Entramix Buah",
    category: "Menu Dewasa",
    readTime: "7 menit",
    image: "/images/mednut/products/page-assets/entramix.jpeg",
    excerpt:
      "Menu sarapan praktis untuk membantu memenuhi energi harian dewasa dan lansia.",
    description:
      "Oatmeal Entramix Buah dapat menjadi variasi sarapan lembut dan mudah dikonsumsi. Cocok sebagai inspirasi menu harian untuk membantu memenuhi kebutuhan energi.",
    ingredients: [
      "Oatmeal secukupnya",
      "Air hangat atau susu cair",
      "Entramix sesuai takaran saji pada kemasan",
      "Potongan buah sesuai selera",
    ],
    steps: [
      "Masak oatmeal hingga tekstur lembut.",
      "Diamkan sebentar sampai suhu tidak terlalu panas.",
      "Tambahkan Entramix sesuai takaran saji.",
      "Aduk rata dan tambahkan potongan buah.",
    ],
    nutritionNotes: [
      "Jangan mencampur produk dengan air mendidih.",
      "Sesuaikan porsi dengan kebutuhan energi harian.",
      "Konsultasikan dengan tenaga kesehatan untuk kondisi khusus.",
    ],
  },
  {
    slug: "puding-entrasoy-almond",
    title: "Puding Entrasoy Almond",
    category: "Menu Keluarga",
    readTime: "10 menit",
    image: "/images/mednut/products/page-assets/entrasoy.jpeg",
    excerpt:
      "Inspirasi dessert ringan berbasis soya untuk variasi menu keluarga.",
    description:
      "Puding Entrasoy Almond adalah contoh menu sederhana berbasis protein nabati yang dapat menjadi variasi hidangan keluarga.",
    ingredients: [
      "Agar-agar plain secukupnya",
      "Air matang",
      "Entrasoy sesuai takaran saji pada kemasan",
      "Potongan almond atau topping sesuai selera",
    ],
    steps: [
      "Masak agar-agar dengan air sesuai petunjuk.",
      "Diamkan hingga suhu lebih hangat.",
      "Campurkan Entrasoy dan aduk rata.",
      "Tuang ke cetakan, tambahkan topping, lalu dinginkan.",
    ],
    nutritionNotes: [
      "Perhatikan suhu saat mencampur produk.",
      "Gunakan topping sesuai kebutuhan dan toleransi tubuh.",
      "Hasil menu bersifat inspirasi, bukan pengganti saran medis.",
    ],
  },
];

export function getFimaRecipeBySlug(slug: string) {
  return fimaRecipes.find((recipe) => recipe.slug === slug);
}
