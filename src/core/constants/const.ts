export const BASE_URL_MOOD = 'https://hologymoodapi-production.up.railway.app/predict_mood';

export const CBI_QUESTION_PERSONAL = [
  "Seberapa sering Anda merasa lelah?",
  "Seberapa sering Anda merasa kelelahan secara fisik?",
  "Seberapa sering Anda merasa kelelahan secara emosional?",
  "Seberapa sering Anda berpikir: “Saya tidak sanggup lagi”?",
  "Seberapa sering Anda merasa benar-benar terkuras?",
  "Seberapa sering Anda merasa lemah dan rentan terhadap penyakit?"
];

export const CBI_QUESTION_WORK = [
  "Apakah pekerjaan Anda terasa melelahkan secara emosional?",
  "Apakah Anda merasa kelelahan karena pekerjaan Anda?",
  "Apakah pekerjaan Anda membuat Anda frustrasi?",
  "Apakah Anda merasa terkuras di akhir hari kerja?",
  "Apakah Anda merasa lelah di pagi hari saat memikirkan hari kerja berikutnya?",
  "Apakah setiap jam kerja terasa melelahkan bagi Anda?",
  "Apakah Anda masih memiliki cukup energi untuk keluarga dan teman di waktu luang?"
];

export const CBI_QUESTION_CLIENT = [
  "Apakah Anda merasa sulit untuk bekerja dengan klien?",
  "Apakah bekerja dengan klien menguras energi Anda?",
  "Apakah Anda merasa frustrasi saat bekerja dengan klien?",
  "Apakah Anda merasa memberi lebih banyak daripada yang Anda terima saat bekerja dengan klien?",
  "Apakah Anda merasa lelah bekerja dengan klien?",
  "Apakah Anda kadang bertanya-tanya berapa lama lagi Anda sanggup terus bekerja dengan klien?"
];

// CBI Response options - First set (for frequency questions)
export const CBI_OPTIONS_FIRST_SET = [
  { id: 0, text: 'Selalu', value: 0 },
  { id: 1, text: 'Sering', value: 1 },
  { id: 2, text: 'Kadang-kadang', value: 2 },
  { id: 3, text: 'Jarang', value: 3 },
  { id: 4, text: 'Tidak Pernah / Hampir Tidak Pernah', value: 4 }
];

// CBI Response options - Second set (for degree questions)
export const CBI_OPTIONS_SECOND_SET = [
  { id: 0, text: 'Sangat Tinggi', value: 0 },
  { id: 1, text: 'Tinggi', value: 1 },
  { id: 2, text: 'Agak', value: 2 },
  { id: 3, text: 'Rendah', value: 3 },
  { id: 4, text: 'Sangat Rendah', value: 4 }
];

// Question configuration: which questions use which option set
export const CBI_QUESTION_CONFIG = [
  // Personal Burnout (0-5): All use first set
  { subscale: 'personal', optionSet: 'first' },
  { subscale: 'personal', optionSet: 'first' },
  { subscale: 'personal', optionSet: 'first' },
  { subscale: 'personal', optionSet: 'first' },
  { subscale: 'personal', optionSet: 'first' },
  { subscale: 'personal', optionSet: 'first' },
  
  // Work Burnout (6-12): Mixed sets
  { subscale: 'work', optionSet: 'second' },    // Q7: emotional exhaustion (degree)
  { subscale: 'work', optionSet: 'first' },     // Q8: burnt out (frequency)
  { subscale: 'work', optionSet: 'first' },     // Q9: frustrate (frequency)
  { subscale: 'work', optionSet: 'second' },    // Q10: worn out end of day (degree)
  { subscale: 'work', optionSet: 'second' },    // Q11: exhausted morning (degree)
  { subscale: 'work', optionSet: 'second' },    // Q12: every hour tiring (degree)
  { subscale: 'work', optionSet: 'first' },     // Q13: energy for family (frequency) - REVERSE
  
  // Client Burnout (13-18): Mixed sets
  { subscale: 'client', optionSet: 'second' },  // Q14: hard to work (degree)
  { subscale: 'client', optionSet: 'second' },  // Q15: drain energy (degree)
  { subscale: 'client', optionSet: 'second' },  // Q16: frustrating (degree)
  { subscale: 'client', optionSet: 'second' },  // Q17: give more than get (degree)
  { subscale: 'client', optionSet: 'first' },   // Q18: tired of working (frequency)
  { subscale: 'client', optionSet: 'first' }    // Q19: wonder how long (frequency)
];

