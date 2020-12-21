import {host, SubscriptionLevel} from "../types";

export const hosts: host[] = [
    {
        _id: "10",
        name: "Maxwell Broom",
        password: "abc123",
        email: "max@mail.com" ,
        phone: "1234567890",
        paymentMethod: {
            cardNumber: "1111222233334444",
            expiration: "01/25",
            securityCode: "123"
        },
        subscriptionLevel: SubscriptionLevel.bronze
    },
    {
        _id: "11",
        name: "Buster Burton",
        password: "abc123",
        email: "buster@mail.com" ,
        phone: "1234567890",
        paymentMethod: {
            cardNumber: "1111222233334444",
            expiration: "01/25",
            securityCode: "123"
        },
        subscriptionLevel: SubscriptionLevel.silver
    },
    {
        _id: "12",
        name: "John Smith",
        password: "abc123",
        email: "john@mail.com" ,
        phone: "1234567890",
        paymentMethod: {
            cardNumber: "1111222233334444",
            expiration: "01/25",
            securityCode: "123"
        },
        subscriptionLevel: SubscriptionLevel.gold
    },
    {
        _id: "13",
        name: "Jane Smith",
        password: "abc123",
        email: "jane@mail.com" ,
        phone: "1234567890",
        paymentMethod: {
            cardNumber: "1111222233334444",
            expiration: "01/25",
            securityCode: "123"
        },
        subscriptionLevel: SubscriptionLevel.platinum
    },
]