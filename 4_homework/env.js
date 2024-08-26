// env.js
module.exports = {
    credentials: {
        standardUser: {
            username: 'standard_user',
            password: 'secret_sauce',
        },
    },
    items: {
        backpack: 'Sauce Labs Backpack',
        bikeLight: 'Sauce Labs Bike Light',
    },
    urls: {
        baseUrl: 'https://www.saucedemo.com/',
    },
    timeouts: {
        default: 5000,
    },
    sortingOptions: [
        'Name (A to Z)',
        'Name (Z to A)',
        'Price (low to high)',
        'Price (high to low)',
    ],
};

