export const sortingOptions = {
    nameAToZ: {
        dropdownOption: "Name (A to Z)",
        expectedSorting: {
            sortedBy: "name",
            ascending: true,
        }
    },
    nameZToA: {
        dropdownOption: "Name (Z to A)",
        expectedSorting: {
            sortedBy: "name",
            ascending: false,
        }
    },
    priceLowToHigh: {
        dropdownOption: "Price (low to high)",
        expectedSorting: {
            sortedBy: "price",
            ascending: true,
        }
    },
    priceHighToLow: {
        dropdownOption: "Price (high to low)",
        expectedSorting: {
            sortedBy: "price",
            ascending: false,
        }
    }
}

export const sortingOptionValues = Object.values(sortingOptions)



