export interface user {
    _id: string;
    username: string;
    password: string; // Don't know how to encryption yet, but gotta learn!
    email: string;
}

// Could possible have the host be an extension of user with more properties...
export interface host {
    _id: string;
    name: string;
    password: string;
    email: string;
    phone: string; // Are phone numbers best as strings?
    paymentMethod: PaymentMethod;
    subscriptionLevel: SubscriptionLevel;
}

// could be card or bank account? Gotta look into it more
export interface PaymentMethod {
    cardNumber: string;
    expiration: string;
    securityCode: string;
}

export enum SubscriptionLevel {
    bronze = "Bronze",
    silver = "Silver",
    gold = "Gold",
    platinum = "Platinum"
}

// Maybe include an image in the event somehow? can check on that later. will use faker image for now
export interface event {
    _id: string;
    name: string;
    description: string;
    datetime: string; // Need to seriously consider this type. Working with dates sucks so lets make this easy
    locationName: string;
    location: LatLong; // depends how we have them input this info. Needs some thought
    category: EventCategory;
    host: string; // _id of the host
    interestShown: number; // Just using a number here for the number of people to like the post so far. Must be updated
    ageLimit: AgeLimitations;
    drinking: boolean;
    smoking: boolean;
}

// Will need to check if string is the right choice here for those datapoints
export interface LatLong {
    latitude: string;
    longitude: string;
}

// Need more caategories! Each can be designated a color on the UI
export enum EventCategory {
    sporting = "Sporting",
    comedy = "Comedy",
    music = "Music",
    other = "Other"
}

// Definitely up for discussion here. We'll need a description of each to put in the UI so users know what they mean
export enum AgeLimitations {
    family = "Family",
    teenage = "Teenage",
    adult = "Adult"
}