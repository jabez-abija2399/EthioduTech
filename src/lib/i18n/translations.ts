export type SupportedLanguage = 'en' | 'am' | 'om'

export interface TranslationDictionary {
  brandName: string
  dashboard: string
  teacherPortal: string
  parentPortal: string
  signOut: string
  login: string
  getStarted: string
  welcomeStudent: string
  courseProgress: string
  lessonsCompleted: string
  installApp: string
  liveStream: string
  paymentHeader: string
  xpPoints: string
  streakDays: string
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    brandName: "Edutech Platform",
    dashboard: "Student Dashboard",
    teacherPortal: "Teacher Portal",
    parentPortal: "Parent Portal",
    signOut: "Sign Out",
    login: "Log in",
    getStarted: "Get Started",
    welcomeStudent: "Welcome Back",
    courseProgress: "Course Progress",
    lessonsCompleted: "Lessons Completed",
    installApp: "Install App",
    liveStream: "Live Classroom Stream",
    paymentHeader: "Ethiopian Local Payments",
    xpPoints: "XP Points",
    streakDays: "Day Streak",
  },
  am: {
    brandName: "እዱቴክ ፕላትፎርም",
    dashboard: "የተማሪ ዳሽቦርድ",
    teacherPortal: "የመምህራን ፖርታል",
    parentPortal: "የወላጆች ፖርታል",
    signOut: "ውጣ",
    login: "ግበዉ",
    getStarted: "ጀምር",
    welcomeStudent: "እንኳን ደህና መጡ",
    courseProgress: "የትምህርት ሂደት",
    lessonsCompleted: "የተጠናቀቁ ትምህርቶች",
    installApp: "መተግበሪያ ጫን",
    liveStream: "ቀጥታ ክፍል ስርጭት",
    paymentHeader: "የኢትዮጵያ ክፍያዎች",
    xpPoints: "ኤክስፒ ነጥቦች",
    streakDays: "ቀጣይ ቀናት",
  },
  om: {
    brandName: "Miseensa Edutech",
    dashboard: "Daashboordii Barataa",
    teacherPortal: "Poortaal Barsiisaa",
    parentPortal: "Poortaal Warraa",
    signOut: "Ba'i",
    login: "Seeni",
    getStarted: "Jalqabi",
    welcomeStudent: "Baga Nagaan Dhufte",
    courseProgress: "Guddina Barnootaa",
    lessonsCompleted: "Barnoota Xumuraman",
    installApp: "Appii Fe'i",
    liveStream: "Tamsaasa Kallattii",
    paymentHeader: "Kaffaltii Biyya Keessaa",
    xpPoints: "Qabxii XP",
    streakDays: "Guyyoota Walitti Aanan",
  },
}

export function getTranslation(lang: SupportedLanguage, key: keyof TranslationDictionary): string {
  const dict = translations[lang] || translations.en
  return dict[key] || translations.en[key] || key
}
