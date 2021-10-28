import faker from 'faker';
import { v4 as uuid } from 'uuid';

function cardFactory() {
  return {
    id: uuid(),
    jobTitle: faker.name.jobTitle(),
    companyName: faker.company.companyName(),
    createdAt: faker.date.past(),
  };
}

function cardsFactory(numberOfObjects) {
  return [...Array(numberOfObjects).keys()].map(cardFactory);
}

export const mockIconsNames = {
  bookmarked: 'bookmarked',
  'application-sent': 'send',
  'application-viewed': 'eye',
  'interview-secured': 'interview',
  'final-outcome': 'lamp',
};

export const mockBoard = {
  data: {
    id: uuid(),
    createdAt: '2021-04-08T18:57:19.971Z',
    updatedAt: '2021-04-08T18:57:19.971Z',
    name: 'Muller',
    type: 'tracked',
    deletedAt: null,
    swimlanes: [
      {
        id: uuid(),
        name: 'Bookmarked',
        type: 'bookmarked',
        subTitle: '# Cards',
        iconName: 'bookmarked',
        position: 0,
        jobCards: cardsFactory(5),
      },
      {
        id: uuid(),
        name: 'Application Sent',
        type: 'application-sent',
        subTitle: '# Cards',
        iconName: 'send',
        position: 1,
        jobCards: cardsFactory(2),
      },
      {
        id: uuid(),
        name: 'Application Viewed',
        type: 'application-viewed',
        subTitle: '# Cards',
        iconName: 'viewed',
        position: 2,
        jobCards: cardsFactory(2),
      },
      {
        id: uuid(),
        name: 'Interview Secured',
        type: 'interview-secured',
        subTitle: '# Cards',
        iconName: 'interview',
        position: 3,
        jobCards: cardsFactory(3),
      },
      {
        id: uuid(),
        name: 'Final Outcome',
        type: 'final-outcome',
        subTitle: '# Cards',
        iconName: 'lamp',
        position: 4,
        jobCards: cardsFactory(1),
      },
    ],
  },
};
