import {event, EventCategory, AgeLimitations} from "../types";

export const events: event[] = [
    {
        _id: "100",
        name: "Family Comedy",
        description: "A night of fun and laughs for everyone",
        datetime: "January 1, 2022 7 pm", // Once again need to worry about how this will be formatted
        locationName: "The Laugh Factory",
        location: {
            latitude: "33.7490N", // Need to think about format of latlong as well
            longitude: "84.3880W",
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
            latitude: "19.7604N",
            longitude: "95.3698W",
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
            latitude: "34.0522N",
            longitude: "118.2437W",
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
            latitude: "41.8781N",
            longitude: "87.6298W",
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
            latitude: "40.7128N",
            longitude: "74.0060W",
        },
        category: EventCategory.other,
        host: "13",
        interestShown: 0,
        ageLimit: AgeLimitations.adult,
        drinking: true,
        smoking: true,
    },
]