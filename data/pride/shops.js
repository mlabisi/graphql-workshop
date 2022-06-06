const shops = [{
        "id": 1,
        "name": "Seattle Slurp",
        "motto": "You can't make a good cup of coffee without gays.",
        "shopOwnerId": 2,
        "addressId": 1,
        "menuItemIds": [1, 2, 3,],
        "isOpen": false
    },
    {
        "id": 2,
        "name": "Queeeeeeen Beans",
        "shopOwnerId": 1,
        "addressId": 2,
        "menuItemIds": [1, 2, 3,],
        "isOpen": true
    },
    {
        "id": 3,
        "name": "Janelle's Juicy Java House",
        "shopOwnerId": 5,
        "addressId": 3,
        "menuItemIds": [4,5],
        "isOpen": false
    },
    {
        "id": 4,
        "name": "Hot Shots",
        "motto": "Never miss a shot!",
        "shopOwnerId": 4,
        "addressId": 3,
        "menuItemIds": [ 6, 7, 8],
        "isOpen": true

    },
   
];

module.exports = {
  shops,
};