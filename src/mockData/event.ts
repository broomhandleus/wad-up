import {event, EventCategory, AgeLimitations} from "../types";

export const events: event[] = [
  {
      _id: "100",
      name: "Family Comedy",
      description: "A night of fun and laughs for everyone",
      datetime: "January 1, 2022 7 pm", // Once again need to worry about how this will be formatted
      locationName: "The Laugh Factory",
      location: {
          latitude: 33.7490, // numerical latlong seems to be the way to go for the Leaftlet map
          longitude: -84.3880,
      },
      category: EventCategory.comedy,
      host: "10",
      interestShown: 0,
      ageLimit: AgeLimitations.family,
      drinking: true,
      smoking: false,
  },
  {
      _id: "101",
      name: "Sportsball",
      description: "Watching the pros do the sports",
      datetime: "January 2, 2022 1 pm", // Once again need to worry about how this will be formatted
      locationName: "The Stadium",
      location: {
          latitude: 29.7604,
          longitude: -95.3698,
      },
      category: EventCategory.sporting,
      host: "11",
      interestShown: 0,
      ageLimit: AgeLimitations.family,
      drinking: true,
      smoking: true,
  },
  {
      _id: "102",
      name: "Music Show",
      description: "Loud Music and fun",
      datetime: "January 3, 2022 8 pm", // Once again need to worry about how this will be formatted
      locationName: "The Stage",
      location: {
          latitude: 34.0522,
          longitude: -118.2437,
      },
      category: EventCategory.music,
      host: "12",
      interestShown: 0,
      ageLimit: AgeLimitations.family,
      drinking: true,
      smoking: false,
  },
  {
      _id: "103",
      name: "Kids Event",
      description: "Kids playing on a playground",
      datetime: "January 4, 2022 12 pm", // Once again need to worry about how this will be formatted
      locationName: "The Playground",
      location: {
          latitude: 41.8781,
          longitude: -87.6298,
      },
      category: EventCategory.other,
      host: "12",
      interestShown: 0,
      ageLimit: AgeLimitations.family,
      drinking: false,
      smoking: false,
  },
  {
      _id: "104",
      name: "Adult Event",
      description: "Hanging out at a bar and having some drinks",
      datetime: "January 5, 2022 12 pm", // Once again need to worry about how this will be formatted
      locationName: "The Bar",
      location: {
          latitude: 40.7128,
          longitude: -74.0060,
      },
      category: EventCategory.other,
      host: "13",
      interestShown: 0,
      ageLimit: AgeLimitations.adult,
      drinking: true,
      smoking: true,
  },
  {
    _id: "105",
    name: "Sand Gnats Game",
    description: "Minor league baseball",
    datetime: "January 6, 2022 7 pm", // Once again need to worry about how this will be formatted
    locationName: "The Field",
    location: {
        latitude: 32.0809,
        longitude: -81.0912,
    },
    category: EventCategory.sporting,
    host: "10",
    interestShown: 0,
    ageLimit: AgeLimitations.family,
    drinking: true,
    smoking: false,
  },
  {
    _id: "106",
    name: "Building Demolition",
    description: "Watching things blow up",
    datetime: "January 7, 2022 1 pm", // Once again need to worry about how this will be formatted
    locationName: "The Building",
    location: {
        latitude: 33.4735,
        longitude: -82.0105,
    },
    category: EventCategory.other,
    host: "11",
    interestShown: 0,
    ageLimit: AgeLimitations.family,
    drinking: false,
    smoking: false,
  },
  {
    _id: "107",
    name: "Rock Climbing",
    description: "Defying gravity by climbing rocks",
    datetime: "January 8, 2022 10 am", // Once again need to worry about how this will be formatted
    locationName: "The Rock Wall",
    location: {
        latitude: 32.8407,
        longitude: -83.6324,
    },
    category: EventCategory.sporting,
    host: "12",
    interestShown: 0,
    ageLimit: AgeLimitations.family,
    drinking: false,
    smoking: false,
  },
  {
    _id: "109",
    name: "Concert",
    description: "Loud music and mosh pits",
    datetime: "January 9, 2022 8 pm", // Once again need to worry about how this will be formatted
    locationName: "the music venue",
    location: {
        latitude: 32.4610,
        longitude: -84.9877,
    },
    category: EventCategory.music,
    host: "13",
    interestShown: 0,
    ageLimit: AgeLimitations.family,
    drinking: false,
    smoking: false,
  },
]

// var faker = require('faker');

// function getRandomInRange(from: number, to: number): number {
//     return (Math.random() * (to - from));
// }

// function getRandomInt(max: number): number {
//     return Math.floor(Math.random() * Math.floor(max));
// }

// function getRandomCategory(): EventCategory {
//     const categories = [
//         EventCategory.sporting,
//         EventCategory.music,
//         EventCategory.comedy,
//         EventCategory.other
//     ]
//     return categories[getRandomInt(categories.length)];
// }

// function getRandomAgeLimit(): AgeLimitations {
//     const ageLimits = [
//         AgeLimitations.family,
//         AgeLimitations.adult,
//         AgeLimitations.teenage,
//     ]
//     return ageLimits[getRandomInt(ageLimits.length)];
// }

// function makeEvents(): event[] {
//     let events: event[] = [];
//     for (let i = 0; i < 100; i++) {
//         let newEvent: event = {
//             _id: faker.random.uuid(),
//             name: faker.lorem.word(),
//             description: faker.lorem.sentence(),
//             datetime: faker.date.soon(),
//             locationName: faker.company.companyName(),
//             location: {
//                 latitude: getRandomInRange(25, 49),
//                 longitude: getRandomInRange(-67, -124)
//             },
//             category: getRandomCategory(),
//             host: faker.random.uuid(), // eventually will need to link to a real host
//             interestShown: 0,
//             ageLimit: getRandomAgeLimit(),
//             drinking: faker.random.boolean(),
//             smoking: faker.random.boolean()
//         }
//         events.push(newEvent);
//     }

//     return events;
// }

// export const events = makeEvents();