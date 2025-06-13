import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { GraduationCap, Shield, BookOpen, Users, Phone, Mail, Globe, MapPin } from 'lucide-react'
import LanguageSwitcher from '../components/LanguageSwitcher'

const HomePage = () => {
  const { t, isRTL } = useLanguage()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="bg-green-600 p-3 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{t('footerTitle')}</h1>
                <p className="text-green-600 font-medium">{t('footerSubtitle')}</p>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
            {t('welcomeTitle')}
          </h2>
          <p className="text-xl text-gray-600 mb-12 animate-slide-up leading-relaxed">
            {t('welcomeSubtitle')}
          </p>

          {/* Login Options */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {/* Student Login */}
            <div className="card p-8 animate-slide-up border-2 border-green-100 hover:border-green-300 transition-all duration-300">
              <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t('studentPortal')}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t('studentPortalDesc')}
              </p>
              <Link to="/student/login" className="btn-primary w-full inline-block text-center">
                {t('studentLogin')}
              </Link>
            </div>

            {/* Admin Login */}
            <div className="card p-8 animate-slide-up border-2 border-green-100 hover:border-green-300 transition-all duration-300">
              <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t('adminPortal')}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t('adminPortalDesc')}
              </p>
              <Link to="/admin/login" className="btn-secondary w-full inline-block text-center">
                {t('adminLogin')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('activityCategories')}</h3>
            <p className="text-xl text-gray-600">{t('categoriesSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: '🏃‍♂️', 
                title: t('sports'), 
                desc: t('sportsDesc')
              },
              { 
                icon: '🎭', 
                title: t('cultural'), 
                desc: t('culturalDesc')
              },
              { 
                icon: '🔬', 
                title: t('scientific'), 
                desc: t('scientificDesc')
              },
              { 
                icon: '🌟', 
                title: t('extracurricular'), 
                desc: t('extracurricularDesc')
              }
            ].map((category, index) => (
              <div key={index} className="card p-6 text-center hover:scale-105 transition-transform duration-300 border-2 border-green-100 hover:border-green-300">
                <div className="text-4xl mb-4 animate-bounce-gentle">{category.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h4>
                <p className="text-gray-600 leading-relaxed">{category.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* University Logo & Name */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                <div className="bg-white p-2 rounded-lg">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{t('footerTitle')}</p>
                  <p className="text-green-100">{t('footerSubtitle')}</p>
                </div>
              </div>
            </div>
            
            {/* About Us */}
            <div>
              <h3 className="text-xl font-semibold mb-4">{t('aboutUs')}</h3>
              <p className="text-green-100 mb-4">{t('aboutUsText')}</p>
            </div>
            
            {/* Contact Us */}
            <div>
              <h3 className="text-xl font-semibold mb-4">{t('contactUs')}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <MapPin className="h-5 w-5 text-green-200 flex-shrink-0" />
                  <p className="text-green-100">{t('address')}</p>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Phone className="h-5 w-5 text-green-200 flex-shrink-0" />
                  <p className="text-green-100">{t('phoneNumber')}</p>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Mail className="h-5 w-5 text-green-200 flex-shrink-0" />
                  <p className="text-green-100">{t('email')}</p>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Globe className="h-5 w-5 text-green-200 flex-shrink-0" />
                  <a href={t('portalLink')} target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                    {t('portalLink')}
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-green-500 text-center text-green-200 text-sm">
            <p>&copy; {new Date().getFullYear()} {t('footerSubtitle')}. {t('allRightsReserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage