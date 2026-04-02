const APP_DATA = {
  user: {
    name: 'Kalyani Sharma',
    firstName: 'Kalyani',
    initial: 'K',
    since: 'January 2025',
    intentions: ['Improve focus', 'Better sleep', 'Reduce brain fog'],
    dietary: 'Vegetarian',
    email: 'kalyani.sharma@email.com'
  },

  today: {
    date: '29 MARCH 2026',
    greeting: 'Good morning',
    mood: null
  },

  moods: [
    { color: '#7ab648', label: 'Great', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7ab648" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>' },
    { color: '#3b1e5e', label: 'Calm', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b1e5e" stroke-width="2" stroke-linecap="round"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>' },
    { color: '#d3c72d', label: 'Okay', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d3a12d" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>' },
    { color: '#e3505c', label: 'Low', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e3505c" stroke-width="2" stroke-linecap="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>' },
    { color: '#5a3a7e', label: 'Foggy', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5a3a7e" stroke-width="2" stroke-linecap="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>' }
  ],

  lastMeal: {
    name: 'Grilled Paneer Bowl',
    time: '12:45 PM',
    image: '',
    insight: 'Your lunch gave you steady brain fuel',
    nutrients: {
      'Sustained Energy': 82,
      'Brain Fuel': 75,
      'Gut Support': 60,
      'Hydration': 45
    }
  },

  logMealImage: '',

  recipes: [
    {
      id: 1,
      name: 'Warm Turmeric Lentil Soup',
      time: '25 min',
      benefit: 'Brain boost',
      image: '',
      ingredients: ['Red lentils', 'Turmeric', 'Coconut milk', 'Ginger', 'Garlic', 'Spinach', 'Cumin'],
      steps: [
        'Saute ginger and garlic in a pot for 2 minutes',
        'Add lentils, turmeric, and cumin. Stir for 1 minute',
        'Pour in coconut milk and 2 cups water. Bring to boil',
        'Simmer for 20 minutes until lentils are soft',
        'Stir in spinach, season with salt and pepper'
      ],
      description: 'When your mind feels heavy or scattered, this warm bowl can gently bring you back. Turmeric calms inflammation while lentils give your brain slow, steady fuel to think clearly again.',
      empathyNote: 'Good for days when you feel mentally exhausted or foggy.'
    },
    {
      id: 2,
      name: 'Berry Avocado Smoothie Bowl',
      time: '10 min',
      benefit: 'Clarity fuel',
      image: '',
      ingredients: ['Avocado', 'Mixed berries', 'Banana', 'Chia seeds', 'Almond milk', 'Honey'],
      steps: [
        'Blend avocado, berries, banana, and almond milk until smooth',
        'Pour into a bowl',
        'Top with chia seeds, sliced banana, and a drizzle of honey'
      ],
      description: 'When mornings feel sluggish and you need a gentle lift without caffeine jitters. The omega-3s in avocado nourish your brain while berries protect your focus throughout the day.',
      empathyNote: 'Perfect when you need a calm, energizing start to the day.'
    },
    {
      id: 3,
      name: 'Warm Quinoa & Roasted Veg Bowl',
      time: '20 min',
      benefit: 'Gut-friendly',
      image: '',
      ingredients: ['Quinoa', 'Roasted vegetables', 'Chickpeas', 'Tahini', 'Lemon', 'Fresh herbs'],
      steps: [
        'Cook quinoa according to package directions',
        'Roast vegetables at 200C for 15 minutes',
        'Toss quinoa with roasted veg and chickpeas',
        'Drizzle with tahini-lemon dressing',
        'Garnish with fresh herbs'
      ],
      description: 'Your gut and brain are deeply connected. When your stomach feels off, your mood follows. This bowl feeds the good bacteria that help regulate your emotions and energy.',
      empathyNote: 'Ideal when your digestion feels off or you are feeling emotionally drained.'
    },
    {
      id: 4,
      name: 'Calming Matcha Oat Bowl',
      time: '15 min',
      benefit: 'Sleep support',
      image: '',
      ingredients: ['Rolled oats', 'Matcha powder', 'Almond milk', 'Banana', 'Walnuts', 'Maple syrup'],
      steps: [
        'Cook oats with almond milk and matcha powder',
        'Top with sliced banana and walnuts',
        'Drizzle with maple syrup'
      ],
      description: 'If you have been sleeping poorly and dragging through the day, this bowl helps. L-theanine in matcha gives you calm focus without the crash, while oats release energy slowly so you don\'t burn out.',
      empathyNote: 'Recommended when you are sleep deprived or running on low energy.'
    },
    {
      id: 5,
      name: 'Soothing Ginger Khichdi',
      time: '30 min',
      benefit: 'Comfort meal',
      image: '',
      ingredients: ['Rice', 'Moong dal', 'Ginger', 'Turmeric', 'Ghee', 'Cumin seeds', 'Salt'],
      steps: [
        'Wash rice and dal together',
        'Heat ghee and add cumin seeds and ginger',
        'Add rice, dal, turmeric, and 4 cups water',
        'Pressure cook or simmer until soft and porridge-like',
        'Serve warm with a dollop of ghee'
      ],
      description: 'Sometimes you just need something simple and warm that feels like a hug. Khichdi is easy to digest and deeply nourishing when you are feeling overwhelmed or unwell.',
      empathyNote: 'For days when everything feels like too much and you need comfort.'
    },
    {
      id: 6,
      name: 'Mood-Lifting Dark Chocolate Bark',
      time: '15 min',
      benefit: 'Brain boost',
      image: '',
      ingredients: ['Dark chocolate (70%+)', 'Almonds', 'Dried cranberries', 'Pumpkin seeds', 'Sea salt'],
      steps: [
        'Melt dark chocolate in a double boiler',
        'Spread on parchment paper in a thin layer',
        'Top with almonds, cranberries, pumpkin seeds, and a pinch of sea salt',
        'Refrigerate for 30 minutes, then break into pieces'
      ],
      description: 'When you are craving something sweet but want to be kind to your brain. Dark chocolate releases endorphins and the magnesium in seeds helps calm anxiety.',
      empathyNote: 'A mindful treat when cravings hit or you need a small mood boost.'
    }
  ],

  // Currently selected/finalized recipe for grocery list
  selectedRecipe: null,

  groceryList: {
    produce: ['Spinach', 'Avocado', 'Mixed berries', 'Banana', 'Ginger', 'Garlic', 'Lemon'],
    protein: ['Red lentils', 'Chickpeas', 'Paneer', 'Quinoa'],
    pantry: ['Turmeric', 'Coconut milk', 'Almond milk', 'Chia seeds', 'Tahini', 'Matcha powder'],
    other: ['Honey', 'Maple syrup', 'Walnuts', 'Cumin']
  },

  energy: {
    level: { value: 72, status: 'Steady so far.', label: 'Energy Level' },
    sleep: { value: 85, hours: '7 hours 15 minutes', label: 'Sleep taken' },
    active: { value: 65, hours: '1 hour 55 minutes', label: 'Active minutes' },
    // New tangible metrics that don't overlap with nourish tab
    focus: { value: 68, label: 'Focus Duration', detail: '3h 20m deep work' },
    recovery: { value: 74, label: 'Recovery Score', detail: 'Good restoration overnight' },
    stamina: { value: 61, label: 'Afternoon Stamina', detail: 'Slight dip after 2 PM' },
    hrv: { value: 78, label: 'Heart Rate Variability', detail: '52ms avg - well regulated' }
  },

  energyInsights: [
    "You're in a good rhythm today. Keeping your meals balanced can help maintain this.",
    "On days you sleep less, your cravings increase by evening.",
    "You've been active but under-fueled. A warm, protein-rich meal could help stabilize energy."
  ],

  energyHistory: [
    { day: 'Mon', energy: 65, sleep: 78, active: 55, focus: 60, recovery: 70, stamina: 55 },
    { day: 'Tue', energy: 72, sleep: 82, active: 60, focus: 68, recovery: 72, stamina: 62 },
    { day: 'Wed', energy: 58, sleep: 70, active: 45, focus: 50, recovery: 65, stamina: 48 },
    { day: 'Thu', energy: 80, sleep: 90, active: 70, focus: 75, recovery: 80, stamina: 72 },
    { day: 'Fri', energy: 75, sleep: 85, active: 65, focus: 70, recovery: 76, stamina: 68 },
    { day: 'Sat', energy: 68, sleep: 75, active: 80, focus: 62, recovery: 71, stamina: 60 },
    { day: 'Sun', energy: 72, sleep: 85, active: 65, focus: 68, recovery: 74, stamina: 61 }
  ],

  brain: {
    clarityScore: 72,
    clarityTrend: '+4.2%',
    clarityLabel: 'Your clarity has been steady this week',
    moodVolatility: 'Improving',
    energyStability: 'Moderate',
    weeklyClarity: [64, 68, 60, 74, 70, 66, 72]
  },

  intelligenceSummary: [
    {
      icon: 'brain',
      iconClass: 'insight-icon-green',
      title: 'Afternoon crashes reduced by 30%.',
      desc: 'Focus levels are peaking between 2-4 PM.'
    },
    {
      icon: 'moon',
      iconClass: 'insight-icon-attention',
      title: 'Sleep inconsistency increasing.',
      desc: 'Your REM cycle was 15 mins shorter last night.'
    },
    {
      icon: 'strength',
      iconClass: 'insight-icon-positive',
      title: 'Protein stability improved.',
      desc: 'Consistent intake has balanced metabolic load.'
    }
  ],

  patternDiscovery: {
    icon: 'search',
    title: 'Pattern discovered',
    insight: 'On days you eat leafy greens for lunch, your afternoon energy stays 40% more stable.',
    confidence: 'Based on 18 days of data'
  },

  journalPrompts: [
    { text: 'What are you grateful for?' },
    { text: 'What do you feel low about?' },
    { text: 'What made you reflect?' }
  ],

  journalEntries: [
    {
      date: '28 March 2026',
      prompt: 'What are you grateful for?',
      text: 'Grateful for the morning walk today. The fresh air really cleared my mind and I felt more focused during work.',
      mood: 'Great'
    },
    {
      date: '27 March 2026',
      prompt: 'What made you reflect?',
      text: 'Noticed that after eating heavy lunch, I felt sluggish. Maybe lighter meals would help afternoon productivity.',
      mood: 'Okay'
    },
    {
      date: '26 March 2026',
      prompt: 'What do you feel low about?',
      text: 'Feeling stressed about upcoming deadlines. Need to remember to breathe and take breaks.',
      mood: 'Low'
    }
  ],

  knowledgeRoot: [
    { icon: 'supplement', title: 'Supplement you need', desc: 'Personalized based on your patterns', screen: 'knowledge-supplements' },
    { icon: 'brainfood', title: 'Brain food', desc: 'Foods that fuel mental clarity', screen: 'knowledge-brainfood' },
    { icon: 'podcast', title: 'Podcasts and blogs for mindfulness', desc: 'Curated content for your wellbeing', screen: 'knowledge-podcasts' }
  ],

  supplements: [
    {
      name: 'Vitamin D3',
      status: 'Low exposure',
      statusClass: 'chip-low',
      desc: 'Your indoor hours suggest limited sun exposure. Consider 1000-2000 IU daily.',
      icon: 'sun',
      tata1mgLink: 'https://www.1mg.com/categories/vitamins-supplements/vitamin-d-408',
      tata1mgName: 'Vitamin D3 supplements on Tata 1mg',
      price: 'From Rs.199'
    },
    {
      name: 'Magnesium Glycinate',
      status: 'Inconsistent',
      statusClass: 'chip-moderate',
      desc: 'Sleep patterns indicate possible deficiency. Magnesium glycinate before bed may help.',
      icon: 'moon',
      tata1mgLink: 'https://www.1mg.com/categories/vitamins-supplements/magnesium-1238',
      tata1mgName: 'Magnesium supplements on Tata 1mg',
      price: 'From Rs.249'
    },
    {
      name: 'Omega-3 (DHA/EPA)',
      status: 'Adequate',
      statusClass: 'chip-improving',
      desc: 'Your fish and nut intake provides good coverage. Keep it up!',
      icon: 'fish',
      tata1mgLink: 'https://www.1mg.com/categories/vitamins-supplements/omega-3-fatty-acids-404',
      tata1mgName: 'Omega-3 supplements on Tata 1mg',
      price: 'From Rs.349'
    },
    {
      name: 'Iron + Vitamin C',
      status: 'Improving',
      statusClass: 'chip-improving',
      desc: 'Leafy green intake has improved your iron markers over the past 2 weeks.',
      icon: 'leaf',
      tata1mgLink: 'https://www.1mg.com/categories/vitamins-supplements/iron-1237',
      tata1mgName: 'Iron supplements on Tata 1mg',
      price: 'From Rs.179'
    }
  ],

  brainFoods: [
    { name: 'Walnuts', benefit: 'Rich in omega-3, improves memory', image: '', icon: 'walnut', blinkitSearch: 'walnuts' },
    { name: 'Blueberries', benefit: 'Antioxidants protect brain cells', image: '', icon: 'berry', blinkitSearch: 'blueberries' },
    { name: 'Dark Chocolate', benefit: 'Flavonoids boost focus and mood', image: '', icon: 'chocolate', blinkitSearch: 'dark+chocolate' },
    { name: 'Spinach', benefit: 'Folate supports neural function', image: '', icon: 'leaf', blinkitSearch: 'spinach' },
    { name: 'Turmeric', benefit: 'Curcumin reduces inflammation', image: '', icon: 'spice', blinkitSearch: 'turmeric' },
    { name: 'Pumpkin Seeds', benefit: 'Zinc and magnesium for brain signaling', image: '', icon: 'seed', blinkitSearch: 'pumpkin+seeds' }
  ],

  podcasts: [
    { name: 'The Mindful Kitchen', type: 'Podcast', desc: 'Exploring the connection between food and mental wellbeing', icon: 'audio' },
    { name: 'Nourish Your Brain', type: 'Blog', desc: 'Evidence-based nutrition for cognitive performance', icon: 'article' },
    { name: 'Sleep & Eat Well', type: 'Podcast', desc: 'How your diet affects your sleep quality', icon: 'audio' },
    { name: 'The Clarity Diet', type: 'Blog', desc: 'Simple food swaps for better mental focus', icon: 'article' },
    { name: 'Gut Feelings', type: 'Podcast', desc: 'The gut-brain connection and what to eat about it', icon: 'audio' }
  ],

  nourishment: {
    steps: { value: '5,500', label: 'steps walked', icon: 'steps' },
    water: { value: '1.2 liters', label: 'water drunk', icon: 'water' },
    movement: { value: '1,068', label: 'movement energy', icon: 'fire' },
    sleep: { value: '7h 17m', label: 'total duration', icon: 'moon' }
  },

  nourishmentFlow: [
    { day: 'MON', value: 65, label: 'Lentil soup + morning walk' },
    { day: 'TUE', value: 80, label: 'Smoothie bowl + yoga session' },
    { day: 'WED', value: 55, label: 'Skipped lunch, low activity' },
    { day: 'THU', value: 90, label: 'Quinoa salad + evening run' },
    { day: 'FRI', value: 70, label: 'Balanced meals, moderate activity' },
    { day: 'SAT', value: 75, label: 'Home cooking + long walk' },
    { day: 'SUN', value: 72, label: 'Light meals, rest day' }
  ],

  macros: {
    protein: { consumed: 52, ideal: 120, unit: 'g', label: 'Protein', status: 'Moderate', color: '#3b1e5e' },
    carbs: { consumed: 140, ideal: 250, unit: 'g', label: 'Carbs', status: 'Irregular', color: '#5a3a7e' },
    fat: { consumed: 35, ideal: 65, unit: 'g', label: 'Fat', status: 'Within range', color: '#9b7fb8' },
    fiber: { consumed: 12, ideal: 30, unit: 'g', label: 'Fiber', status: 'Low', color: '#d3c72d' }
  },

  // Individual daily macro data for line graphs
  macroHistory: {
    protein: [28, 35, 22, 40, 32, 30, 35],
    carbs: [45, 38, 50, 35, 42, 40, 40],
    fat: [27, 27, 28, 25, 26, 30, 25],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },

  micros: {
    iron: { status: 'Improving', statusClass: 'improving', color: '#7ab648' },
    magnesium: { status: 'Inconsistent', statusClass: 'moderate', color: '#d3a12d' },
    vitaminD: { status: 'Low exposure', statusClass: 'low', color: '#e3505c' },
    zinc: { status: 'Adequate', statusClass: 'improving', color: '#3b1e5e' }
  },

  // Individual daily micro data for line graphs (% of RDA)
  microHistory: {
    iron: [55, 62, 48, 70, 65, 58, 68],
    magnesium: [40, 45, 35, 50, 42, 38, 44],
    vitaminD: [20, 22, 18, 25, 28, 30, 24],
    zinc: [60, 58, 55, 65, 62, 60, 63],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },

  physiqueDirections: [
    { id: 'physique-energy', name: 'Energy Sustenance', icon: 'bolt', color: '#d3c72d' },
    { id: 'physique-muscle', name: 'Muscle Recovery', icon: 'strength', color: '#3b1e5e' },
    { id: 'physique-weight', name: 'Body Rhythm', icon: 'wave', color: '#5a3a7e' },
    { id: 'physique-strength', name: 'Strength Progress', icon: 'weight', color: '#7ab648' },
    { id: 'physique-hydration', name: 'Hydration Recovery', icon: 'drop', color: '#e3505c' }
  ],

  physiqueData: {
    'physique-energy': {
      title: 'Energy Sustenance',
      score: 72,
      trend: 'Improving',
      insights: [
        'Your energy peaks between 10-11 AM after balanced breakfasts',
        'Afternoon dips correlate with high-carb lunches',
        'Evening walks help maintain steady energy into the night'
      ],
      recommendations: [
        'Include protein with every meal to sustain energy',
        'Try a 10-minute walk after lunch to prevent afternoon crashes',
        'Keep hydrated -- even mild dehydration drops energy by 20%'
      ],
      weekData: [65, 72, 58, 80, 75, 68, 72]
    },
    'physique-muscle': {
      title: 'Muscle Recovery',
      score: 65,
      trend: 'Stable',
      insights: [
        'Protein intake has been consistent this week',
        'Recovery is slower after poor sleep nights',
        'Your magnesium levels may be affecting recovery speed'
      ],
      recommendations: [
        'Aim for 20g protein within 30 mins of exercise',
        'Magnesium-rich foods (nuts, seeds) can improve recovery',
        'Quality sleep is your best recovery tool'
      ],
      weekData: [60, 62, 58, 68, 65, 64, 65]
    },
    'physique-weight': {
      title: 'Body Rhythm',
      score: 78,
      trend: 'Balanced',
      insights: [
        'Your body composition has been stable this month',
        'Hydration levels affect daily fluctuations more than food',
        'Consistent meal timing is supporting your rhythm'
      ],
      recommendations: [
        'Focus on how you feel, not numbers on a scale',
        'Regular meal timing helps your body find its rhythm',
        'Fiber-rich meals keep everything moving smoothly'
      ],
      weekData: [76, 77, 78, 77, 78, 79, 78]
    },
    'physique-strength': {
      title: 'Strength Progress',
      score: 60,
      trend: 'Building',
      insights: [
        'Active minutes have increased 15% this week',
        'Your protein-to-activity ratio is well balanced',
        'Rest days are contributing to better performance days'
      ],
      recommendations: [
        'Progressive overload -- gradually increase activity intensity',
        'Include complex carbs before workouts for fuel',
        'Don\'t skip rest days -- they\'re when strength actually builds'
      ],
      weekData: [55, 57, 56, 62, 60, 58, 60]
    },
    'physique-hydration': {
      title: 'Hydration Recovery',
      score: 58,
      trend: 'Needs attention',
      insights: [
        'You\'re averaging 1.2L daily -- below the 2L recommendation',
        'Hydration drops significantly after 3 PM',
        'Dehydration correlates with your afternoon brain fog episodes'
      ],
      recommendations: [
        'Set gentle reminders to drink water every 2 hours',
        'Eat water-rich foods: cucumber, watermelon, oranges',
        'Start your morning with a glass of warm water + lemon'
      ],
      weekData: [55, 60, 52, 58, 62, 56, 58]
    }
  },

  upliftQuote: 'You chose to show up for yourself today, Kalyani. Every balanced meal and mindful pause is quietly rewiring your focus and clarity. The fog lifts a little more each day -- trust the rhythm you are building.',

  reflection: {
    title: 'Afternoon Reflection',
    // Observational guidance instead of generic quote
    guidance: [
      {
        prompt: 'Notice your posture right now.',
        detail: 'Are your shoulders tense? Is your jaw clenched? Take a breath and soften where you find tension. Your body often holds stress before your mind registers it.'
      },
      {
        prompt: 'What did your last meal do for your energy?',
        detail: 'Think back to what you ate and how you felt 30 minutes after. Did it lift you up, weigh you down, or leave you unchanged? This awareness shapes better choices naturally.'
      },
      {
        prompt: 'How has your focus shifted since morning?',
        detail: 'Morning focus often differs from afternoon clarity. Notice where your attention wanders. This is not a flaw -- it is data about your natural rhythm.'
      }
    ]
  },

  settings: [
    { icon: 'bell', title: 'Notification Preferences', screen: 'settings' },
    { icon: 'palette', title: 'Appearance', screen: 'settings' },
    { icon: 'lock', title: 'Data & Privacy', screen: 'settings' },
    { icon: 'info', title: 'About Northwind', screen: 'settings' },
    { icon: 'logout', title: 'Log out', screen: 'settings' }
  ]
};
