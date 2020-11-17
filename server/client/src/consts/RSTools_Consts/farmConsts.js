/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

const farmTypeNames = {
    0: "Farm Run",
    1: "Herb Run",
    2: "Tree Run",
    3: "Fruit Run",
    4: "Bush Run",
    5: "Cactus Run",
    6: "Mushroom Run"
}

const farmTypeIcons = {
    1: "/static_images/RSTools/farmRuns/Clean_guam.png",
    2: "/static_images/RSTools/farmRuns/Spirit_tree.png",
    3: "/static_images/RSTools/farmRuns/Pineapple.png",
    4: "/static_images/RSTools/farmRuns/White_berries.png",
    5: "/static_images/RSTools/farmRuns/Potato_cactus.png",
    6: "/static_images/RSTools/farmRuns/Bittercap_mushroom.png"
}

const farmTypes = {
    ALL: 0,
    HERB: 1,
    TREE: 2,
    FRUIT: 3,
    BUSH: 4,
    CACTUS: 5,
    MUSHROOM: 6,
}

export default {
    farmTypeNames,
    farmTypeIcons,
    farmTypes
}