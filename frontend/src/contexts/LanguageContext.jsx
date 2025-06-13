import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

const translations = {
  en: {
    // Navigation & Common
    home: 'Home',
    login: 'Login',
    logout: 'Logout',
    dashboard: 'Dashboard',
    back: 'Back',
    search: 'Search',
    filter: 'Filter',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    close: 'Close',
    loading: 'Loading...',
    
    // Home Page
    welcomeTitle: 'Welcome to University Activities',
    welcomeSubtitle: 'Discover, participate, and engage with exciting activities across our campus. From sports to cultural events, find your passion and connect with fellow students.',
    studentPortal: 'Student Portal',
    studentPortalDesc: 'Access activities, register for events, and track your participation.',
    adminPortal: 'Administrator Portal',
    adminPortalDesc: 'Manage activities, track engagement, and oversee student participation.',
    studentLogin: 'Student Login',
    adminLogin: 'Admin Login',
    activityCategories: 'Activity Categories',
    categoriesSubtitle: 'Explore diverse opportunities for growth and engagement',
    
    // Categories
    sports: 'Sports',
    cultural: 'Cultural',
    scientific: 'Scientific',
    extracurricular: 'Extracurricular',
    sportsDesc: 'Athletic events, tournaments, and fitness activities',
    culturalDesc: 'Arts, performances, exhibitions, and cultural celebrations',
    scientificDesc: 'Research presentations, workshops, and academic conferences',
    extracurricularDesc: 'Clubs, societies, and special interest groups',
    
    // Login Pages
    studentLoginTitle: 'Student Login',
    studentLoginSubtitle: 'Enter your 9-digit university ID to access activities',
    adminLoginTitle: 'Administrator Login',
    adminLoginSubtitle: 'Access the administrative dashboard',
    studentId: 'Student ID',
    email: 'Email Address',
    password: 'Password',
    loggingIn: 'Logging in...',
    firstTimeUser: 'First time using the platform?',
    useOfficialId: 'Use your official 9-digit student ID provided by the university registrar.',
    demoCredentials: 'Demo Credentials',
    
    // Registration
    studentRegisterTitle: 'Student Registration',
    studentRegisterSubtitle: 'Create your account to access university activities',
    name: 'Full Name',
    phone: 'Phone Number',
    confirmPassword: 'Confirm Password',
    registering: 'Registering...',
    register: 'Register',
    alreadyHaveAccount: 'Already have an account?',
    importantInfo: 'Important Information',
    registrationInfo: 'Please ensure all information is accurate. Your student ID must match your university records.',
    
    // Student Dashboard
    welcomeBack: 'Welcome back',
    discoverActivities: 'Discover and participate in exciting activities across campus',
    activitiesAttended: 'Activities Attended',
    registeredEvents: 'Registered Events',
    pointsEarned: 'Points Earned',
    recentActivity: 'Your Recent Activity',
    attended: 'Attended',
    registered: 'Registered',
    completed: 'Completed',
    
    // Admin Dashboard
    adminDashboard: 'Admin Dashboard',
    adminWelcome: 'Manage activities and track student engagement.',
    overview: 'Overview',
    manageActivities: 'Manage Activities',
    analytics: 'Analytics',
    settings: 'Settings',
    totalActivities: 'Total Activities',
    studentRegistrations: 'Student Registrations',
    activeStudents: 'Active Students',
    completionRate: 'Completion Rate',
    recentRegistrations: 'Recent Registrations',
    popularActivities: 'Popular Activities',
    configurationOptions: 'Configuration options will be available here.',
    
    // Activity Management
    activityManagement: 'Activity Management',
    addActivity: 'Add Activity',
    searchActivities: 'Search activities...',
    allCategories: 'All Categories',
    activity: 'Activity',
    category: 'Category',
    date: 'Date',
    attendees: 'Attendees',
    actions: 'Actions',
    createNewActivity: 'Create New Activity',
    editActivity: 'Edit Activity',
    activityDetails: 'Activity Details',
    activityTitle: 'Activity Title',
    description: 'Description',
    location: 'Location',
    time: 'Time',
    duration: 'Duration',
    imageUrl: 'Image URL',
    activityStatistics: 'Activity Statistics',
    createActivity: 'Create Activity',
    saveChanges: 'Save Changes',
    deleteConfirm: 'Are you sure you want to delete this activity?',
    
    // Analytics
    monthlyRegistrations: 'Monthly Registrations',
    activitiesByCategory: 'Activities by Category',
    topPerformingActivities: 'Top Performing Activities',
    registrations: 'Registrations',
    completionRateLabel: 'Completion Rate',
    performance: 'Performance',
    
    // Activities Section
    sportsActivities: 'Sports Activities',
    culturalEvents: 'Cultural Events',
    scientificPrograms: 'Scientific Programs',
    extracurricularActivities: 'Extracurricular Activities',
    backToDashboard: 'Back to Dashboard',
    discoverParticipate: 'Discover and participate in',
    allActivities: 'All Activities',
    myRegistered: 'My Registered',
    available: 'Available',
    noActivitiesFound: 'No activities found',
    adjustCriteria: 'Try adjusting your search or filter criteria',
    noActivitiesYet: 'No activities available in this section yet',
    
    // Activity Card
    willAttend: 'I will attend',
    not_attend: 'I will not attend',
    timeNotConvenient: 'Time not convenient',
    attending: 'attending',
    yourResponse: 'Your response',
    
    // Footer
    footerTitle: 'University Activities Platform',
    footerSubtitle: 'Al-Zaytoonah University of Jordan',
    aboutUs: 'About Us',
    aboutUsText: 'Al-Zaytoonah Private University of Jordan was established in 1993 after receiving its license and general accreditation by Decision No. 848 on March 6, 1993.',
    contactUs: 'Contact Us',
    address: 'Queen Alia Airport St 594, Amman.',
    portalLink: 'https://portal.zuj.edu.jo/',
    phoneNumber: '+(962) 6429 1511',
    email: 'Email',
    allRightsReserved: 'All Rights Reserved'
  },
  ar: {
    // Navigation & Common
    home: 'الرئيسية',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    dashboard: 'لوحة التحكم',
    back: 'رجوع',
    search: 'بحث',
    filter: 'تصفية',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    view: 'عرض',
    close: 'إغلاق',
    loading: 'جاري التحميل...',
    
    // Home Page
    welcomeTitle: 'مرحباً بكم في أنشطة الجامعة',
    welcomeSubtitle: 'اكتشف وشارك وتفاعل مع الأنشطة المثيرة في جميع أنحاء الحرم الجامعي. من الرياضة إلى الفعاليات الثقافية، اعثر على شغفك وتواصل مع زملائك الطلاب.',
    studentPortal: 'بوابة الطلاب',
    studentPortalDesc: 'الوصول إلى الأنشطة والتسجيل في الفعاليات وتتبع مشاركتك.',
    adminPortal: 'بوابة الإدارة',
    adminPortalDesc: 'إدارة الأنشطة وتتبع المشاركة والإشراف على مشاركة الطلاب.',
    studentLogin: 'دخول الطلاب',
    adminLogin: 'دخول الإدارة',
    activityCategories: 'فئات الأنشطة',
    categoriesSubtitle: 'استكشف فرص متنوعة للنمو والمشاركة',
    
    // Categories
    sports: 'الرياضة',
    cultural: 'الثقافية',
    scientific: 'العلمية',
    extracurricular: 'اللاصفية',
    sportsDesc: 'الفعاليات الرياضية والبطولات وأنشطة اللياقة البدنية',
    culturalDesc: 'الفنون والعروض والمعارض والاحتفالات الثقافية',
    scientificDesc: 'العروض البحثية وورش العمل والمؤتمرات الأكاديمية',
    extracurricularDesc: 'النوادي والجمعيات ومجموعات الاهتمامات الخاصة',
    
    // Login Pages
    studentLoginTitle: 'دخول الطلاب',
    studentLoginSubtitle: 'أدخل رقم الجامعة المكون من 9 أرقام للوصول إلى الأنشطة',
    adminLoginTitle: 'دخول الإدارة',
    adminLoginSubtitle: 'الوصول إلى لوحة التحكم الإدارية',
    studentId: 'رقم الطالب',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    loggingIn: 'جاري تسجيل الدخول...',
    firstTimeUser: 'هل تستخدم المنصة لأول مرة؟',
    useOfficialId: 'استخدم رقم الطالب الرسمي المكون من 9 أرقام المقدم من مسجل الجامعة.',
    demoCredentials: 'بيانات تجريبية',
    
    // Registration
    studentRegisterTitle: 'تسجيل الطالب',
    studentRegisterSubtitle: 'أنشئ حسابك للوصول إلى أنشطة الجامعة',
    name: 'الاسم الكامل',
    phone: 'رقم الهاتف',
    confirmPassword: 'تأكيد كلمة المرور',
    registering: 'جاري التسجيل...',
    register: 'تسجيل',
    alreadyHaveAccount: 'هل لديك حساب بالفعل؟',
    importantInfo: 'معلومات مهمة',
    registrationInfo: 'يرجى التأكد من صحة جميع المعلومات. يجب أن يتطابق رقم الطالب مع سجلات الجامعة.',
    
    // Student Dashboard
    welcomeBack: 'مرحباً بعودتك',
    discoverActivities: 'اكتشف وشارك في الأنشطة المثيرة في جميع أنحاء الحرم الجامعي',
    activitiesAttended: 'الأنشطة المحضورة',
    registeredEvents: 'الفعاليات المسجلة',
    pointsEarned: 'النقاط المكتسبة',
    recentActivity: 'نشاطك الأخير',
    attended: 'حضر',
    registered: 'مسجل',
    completed: 'مكتمل',
    
    // Admin Dashboard
    adminDashboard: 'لوحة تحكم الإدارة',
    adminWelcome: 'إدارة الأنشطة وتتبع مشاركة الطلاب.',
    overview: 'نظرة عامة',
    manageActivities: 'إدارة الأنشطة',
    analytics: 'التحليلات',
    settings: 'الإعدادات',
    totalActivities: 'إجمالي الأنشطة',
    studentRegistrations: 'تسجيلات الطلاب',
    activeStudents: 'الطلاب النشطون',
    completionRate: 'معدل الإنجاز',
    recentRegistrations: 'التسجيلات الأخيرة',
    popularActivities: 'الأنشطة الشائعة',
    configurationOptions: 'خيارات التكوين ستكون متاحة هنا.',
    
    // Activity Management
    activityManagement: 'إدارة الأنشطة',
    addActivity: 'إضافة نشاط',
    searchActivities: 'البحث في الأنشطة...',
    allCategories: 'جميع الفئات',
    activity: 'النشاط',
    category: 'الفئة',
    date: 'التاريخ',
    attendees: 'الحضور',
    actions: 'الإجراءات',
    createNewActivity: 'إنشاء نشاط جديد',
    editActivity: 'تعديل النشاط',
    activityDetails: 'تفاصيل النشاط',
    activityTitle: 'عنوان النشاط',
    description: 'الوصف',
    location: 'الموقع',
    time: 'الوقت',
    duration: 'المدة',
    imageUrl: 'رابط الصورة',
    activityStatistics: 'إحصائيات النشاط',
    createActivity: 'إنشاء النشاط',
    saveChanges: 'حفظ التغييرات',
    deleteConfirm: 'هل أنت متأكد من أنك تريد حذف هذا النشاط؟',
    
    // Analytics
    monthlyRegistrations: 'التسجيلات الشهرية',
    activitiesByCategory: 'الأنشطة حسب الفئة',
    topPerformingActivities: 'الأنشطة الأفضل أداءً',
    registrations: 'التسجيلات',
    completionRateLabel: 'معدل الإنجاز',
    performance: 'الأداء',
    
    // Activities Section
    sportsActivities: 'الأنشطة الرياضية',
    culturalEvents: 'الفعاليات الثقافية',
    scientificPrograms: 'البرامج العلمية',
    extracurricularActivities: 'الأنشطة اللاصفية',
    backToDashboard: 'العودة إلى لوحة التحكم',
    discoverParticipate: 'اكتشف وشارك في',
    allActivities: 'جميع الأنشطة',
    myRegistered: 'المسجلة لي',
    available: 'المتاحة',
    noActivitiesFound: 'لم يتم العثور على أنشطة',
    adjustCriteria: 'حاول تعديل معايير البحث أو التصفية',
    noActivitiesYet: 'لا توجد أنشطة متاحة في هذا القسم بعد',
    
    // Activity Card
    willAttend: 'سأحضر',
    not_attend: 'لن أحضر',
    timeNotConvenient: 'الوقت غير مناسب',
    attending: 'حاضر',
    yourResponse: 'ردك',
    
    // Footer
    footerTitle: 'منصة أنشطة الجامعة',
    footerSubtitle: 'جامعة الزيتونة الأردنية',
    aboutUs: 'من نحن',
    aboutUsText: 'تأسست جامعة الزيتونة الأردنية الخاصة في عام 1993 بعد حصولها على ترخيصها واعتمادها العام بموجب القرار رقم 848 في 6 مارس 1993.',
    contactUs: 'اتصل بنا',
    address: 'شارع مطار الملكة علياء 594، عمان.',
    portalLink: 'https://portal.zuj.edu.jo/',
    phoneNumber: '+(962) 6429 1511',
    email: 'الايميل',
    allRightsReserved: 'جميع الحقوق محفوظة'
  }
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')
  const [isRTL, setIsRTL] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en'
    setLanguage(savedLanguage)
    setIsRTL(savedLanguage === 'ar')
    
    // Update document direction and language
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = savedLanguage
  }, [])

  const switchLanguage = (newLanguage) => {
    setLanguage(newLanguage)
    setIsRTL(newLanguage === 'ar')
    localStorage.setItem('language', newLanguage)
    
    // Update document direction and language
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLanguage
  }

  const t = (key) => {
    return translations[language][key] || key
  }

  const value = {
    language,
    isRTL,
    switchLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}