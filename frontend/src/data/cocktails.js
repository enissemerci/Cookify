const cocktails = [
  {
    title: "Mojito",
    image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748031107/SAVEUR_Mojito_1149-Edit-scaled_lddxtd.webp",
    ingredients: [
      "Nane yaprakları",
      "1 tatlı kaşığı şeker",
      "Yarım lime",
      "50 ml beyaz rom",
      "Soda",
      "Buz"
    ],
    instructions: "Nane ve şekeri ezin. Lime ve rom ekleyin. Soda ve buz ile tamamlayın.",
    tips: "Taze nane ve lime ile süsleyin."
  },
  {
    title: "Margarita",
    image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748031105/margarita-tarifi_kss4lj.jpg",
    ingredients: [
      "50 ml tekila",
      "20 ml lime suyu",
      "20 ml Cointreau",
      "Tuz (bardak kenarı için)"
    ],
    instructions: "Tüm malzemeleri shaker'da buzla çalkalayın. Tuzlanmış bardakta servis edin.",
    tips: "Bardağın kenarını lime ile ıslatıp tuza batırın."
  },
  {
    title: "Bloody Mary",
    image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748031105/GCmedUjOwr3M8KLmx98VR2_zn0zjl.webp",
    ingredients: [
      "45 ml votka",
      "90 ml domates suyu",
      "Birkaç damla limon",
      "Worcestershire sos",
      "Tuz, karabiber"
    ],
    instructions: "Tüm malzemeleri buzla karıştırın. Kereviz sapı ile servis edin.",
    tips: "Acılığı seviyorsan birkaç damla Tabasco ekleyebilirsin."
  },
  {
  
  title: "Negroni",
  image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748031826/Negroni-Recipe-004-copy_z0ufau.webp",
  ingredients: [
    "30 ml Cin",
    "30 ml Campari",
    "30 ml Kırmızı vermut",
    "Portakal dilimi"
  ],
  instructions: "Tüm malzemeleri buzla karıştırın. Bardakta portakal dilimi ile servis edin.",
  tips: "Taze portakal kabuğu rendesi aromayı artırır."
},
{
  title: "Gin Tonic",
  image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748031910/Best-Tonics-for-a-GT-FT-BLOG0523-22183d70941e4ada8d91e643ec9eade4_hz8ye9.jpg",
  ingredients: [
    "50 ml Cin",
    "100 ml Tonik",
    "Buz",
    "Lime dilimi"
  ],
  instructions: "Bardağa buz koyun. Cin ve tonik ekleyin, lime ile süsleyin.",
  tips: "İnce lime dilimi veya salatalık ile servis etmek popüler bir sunumdur."
},
{
  title: "Espresso Martini",
  image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748031829/espresso-martini_oc4bb4.jpg",
  ingredients: [
    "40 ml votka",
    "20 ml kahve likörü (Kahlúa)",
    "20 ml taze espresso",
    "Kahve çekirdeği (süsleme)"
  ],
  instructions: "Tüm malzemeleri buzla shaker'da çalkalayın. Süzerek kokteyl bardağına alın.",
  tips: "Üzerine 3 kahve çekirdeği koyarak klasik sunumu tamamlayabilirsin."
},
{
  title: "Pina Colada",
  image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748031828/non-alcoholic-pina-colada-6_eco22z.jpg",
  ingredients: [
    "50 ml beyaz rom",
    "50 ml hindistan cevizi kreması",
    "100 ml ananas suyu",
    "Buz"
  ],
  instructions: "Tüm malzemeleri blenderda buzla karıştırın. Bardakta süsleyin.",
  tips: "Ananas dilimi ve kirazla servis edebilirsin."
},
{
  title: "Tequila Sunrise",
  image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748032123/tequila-sunrise-203556-1_ovxzkq.webp",
  ingredients: [
    "45 ml tekila",
    "90 ml portakal suyu",
    "15 ml grenadin şurubu",
    "Portakal dilimi"
  ],
  instructions: "Tekila ve portakal suyunu bardakta karıştır. Üzerine grenadin yavaşça dök.",
  tips: "Grenadin aşağı çöker, gün doğumu efekti yaratır."
},
{
  title: "Moscow Mule",
  image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748032273/TBC_recipe_image_10-845540_fgd2gy.jpg",
  ingredients: [
    "50 ml votka",
    "100 ml zencefilli gazoz (ginger beer)",
    "10 ml lime suyu",
    "Nane yaprağı"
  ],
  instructions: "Bardakta tüm malzemeleri buzla karıştır. Nane ve lime ile süsle.",
  tips: "Bakır bardakta servis etmek klasik sunumudur."
},
{
  title: "Daiquiri",
  image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748032122/Article-Floridita-Hemingway-Daiquiri-Frappe-Frozen-Cocktail-Recipe_eu4dcp.webp",
  ingredients: [
    "50 ml beyaz rom",
    "25 ml lime suyu",
    "15 ml şeker şurubu"
  ],
  instructions: "Tüm malzemeleri buzla çalkalayın ve süzerek servis edin.",
  tips: "Kokteyl bardağını soğutulmuş kullanman lezzeti artırır."
},
{
  title: "Manhattan",
  image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748032372/manhattan-cocktail-4d775c9_oqdbce.jpg",
  ingredients: [
    "50 ml bourbon",
    "20 ml kırmızı vermut",
    "Birkaç damla Angostura bitters",
    "Kiraz (süsleme)"
  ],
  instructions: "Malzemeleri karıştır, kokteyl bardağına süz ve kirazla süsle.",
  tips: "Aromayı yumuşatmak için bardağı önceden buzla çalkala."
},
{
  title: "Whiskey Sour",
  image: "https://res.cloudinary.com/dtwnowxud/image/upload/v1748032373/whiskey-sour_gzpi69.jpg",
  ingredients: [
    "50 ml bourbon",
    "25 ml lime suyu",
    "20 ml şeker şurubu",
    "Yumurta beyazı (isteğe bağlı)"
  ],
  instructions: "Tüm malzemeleri yumurta beyazı ile ‘dry shake’ yap, ardından buzla çalkala. Süz ve servis et.",
  tips: "Yumurta beyazı köpük oluşturur, klasik sunumdur ama isteğe bağlıdır."
}

];

export default cocktails;
