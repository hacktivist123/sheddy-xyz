'use strict'

module.exports = {
  url: 'https://sheddy.xyz',
  pathPrefix: '/',
  title: 'Shedrack Akintayo - Blog',
  subtitle: 'A Blog for byte sized articles on Software Development and Developer Relations.',
  disqusShortname: 'sheddyxyz',
  postsPerPage: 4,
  icon: 'static/photo.jpg',
  googleAnalyticsId: 'UA-123912722-2',
  useKatex: false,
  menu: [
    {
      label: 'Articles',
      path: '/'
    },
    {
      label: 'Talks',
      path: '/pages/talks'
    },
    {
      label: 'About me',
      path: '/pages/about'
    }
  ],
  author: {
    name: 'Shedrack Akintayo',
    photo:
      'https://res.cloudinary.com/hacktivist/image/upload/v1582900689/IMG_9816_pnaxcf.jpg',
    bio: `${'A Blog for byte sized articles on Software Development and Developer Relations. Shedrack Akintayo is a Software Developer and Developer Advocate 🥑.'}`,
    contacts: {
      email: 'akintayoshedrack@gmail.com',
      telegram: 'Nagato_Pain',
      twitter: 'coder_blvck',
      github: 'hacktivist123',
      linkedin: 'shedrackakintayo'
    }
  }
}
