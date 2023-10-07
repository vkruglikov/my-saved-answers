const answers = [
  {
    id: 'aboutMe',
    type: 'article',
    title: 'Greeting',
    tags: ['HR'],
    thumb: '/assets/me.png',
    message: {
      text:
        "Hello! I'm a frontend developer. 😊\n" +
        '\n' +
        "I have over 10 years of experience in web development, focusing exclusively on frontend for the last 7 years. I'm 30 years old. In my free time, I enjoy playing table tennis, and swimming, and have been living in the tropics for the past 4 years. ☀️",
    },
  },
  {
    id: 'noBetting',
    type: 'article',
    title: 'No no, no betting projects',
    tags: ['HR'],
    description:
      'Fast reply for recruiters who hiring for betting and casino projects',
    message: {
      text:
        'Excuse me, I am not interested in betting or casino projects. \n' +
        "Please don't offer it to me. I value both my and your time. \n" +
        '\n' +
        'Thanks! 😊',
    },
  },
  {
    id: 'contacts',
    type: 'article',
    title: 'Contacts',
    tags: ['HR'],
    description: 'My Github and Telegram links',
    message: {
      text:
        'Github: https://github.com/vkruglikov\n' +
        'Telegram: https://t.me/devn1',
    },
  },
  {
    id: 'aboutReactPackage',
    type: 'article',
    title: 'About react-telegram-web-app',
    tags: ['Other'],
    description:
      'My open source project react-telegram-web-app for Telegram.WebApp api',
    message: {
      text:
        "For applications built with React, I've created a package containing useful hooks and UI components tailored for Telegram WebApps. It includes implementations of components like MainButton and BackButton, and many callback functions have been converted to promises. 😊\n" +
        '\n' +
        'GitHub: https://github.com/vkruglikov/react-telegram-web-app\n' +
        '\n' +
        "The GitHub repository is constantly evolving, and we welcome everyone's suggestions and contributions. Feel free to check it out and contribute. Welcome, everyone! ",
    },
  },
  {
    id: 'Newton',
    type: 'photo',
    title: 'Isaac Newton',
    thumb: '/assets/isaac-newton.jpg',
    tags: ['People'],
    message: {
      photoUrl: '/assets/isaac-newton.jpg',
      text:
        'Isaac Newton\n' +
        '\n' +
        'Born in 1643 in Woolsthorpe, England, Sir Isaac Newton began developing his theories on light, calculus ' +
        'and celestial mechanics while on break from Cambridge University. Years of research culminated with the 1687 ' +
        'publication of “Principia,” a landmark work that established the universal laws of motion and gravity.',
    },
  },
  {
    id: 'Columbus',
    type: 'photo',
    title: 'Christopher Columbus',
    thumb: '/assets/christopher-columbus_thumb.jpg',
    tags: ['People'],
    message: {
      photoUrl: '/assets/christopher-columbus.jpg',
      text:
        'Christopher Columbus was an Italian explorer that sailed west in search of a trading route; his ambition ' +
        'changed the world. Columbus is credited with discovering the Caribbean and subsequently South America; his ' +
        'discovery began the European colonization of North and South America.',
    },
  },
  {
    id: 'my-cat-1',
    type: 'photo',
    title: 'My cat',
    inlineQuery: 'my cat',
    tags: ['Other'],
    thumb: '/assets/mycat1_thumb.jpg',
    description:
      'Collection of photos for when I need to send a photo of my cat',
    message: {
      photoUrl: '/assets/mycat1.png',
    },
  },
  {
    id: 'my-cat-2',
    hidden: true,
    type: 'photo',
    title: 'My cat photo 2',
    tags: [],
    thumb: '/assets/mycat2_thumb.jpg',
    description:
      'Collection of photos for when I need to send a photo of my cat',
    message: {
      photoUrl: '/assets/mycat2.png',
    },
  },
  {
    id: 'my-cat-3',
    hidden: true,
    type: 'photo',
    title: 'My cat photo 3',
    tags: [],
    thumb: '/assets/mycat3_thumb.jpg',
    description:
      'Collection of photos for when I need to send a photo of my cat',
    message: {
      photoUrl: '/assets/mycat3.png',
    },
  },
  {
    id: 'myfriendjokes',
    type: 'article',
    title: 'When my friend has joked',
    tags: ['Other'],
    message: {
      text:
        '))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))' +
        '))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))' +
        '))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))' +
        '))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))',
    },
  },
];

const visibleAnswers = answers.filter(item => !item.hidden);

module.exports = { answers, visibleAnswers };
