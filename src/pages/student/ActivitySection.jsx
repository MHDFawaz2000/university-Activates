import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useLanguage } from '../../contexts/LanguageContext'
import Header from '../../components/Header'
import ActivityCard from '../../components/ActivityCard'
import { ArrowLeft, Filter, Search } from 'lucide-react'
import { getActivitiesBySection } from '../../data/activitiesData'

const ActivitySection = () => {
  const { section } = useParams()
  const { user } = useAuth()
  const { t, isRTL } = useLanguage()
  const [activities, setActivities] = useState([])
  const [filteredActivities, setFilteredActivities] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const sectionActivities = getActivitiesBySection(section)
    setActivities(sectionActivities)
    setFilteredActivities(sectionActivities)
  }, [section])

  useEffect(() => {
    let filtered = activities

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(activity => {
        const userResponse = activity.responses?.[user?.id]
        return filter === 'registered' ? userResponse === 'attend' : !userResponse
      })
    }

    setFilteredActivities(filtered)
  }, [activities, searchTerm, filter, user?.id])

  const handleActivityResponse = (activityId, response) => {
    setActivities(prev => prev.map(activity =>
      activity.id === activityId
        ? {
            ...activity,
            responses: {
              ...activity.responses,
              [user.id]: response
            },
            attendeeCount: response === 'attend' 
              ? (activity.responses?.[user.id] ? activity.attendeeCount : activity.attendeeCount + 1)
              : (activity.responses?.[user.id] === 'attend' ? activity.attendeeCount - 1 : activity.attendeeCount)
          }
        : activity
    ))
  }

  const getSectionTitle = () => {
    const titles = {
      sports: t('sportsActivities'),
      cultural: t('culturalEvents'),
      scientific: t('scientificPrograms'),
      extracurricular: t('extracurricularActivities')
    }
    return titles[section] || t('activities')
  }

  const getSectionEmoji = () => {
    const emojis = {
      sports: '🏃‍♂️',
      cultural: '🎭',
      scientific: '🔬',
      extracurricular: '🌟'
    }
    return emojis[section] || '📅'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/student/dashboard" 
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-4"
          >
            <ArrowLeft className={`h-5 w-5 ${isRTL ? 'rotate-180 ml-2' : 'mr-2'}`} />
            {t('backToDashboard')}
          </Link>
          
          <div className="flex items-center mb-4">
            <span className="text-4xl mr-4 rtl:ml-4 rtl:mr-0">{getSectionEmoji()}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{getSectionTitle()}</h1>
              <p className="text-gray-600">{t('discoverParticipate')} {section} {t('activities')}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-8 border-2 border-green-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400`} />
                <input
                  type="text"
                  placeholder={t('searchActivities')}
                  className={`${isRTL ? 'pr-10' : 'pl-10'} input-field focus:ring-green-500 focus:border-green-500`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Filter className="h-5 w-5 text-gray-500" />
              <select
                className="input-field w-auto min-w-[150px] focus:ring-green-500 focus:border-green-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">{t('allActivities')}</option>
                <option value="registered">{t('myRegistered')}</option>
                <option value="available">{t('available')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Activities Grid */}
        {filteredActivities.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onResponse={handleActivityResponse}
                userResponse={activity.responses?.[user?.id]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('noActivitiesFound')}</h3>
            <p className="text-gray-600">
              {searchTerm || filter !== 'all' 
                ? t('adjustCriteria')
                : t('noActivitiesYet')
              }
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default ActivitySection