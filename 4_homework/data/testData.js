let password = "secret_sauce";

export const testData = {
    standardUser: {
        name: "standard_user",
        password: password,
    },
    lockedOutUser: {
        name: "locked_out_user",
        password: password,
    },
    problemUser: {
        name: "problem_user",
        password: password,
    },
    performanceGlitchUser: {
        name: "performance_glitch_user",
        password: password,
    },
    errorUser: {
        name: "error_user",
        password: password,
    },
    visualUser: {
        name: "visual_user",
        password: password,
    },
    invalidUser: {
        name: "invalid_user",
        password: password,
    },
    emptyUser: {
        name: "",
        password: "",
    },
    emptyPassword: {
        name: "standard_user",
        password: "",
    },
    emptyUsername: {
        name: "",
        password: password,
    },
    errorMessages: {
        loginErrorMessage: "Epic sadface: Username and password do not match any user in this service",
        lockedOutUserErrorMessage: "Epic sadface: Sorry, this user has been locked out.",
        emptyBodyLoginErrorMessage: "Epic sadface: Username is required",
        emptypasswordLoginErrorMessage: "Epic sadface: Password is required",
    },
    optionText: {
        nameAtoZ: "Name (A to Z)",
        nameZtoA: "Name (Z to A)",
        priceLowToHigh: "Price (low to high)",
        priceHighToLow: "Price (high to low)",
    },
    productPageTextValidation: "Products",
};