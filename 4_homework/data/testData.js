import { sortingOptions, sortingOptionValues } from "./sorting_test_data";

export const testData = {

    standardUser: {
        name: "standard_user",
        password: "secret_sauce",
    },
    lockedOutUser: {
        name: "locked_out_user",
        password: "secret_sauce",
    },
    problemUser: {
        name: "problem_user",
        password: "secret_sauce",
    },
    performanceGlitchUser: {
        name: "performance_glitch_user",
        password: "secret_sauce",
    },
    errorUser: {
        name: "error_user",
        password: "secret_sauce",
    },
    visualUser: {
        name: "visual_user",
        password: "secret_sauce",
    },
    invalidUser: {
        title: "invalid_user",
        name: "invalid_user",
        password: "secret_sauce",
    },
    emptyUser: {
        title: "empty_user",
        name: "",
        password: "",
    },
    emptyPassword: {
        title: "empty_password",
        name: "standard_user",
        password: "",
    },
    emptyUsername: {
        title: "empty_username",
        name: "",
        password: "secret_sauce",
    },
    errorMessages: {
        lockedOutUserErrorMessage: "Epic sadface: Sorry, this user has been locked out.",
        loginErrorMessage: "Epic sadface: Username and password do not match any user in this service",
        emptyBodyLoginErrorMessage: "Epic sadface: Username is required",
        emptyPasswordLoginErrorMessage: "Epic sadface: Password is required",
        incorrectButtonLocation: "Button location is incorrect",
    },
    headers: {
        loginError: 'h3[data-test="error"]',
    },
    buttons: {
        addToCart: "Add to cart",
    },
    locators: {
        selectOption: ".select option",
        selectContainer: ".select_container",
        productSorting: ".product_sort_container",
    },
    defaultSortingOption: "Name (A to Z)",
    sortingOptionValues: sortingOptionValues,
    sortingOptions: sortingOptions,

    productName: {
        backpack: "Sauce Labs Backpack",
        light: "Sauce Labs Bike Light",
        shirt: "Sauce Labs Bolt T-Shirt",
        jacket: "Sauce Labs Fleece Jacket",
        onesie: "Sauce Labs Onesie",
        redShirt: "Test.allTheThings() T-Shirt (Red)",
    }





}
