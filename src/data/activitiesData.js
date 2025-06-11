const sampleActivities = [
  // Sports Activities
  {
    id: '1',
    title: 'Football Championship Finals',
    description: 'Join us for the most exciting football match of the year! Two top teams will compete for the championship title in this thrilling finale.',
    category: 'Sports',
    date: '2024-03-15',
    time: '14:00',
    location: 'University Stadium',
    duration: '2 hours',
    image: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=500',
    attendeeCount: 156,
    responses: {}
  },
  {
    id: '2',
    title: 'Basketball Tournament',
    description: 'Annual inter-department basketball tournament featuring teams from all faculties. Come support your department!',
    category: 'Sports',
    date: '2024-03-20',
    time: '16:00',
    location: 'Sports Complex',
    duration: '3 hours',
    image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=500',
    attendeeCount: 89,
    responses: {}
  },
  {
    id: '3',
    title: 'Swimming Competition',
    description: 'University swimming championship with multiple categories for all skill levels. Professional coaches will be present.',
    category: 'Sports',
    date: '2024-03-25',
    time: '10:00',
    location: 'Aquatic Center',
    duration: '4 hours',
    image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=500',
    attendeeCount: 67,
    responses: {}
  },
  {
    id: '4',
    title: 'Tennis Singles Championship',
    description: 'Individual tennis competition for advanced players. Registration includes professional equipment and coaching tips.',
    category: 'Sports',
    date: '2024-03-30',
    time: '09:00',
    location: 'Tennis Courts',
    duration: '6 hours',
    image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=500',
    attendeeCount: 34,
    responses: {}
  },

  // Cultural Activities
  {
    id: '5',
    title: 'Cultural Night Spectacular',
    description: 'A mesmerizing evening featuring traditional dances, music performances, and cultural exhibitions from around the world.',
    category: 'Cultural',
    date: '2024-03-18',
    time: '19:00',
    location: 'Main Auditorium',
    duration: '3 hours',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=500',
    attendeeCount: 234,
    responses: {}
  },
  {
    id: '6',
    title: 'Art Exhibition Opening',
    description: 'Showcase of student artwork including paintings, sculptures, and digital art. Meet the artists and enjoy refreshments.',
    category: 'Cultural',
    date: '2024-03-22',
    time: '18:00',
    location: 'Art Gallery',
    duration: '2 hours',
    image: 'https://images.pexels.com/photos/1279813/pexels-photo-1279813.jpeg?auto=compress&cs=tinysrgb&w=500',
    attendeeCount: 98,
    responses: {}
  },
  {
    id: '7',
    title: 'Music Concert Series',
    description: 'Live performances by university bands and solo artists. Various genres including jazz, rock, and classical music.',
    category: 'Cultural',
    date: '2024-03-28',
    time: '20:00',
    location: 'Concert Hall',
    duration: '2.5 hours',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=500',
    attendeeCount: 187,
    responses: {}
  },
  {
    id: '8',
    title: 'Drama Festival',
    description: 'Student-directed plays and theatrical performances. Multiple shows throughout the evening with different themes.',
    category: 'Cultural',
    date: '2024-04-02',
    time: '17:00',
    location: 'Theater',
    duration: '4 hours',
    image: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=500',
    attendeeCount: 145,
    responses: {}
  },

  // Scientific Activities
  {
    id: '9',
    title: 'Research Symposium 2024',
    description: 'Annual presentation of student and faculty research projects across all scientific disciplines. Poster sessions and oral presentations.',
    category: 'Scientific',
    date: '2024-03-21',
    time: '13:00',
    location: 'Science Building',
    duration: '5 hours',
    image: 'https://images.pexels.com/photos/8566526/pexels-photo-8566526.jpeg?auto=compress&cs=tinysrgb&w=500',
    attendeeCount: 123,
    responses: {}
  },
  {
    id: '10',
    title: 'Innovation Workshop',
    description: 'Hands-on workshop focused on emerging technologies, innovation methodologies, and entrepreneurship in science.',
    category: 'Scientific',
    date: '2024-03-26',
    time: '14:00',
    location: 'Innovation Lab',
    duration: '3 hours',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=500',
    attendeeCount: 76,
    responses: {}
  },
  {
    id: '11',
    title: 'Science Fair',
    description: 'Interactive science demonstrations, experiments, and educational activities for all ages. Great for families and science enthusiasts.',
    category: 'Scientific',
    date: '2024-04-05',
    time: '10:00',
    location: 'Campus Quad',
    duration: '6 hours',
    image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=500',
    attendeeCount: 201,
    responses: {}
  },
  {
    id: '12',
    title: 'Guest Lecture: Climate Change',
    description: 'Renowned environmental scientist Dr. Sarah Johnson discusses current climate research and sustainable solutions.',
    category: 'Scientific',
    date: '2024-04-08',
    time: '15:00',
    location: 'Lecture Hall A',
    duration: '1.5 hours',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=500',
    attendeeCount: 89,
    responses: {}
  },

  // Extracurricular Activities
  {
    id: '13',
    title: 'Leadership Development Workshop',
    description: 'Comprehensive program designed to enhance leadership skills, teamwork, and personal development for future leaders.',
    category: 'Extracurricular',
    date: '2024-03-19',
    time: '11:00',
    location: 'Student Center',
    duration: '4 hours',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=500',
    attendeeCount: 67,
    responses: {}
  },
  {
    id: '14',
    title: 'Volunteer Day',
    description: 'Community service day where students participate in various volunteer activities around the local community.',
    category: 'Extracurricular',
    date: '2024-03-23',
    time: '08:00',
    location: 'Various Locations',
    duration: '8 hours',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=500',
    attendeeCount: 134,
    responses: {}
  },
  {
    id: '15',
    title: 'Photography Club Meetup',
    description: 'Monthly gathering of photography enthusiasts. Photo walk, technique sharing, and critique sessions included.',
    category: 'Extracurricular',
    date: '2024-03-27',
    time: '16:30',
    location: 'Campus Gardens',
    duration: '2 hours',
    image: 'https://images.pexels.com/photos/1983032/pexels-photo-1983032.jpeg?auto=compress&cs=tinysrgb&w=500',
    attendeeCount: 43,
    responses: {}
  },
  {
    id: '16',
    title: 'Debate Club Tournament',
    description: 'Inter-university debate competition covering current affairs, ethics, and academic topics. All skill levels welcome.',
    category: 'Extracurricular',
    date: '2024-04-01',
    time: '13:00',
    location: 'Debate Hall',
    duration: '5 hours',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=500',
    attendeeCount: 56,
    responses: {}
  }
]

export const getActivitiesBySection = (section) => {
  return sampleActivities.filter(activity => 
    activity.category.toLowerCase() === section.toLowerCase()
  )
}

export const getAllActivities = () => {
  return sampleActivities
}

export const getActivityById = (id) => {
  return sampleActivities.find(activity => activity.id === id)
}