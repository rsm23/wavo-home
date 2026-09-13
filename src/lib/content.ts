export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  metrics?: string;
  sector?: string;
}

export interface Investor {
  name: string;
  logo: string;
  description: string;
}

export interface ClientLogo {
  name: string;
  logo: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "model" | "eligibility" | "pricing" | "security";
}

export interface BlogArticle {
  title: string;
  description: string;
  image: string;
  tag: string;
  readTime: string;
  link: string;
}

export const WAVO_CONTENT = {
  announcement: {
    badge: "Série Amorçage",
    text: "Wavo lève 3.5 millions d’euros pour libérer la trésorerie des TPE & PME",
    linkText: "Lire le communiqué",
    href: "https://www.wavo.fr/blog/wavo-leve-3-5-millions-euros-liberer-financement-stocks-tpe-pme/",
  },
  hero: {
    pill: "Financement d'inventaire sans dette",
    headline: "Votre stock finance votre ambition",
    subheadline:
      "Convertissez jusqu'à 100% de votre stock physique en trésorerie immédiate. Zéro dette au bilan, aucune caution personnelle, récupération produit par produit au rythme de vos ventes réelles.",
    ctaPrimary: "Simuler mon financement",
    ctaSecondary: "Vérifier mon éligibilité",
    stats: [
      { value: "3.5M€", label: "Levés auprès de Bpifrance & Kima", suffix: "" },
      { value: "< 24h", label: "Délai moyen de virement", suffix: "" },
      { value: "0€", label: "Dette ajoutée au bilan", suffix: "" },
      { value: "0,05%", label: "Frais journaliers transparents", suffix: "/jour" },
    ],
  },
  investors: [
    { name: "Bpifrance", logo: "/assets/logo-bpifrance.png", description: "Banque publique d'investissement" },
    { name: "Kima Ventures", logo: "/assets/logo-kima-ventures.png", description: "Fonds d'amorçage de Xavier Niel" },
    { name: "Infinity Nine Group", logo: "/assets/logo-infinitynine-group.png", description: "Holding de Tony Parker" },
    { name: "Hub612", logo: "/assets/logo-hub612.png", description: "Accélérateur & VC Fintech" },
    { name: "Clint Capital", logo: "/assets/logo-clint-capital.png", description: "Fonds d'investissement tech" },
  ] as Investor[],
  clientLogos: [
    { name: "Tupperware", logo: "/assets/logo_tupperware_black.svg" },
    { name: "JOONE", logo: "/assets/logo_joone.png" },
    { name: "From Future", logo: "/assets/logo_from-future.png" },
    { name: "Jolimoi", logo: "/assets/logo_jolimoi.png" },
    { name: "Vesto", logo: "/assets/logo-vesto-1.webp" },
  ] as ClientLogo[],
  pillars: [
    {
      id: "zero-cash-freeze",
      icon: "Coins",
      tag: "Trésorerie immédiate",
      title: "Zéro immobilisation de trésorerie",
      description:
        "Nous rachetons jusqu'à l'intégralité de vos produits en stock et prenons même en charge la TVA. Une solution idéale pour les TPE et PME qui veulent sécuriser leur trésorerie.",
      accent: "from-blue-500/20 via-indigo-500/10 to-transparent",
      badge: "100% de la valeur + TVA",
      highlights: [
        "Financement jusqu'à 250 000 € et plus",
        "Virement direct sur compte bancaire",
        "TVA avancée intégralement dès l'entrée",
      ],
    },
    {
      id: "accessible-growth",
      icon: "Rocket",
      tag: "Financement non dilutif",
      title: "Accessible aux entreprises en croissance",
      description:
        "Le modèle repose sur la valeur intrinsèque de vos produits, et non sur vos performances passées ou votre historique bancaire. Pensé pour les entreprises qui veulent accélérer sans attendre.",
      accent: "from-violet-500/20 via-purple-500/10 to-transparent",
      badge: "Liquidité produit",
      highlights: [
        "Aucune exigence d'historique bancaire lourd",
        "Éligible dès le premier lot de stock",
        "Pas de dilution de capital",
      ],
    },
    {
      id: "zero-debt",
      icon: "ShieldCheck",
      tag: "Protection du bilan",
      title: "Aucun impact sur votre endettement",
      description:
        "L’opération ne repose pas sur un prêt ni sur une ligne de crédit. Aucune dette, aucun gage ou garantie sur stock : votre capacité d’emprunt et votre bilan restent intacts.",
      accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
      badge: "Zéro caution & Zéro gage",
      highlights: [
        "Aucune caution personnelle exigée",
        "Ratios financiers (gearing) préservés",
        "Capacité d'emprunt bancaire intacte",
      ],
    },
    {
      id: "sales-cycle",
      icon: "RefreshCw",
      tag: "Synchronisation ERP",
      title: "Un modèle calé sur vos flux d’achat et de vente",
      description:
        "Nous rachetons votre stock dès son entrée, avec une récupération produit par produit, au fil des ventes. Le mécanisme suit votre cycle de vente réel, pas un calendrier imposé.",
      accent: "from-amber-500/20 via-orange-500/10 to-transparent",
      badge: "Au fil de l'eau",
      highlights: [
        "Connexion directe à votre ERP ou Shopify",
        "Rachat unitaire automatique à chaque sortie",
        "Zéro pénalité de remboursement anticipé",
      ],
    },
  ],
  steps: [
    {
      stepNumber: "01",
      title: "Prise de contact & Éligibilité",
      timeframe: "< 2 heures",
      description:
        "Dès réception de votre demande, nous vérifions votre éligibilité en ligne et échangeons avec vous sur la nature de vos stocks.",
      details: "Diagnostic instantané de votre catalogue et analyse de la liquidité de vos références.",
      statusText: "Vérification automatisée",
    },
    {
      stepNumber: "02",
      title: "Mise en place & Rachat Wavo",
      timeframe: "< 24 heures",
      description:
        "Vous soumettez les informations sur votre stock. L’opération est validée et Wavo acquiert les produits concernés par virement immédiat.",
      details: "Déblocage de 100% de la valeur marchande + avance de la TVA sur votre compte bancaire.",
      statusText: "Virement SEPA instantané",
    },
    {
      stepNumber: "03",
      title: "Suivi en temps réel de votre stock",
      timeframe: "En continu",
      description:
        "Vous conservez physiquement les produits dans vos entrepôts et connectez votre stock à notre plateforme pour un suivi en temps réel.",
      details: "Vos flux logistiques ne changent pas : vous préparez et expédiez les commandes comme d'habitude.",
      statusText: "Stock dans vos entrepôts",
    },
    {
      stepNumber: "04",
      title: "Récupération progressive à la vente",
      timeframe: "Cycle naturel",
      description:
        "Les produits sont récupérés un par un, au fil des ventes, avec des conditions claires et transparentes sans échéance fixe rigide.",
      details: "Vous rachetez les produits uniquement lorsqu'ils sont vendus et payés par vos clients finaux.",
      statusText: "Rachat unitaire automatique",
    },
  ],
  productCategories: [
    {
      id: "mat-prem",
      title: "Matières premières & composants",
      desc: "Stocks standardisés et revendables destinés à l'assemblage et la production.",
      examples: "Composants électroniques, métaux nobles, modules solaires",
      icon: "Boxes",
      rotation: "< 6 mois",
    },
    {
      id: "neuf-occaz",
      title: "Produits neufs & d’occasion",
      desc: "Biens de consommation durables et filières de seconde main reconditionnées.",
      examples: "Vélos reconditionnés, smartphones, outillage certifié",
      icon: "Recycle",
      rotation: "< 8 mois",
    },
    {
      id: "equip-vehic",
      title: "Équipements & véhicules",
      desc: "Flottes, micromobilité et matériel roulant léger pour professionnels et particuliers.",
      examples: "Trottinettes pro, vélos cargo, remorques spécialisées",
      icon: "Bike",
      rotation: "< 6 mois",
    },
    {
      id: "grand-public-b2b",
      title: "Produits grand public & B2B",
      desc: "Articles standardisés vendus en réseau de distribution, retail ou grossistes.",
      examples: "Puériculture, mobilier ergonomique, accessoires de mode",
      icon: "ShoppingBag",
      rotation: "< 5 mois",
    },
    {
      id: "high-tech",
      title: "High-tech & électroménager",
      desc: "Parcs informatiques d'entreprise, électroménager et électronique grand public.",
      examples: "Laptops reconditionnés, serveurs, équipement maison",
      icon: "Laptop",
      rotation: "< 4 mois",
    },
    {
      id: "industriel",
      title: "Matériel industriel & pro",
      desc: "Outillage professionnel, machines d'atelier et instrumentation certifiée.",
      examples: "Appareils de mesure, machines de cuisine pro, pièces SAV",
      icon: "Factory",
      rotation: "< 8 mois",
    },
  ],
  testimonials: [
    {
      name: "Charles Passereau",
      role: "Co-fondateur & CEO",
      company: "Eversun",
      image: "/assets/charles-passereau.png",
      quote:
        "Avec Wavo, nous finançons nos panneaux solaires sans mobiliser notre trésorerie. Nous pouvons ainsi investir pleinement dans notre technologie et notre croissance.",
      metrics: "Trésorerie 100% préservée",
      sector: "Énergie Solaire & Tech",
    },
    {
      name: "Anthony Dejour",
      role: "Gérant Associé",
      company: "Sport'Alpes",
      image: "/assets/anthony_dejour.jpg",
      quote:
        "Grâce à Wavo, nous pouvons racheter immédiatement les produits d’occasion de nos clients. Résultat : plus de volume, plus de satisfaction et plus de ventes de produits neufs.",
      metrics: "+35% de volume de rachat",
      sector: "Distribution Outdoor",
    },
    {
      name: "Tanguy Lastennet",
      role: "Co-fondateur & CSO",
      company: "Loewi",
      image: "/assets/tanguy-lastennet.jpg",
      quote:
        "Avec Wavo, nous avons pu financer de plus gros lots de vélos d’occasion, à de meilleurs prix. Résultat : des coûts réduits, des marges encore plus optimisées et plus de vélos reconditionnés accessibles pour nos clients. Simple, efficace !",
      metrics: "Marges brutes optimisées",
      sector: "Mobilité Reconditionnée",
    },
    {
      name: "Quentin de Lambert",
      role: "Co-fondateur & CFO",
      company: "Rzilient",
      image: "/assets/quentin_delambert.jpg",
      quote:
        "Financer des rachats de parcs informatiques en fin de lease sans contrainte de trésorerie nous permet de saisir toutes les opportunités et de développer notre activité de seconde main sans pression sur la revente.",
      metrics: "Zéro contrainte de trésorerie",
      sector: "Gestion IT & Seconde Main",
    },
  ] as Testimonial[],
  eligibility: {
    enterpriseCriteria: [
      { id: "immat", label: "Entreprise immatriculée en France depuis au moins 3 ans", mandatory: true },
      { id: "team", label: "Équipe composée de 2 personnes au minimum", mandatory: true },
      { id: "ca", label: "Chiffre d’affaires annuel supérieur à 2 000 000 €", mandatory: true },
      { id: "proc", label: "Pas de procédure collective en cours (RJ, LJ, sauvegarde)", mandatory: true },
      { id: "pay", label: "Paiement à la vente ou affacturage déjà en place", mandatory: true },
      { id: "tools", label: "Connexion possible à vos outils (ERP, exports comptables, accès bancaire)", mandatory: true },
    ],
    productCriteria: [
      { id: "phys", label: "Physiques, standardisés, prêts à la revente et facilement déstockables par des tiers", note: "Ex : vélos, mobilier, électroménager, électronique, machines..." },
      { id: "stock", label: "Stockés et assurés chez vous ou chez un logisticien agréé", note: "Garantie de conservation sur site" },
      { id: "cycle", label: "Cycle de revente moyen inférieur à 8 mois", note: "Rotation rapide favorisant un coût réduit" },
    ],
  },
  pricing: {
    dailyRate: "0,05 %",
    dailyRateDesc: "de frais journaliers appliqués sur le montant financé.",
    repurchaseRate: "Jusqu'à 5 %",
    repurchaseRateDesc:
      "frais de rachat dégressifs selon la rotation des produits : plus ils se revendent rapidement, plus ce taux diminue.",
    amounts: "De 50 000 € à 250 000 € (extensible pour grands comptes)",
    speed: "< 24 heures par virement bancaire",
    guarantee: "0 dette, 0 caution, 0 gage sur stock",
  },
  faq: [
    {
      id: "who",
      category: "eligibility",
      question: "Qui peut utiliser Wavo ?",
      answer:
        "Wavo s’adresse aux entreprises établies qui achètent et stockent des produits physiques avant de les revendre, que ce soit en B2B ou en B2C. Notre solution s’adresse aux TPE & PME françaises de plus de 3 ans d'ancienneté, avec au moins 2 collaborateurs et réalisant plus de 2 000 000 € de CA annuel, sans procédure collective en cours.",
    },
    {
      id: "products",
      category: "eligibility",
      question: "Quels types de produits sont finançables ?",
      answer:
        "Nous finançons tous types de stocks physiques, qu’ils soient neufs ou d’occasion, et même certaines matières premières à condition qu’ils soient standardisés, assurés et facilement revendables par des tiers avec un cycle de revente inférieur à 8 mois.",
    },
    {
      id: "existing-stock",
      category: "model",
      question: "Puis-je financer un stock déjà existant ?",
      answer:
        "Oui, nous pouvons racheter du stock déjà en votre possession dans vos entrepôts. L’éligibilité dépend de la nature du stock et de sa liquidité. Contactez-nous pour évaluer votre situation et recevoir une offre sous 24h.",
    },
    {
      id: "reassort",
      category: "model",
      question: "Puis-je utiliser Wavo pour financer un réassort ou un réapprovisionnement ?",
      answer:
        "Oui. Que vous ayez besoin de réassort en urgence ou de réapprovisionner votre stock pour anticiper une forte saisonnalité, Wavo vous permet de dégager rapidement de la trésorerie sans dette. Vous conservez vos produits et ne remboursez qu’une fois vendus.",
    },
    {
      id: "amounts",
      category: "pricing",
      question: "Quels sont les montants de financement disponibles ?",
      answer:
        "Nous finançons des stocks de 50 000 € jusqu’à 250 000 €, avec des extensions possibles selon la taille de votre entreprise et les volumes traités.",
    },
    {
      id: "speed",
      category: "model",
      question: "En combien de temps puis-je obtenir mon financement ?",
      answer:
        "Tout est conçu pour être instantané. Une fois votre stock déclaré et validé via notre plateforme, vous recevez votre financement immédiatement par virement bancaire. En général, tout est bouclé en moins de 24 heures.",
    },
    {
      id: "tpe",
      category: "eligibility",
      question: "Les TPE sont-elles éligibles à votre solution de financement ?",
      answer:
        "Oui, nous finançons aussi bien les TPE que les PME. Notre modèle est accessible dès le premier stock qualifié, sans exigence de notation bancaire contraignante ni caution personnelle des dirigeants.",
    },
    {
      id: "cost",
      category: "pricing",
      question: "Comment est calculé le coût du financement ?",
      answer:
        "Le coût dépend du type de produit et de son délai de revente. La tarification est simple et sans frais cachés : 0,05 % de frais journaliers sur le montant financé, et un frais de rachat pouvant aller jusqu’à 5 %, ajusté à la baisse si les produits tournent vite.",
    },
    {
      id: "early-repay",
      category: "pricing",
      question: "Puis-je rembourser mon financement à tout moment ?",
      answer:
        "Oui, vous avez une totale flexibilité pour racheter votre stock à tout moment. Plus vous revendez tôt, moins vous payez de frais journaliers, sans aucune pénalité de remboursement anticipé.",
    },
    {
      id: "stock-status",
      category: "security",
      question: "Que devient mon stock une fois financé ?",
      answer:
        "Notre solution fonctionne selon un modèle de portage : votre stock reste physiquement chez vous ou chez votre logisticien, mais Wavo en devient temporairement propriétaire légal. Vous le gérez comme d’habitude et le rachetez progressivement après chaque vente client.",
    },
    {
      id: "gage",
      category: "model",
      question: "Proposez-vous une alternative au gage sur stock ?",
      answer:
        "Oui, notre modèle remplace avantageusement le gage sur stock : aucun nantissement de fonds, aucune démarche lourde auprès du greffe du tribunal de commerce, et aucune immobilisation de crédit bancaire.",
    },
    {
      id: "diff-credit",
      category: "model",
      question: "En quoi Wavo est-il différent d’un crédit entreprise classique ?",
      answer:
        "Wavo n’est pas un crédit : nous rachetons temporairement vos produits en stock, que vous nous rachetez au fil des ventes. Vous ne contractez aucune dette, aucun engagement fixe mensuel, et votre bilan reste intact. C’est une solution plus souple qu’un emprunt bancaire, sans garantie personnelle et indexée sur votre activité réelle.",
    },
    {
      id: "confidential",
      category: "security",
      question: "Votre solution est-elle confidentielle ?",
      answer:
        "Oui, la confidentialité est absolue. Toutes les opérations sont invisibles pour vos clients finaux comme pour vos fournisseurs. Vous continuez à facturer et livrer sous votre propre marque. Aucun tiers n’est informé et aucune mention de Wavo n’apparaît sur les documents commerciaux.",
    },
  ] as FaqItem[],
  blogArticles: [
    {
      title: "Crédit in fine et crédit renouvelable : deux modes de financement d’entreprise",
      description:
        "Analyse comparative détaillée des structures de financement de trésorerie court terme et de leurs impacts sur le bilan.",
      image: "/assets/Credit-in-fine-vs-credit-renouvelable.webp",
      tag: "Trésorerie & Dette",
      readTime: "5 min de lecture",
      link: "https://www.wavo.fr/blog/credit-in-fine-credit-renouvelable/",
    },
    {
      title: "Financement non dilutif : une alternative stratégique à lever des fonds",
      description:
        "Comment financer son expansion commerciale et ses besoins de stocks sans céder des parts de capital aux investisseurs.",
      image: "/assets/financement-non-dilutif-une-alternative-strategique-a-lever-des-fonds.jpg",
      tag: "Croissance",
      readTime: "7 min de lecture",
      link: "https://www.wavo.fr/blog/financement-non-dilutif-une-alternative-strategique-a-lever-des-fonds/",
    },
    {
      title: "Wavo vs Gage sur Stock : Quelle solution pour financer votre stock ?",
      description:
        "Pourquoi le rachat temporaire de stock surpasse le gage traditionnel en souplesse, rapidité et coût global.",
      image: "/assets/wavo-vs-garantie-sur-stock-quelle-solution-pour-financer-votre-stock.jpg",
      tag: "Comparatif",
      readTime: "6 min de lecture",
      link: "https://www.wavo.fr/blog/wavo-vs-garantie-sur-stock-quelle-solution-pour-financer-votre-stock/",
    },
  ] as BlogArticle[],
  company: {
    name: "Wavo SAS",
    address: "Tour Part Dieu, 129 rue Servient, 69003 LYON",
    contactEmail: "contact@wavo.fr",
    phone: "+33 4 72 00 00 00",
    copyright: "Copyright © 2026 Wavo SAS - Tous droits réservés",
  },
};
