/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

const slotTypes = {
    0: "Aura",
    1: "Head",
    2: "Pocket",
    3: "Cape",
    4: "Amulet",
    5: "Ammunition",
    6: "Weapon",
    7: "Chest",
    8: "Offhand",
    9: "Legs",
    10: "Hands",
    11: "Boots",
    12: "Ring",
    13: "Item",
    14: "Familiar",
}

const abilityData = {
    melee: {
        basics: [
            {
                id: "mb1",
                name: "Slice",
                image: "/static_images/RSTools/abilitys/melee/Slice.png"
            },
            {
                id: "mb2",
                name: "Backhand",
                image: "/static_images/RSTools/abilitys/melee/Backhand.png"
            },
            {
                id: "mb3",
                name: "Havoc",
                image: "/static_images/RSTools/abilitys/melee/Havoc.png"
            },
            {
                id: "mb4",
                name: "Smash",
                image: "/static_images/RSTools/abilitys/melee/Smash.png"
            },
            {
                id: "mb5",
                name: "Barge",
                image: "/static_images/RSTools/abilitys/melee/Barge.png"
            },
            {
                id: "mb6",
                name: "Greater Barge",
                image: "/static_images/RSTools/abilitys/melee/Greater_Barge.png"
            },
            {
                id: "mb7",
                name: "Sever",
                image: "/static_images/RSTools/abilitys/melee/Sever.png"
            },
            {
                id: "mb8",
                name: "Bladed Dive",
                image: "/static_images/RSTools/abilitys/melee/Bladed_Dive.png"
            },
            {
                id: "mb9",
                name: "Kick",
                image: "/static_images/RSTools/abilitys/melee/Kick.png"
            },
            {
                id: "mb10",
                name: "Punish",
                image: "/static_images/RSTools/abilitys/melee/Punish.png"
            },
            {
                id: "mb11",
                name: "Dismember",
                image: "/static_images/RSTools/abilitys/melee/Dismember.png"
            },
            {
                id: "mb12",
                name: "Greater Fury",
                image: "/static_images/RSTools/abilitys/melee/Greater_Fury.png"
            },
            {
                id: "mb13",
                name: "Fury",
                image: "/static_images/RSTools/abilitys/melee/Fury.png"
            },
            {
                id: "mb14",
                name: "Cleave",
                image: "/static_images/RSTools/abilitys/melee/Cleave.png"
            },
            {
                id: "mb15",
                name: "Decimate",
                image: "/static_images/RSTools/abilitys/melee/Decimate.png"
            }
        ],
        thresholds: [
            {
                id: "mt1",
                name: "Slaughter",
                image: "/static_images/RSTools/abilitys/melee/Slaughter.png"
            },
            {
                id: "mt2",
                name: "Forceful Backhand",
                image: "/static_images/RSTools/abilitys/melee/Forceful_Backhand.png"
            },
            {
                id: "mt3",
                name: "Greater Flurry",
                image: "/static_images/RSTools/abilitys/melee/Greater_Flurry.png"
            },
            {
                id: "mt4",
                name: "Flurry",
                image: "/static_images/RSTools/abilitys/melee/Flurry.png"
            },
            {
                id: "mt5",
                name: "Hurricane",
                image: "/static_images/RSTools/abilitys/melee/Hurricane.png"
            },
            {
                id: "mt6",
                name: "Blood Tendrils",
                image: "/static_images/RSTools/abilitys/melee/Blood_Tendrils.png"
            },
            {
                id: "mt7",
                name: "Destroy",
                image: "/static_images/RSTools/abilitys/melee/Destroy.png"
            },
            {
                id: "mt8",
                name: "Quake",
                image: "/static_images/RSTools/abilitys/melee/Quake.png"
            },
            {
                id: "mt9",
                name: "Assault",
                image: "/static_images/RSTools/abilitys/melee/Assault.png"
            }
        ],
        ultimates: [
            {
                id: "mu1",
                name: "Overpower",
                image: "/static_images/RSTools/abilitys/melee/Overpower.png"
            },
            {
                id: "mu2",
                name: "Massacre",
                image: "/static_images/RSTools/abilitys/melee/Massacre.png"
            },
            {
                id: "mu3",
                name: "Meteor Strike",
                image: "/static_images/RSTools/abilitys/melee/Meteor_Strike.png"
            },
            {
                id: "mu4",
                name: "Balanced Strike",
                image: "/static_images/RSTools/abilitys/melee/Balanced_Strike.png"
            },
            {
                id: "mu5",
                name: "Berserk",
                image: "/static_images/RSTools/abilitys/melee/Berserk.png"
            },
            {
                id: "mu6",
                name: "Pulverise",
                image: "/static_images/RSTools/abilitys/melee/Pulverise.png"
            },
            {
                id: "mu7",
                name: "Frenzy",
                image: "/static_images/RSTools/abilitys/melee/Frenzy.png"
            }
        ]
    },
    range: {
        basics: [
            {
                id: "rb1",
                name: "Piercing Shot",
                image: "/static_images/RSTools/abilitys/range/Piercing_Shot.png"
            },
            {
                id: "rb2",
                name: "Binding Shot",
                image: "/static_images/RSTools/abilitys/range/Binding_Shot.png"
            },
            {
                id: "rb3",
                name: "Snipe",
                image: "/static_images/RSTools/abilitys/range/Snipe.png"
            },
            {
                id: "rb4",
                name: "Dazing Shot",
                image: "/static_images/RSTools/abilitys/range/Dazing_Shot.png"
            },
            {
                id: "rb5",
                name: "Greater Dazing Shot",
                image: "/static_images/RSTools/abilitys/range/Greater_Dazing_Shot.png"
            },
            {
                id: "rb6",
                name: "Needle Strike",
                image: "/static_images/RSTools/abilitys/range/Needle_Strike.png"
            },
            {
                id: "rb7",
                name: "Fragmentation Shot",
                image: "/static_images/RSTools/abilitys/range/Fragmentation_Shot.png"
            },
            {
                id: "rb8",
                name: "Escape",
                image: "/static_images/RSTools/abilitys/range/Escape.png"
            },
            {
                id: "rb9",
                name: "Ricochet",
                image: "/static_images/RSTools/abilitys/range/Ricochet.png"
            },
            {
                id: "rb10",
                name: "Corruption Shot",
                image: "/static_images/RSTools/abilitys/range/Corruption_Shot.png"
            }
        ],
        thresholds: [
            {
                id: "rt1",
                name: "Snap Shot",
                image: "/static_images/RSTools/abilitys/range/Snap_Shot.png"
            },
            {
                id: "rt2",
                name: "Tight Bindings",
                image: "/static_images/RSTools/abilitys/range/Tight_Bindings.png"
            },
            {
                id: "rt3",
                name: "Rapid Fire",
                image: "/static_images/RSTools/abilitys/range/Rapid_Fire.png"
            },
            {
                id: "rt4",
                name: "Bombardment",
                image: "/static_images/RSTools/abilitys/range/Bombardment.png"
            },
            {
                id: "rt5",
                name: "Salt the Wound",
                image: "/static_images/RSTools/abilitys/range/Salt_the_Wound.png"
            },
            {
                id: "rt6",
                name: "Shadow Tendrils",
                image: "/static_images/RSTools/abilitys/range/Shadow_Tendrils.png"
            }
        ],
        ultimates: [
            {
                id: "ru1",
                name: "Deadshot",
                image: "/static_images/RSTools/abilitys/range/Deadshot.png"
            },
            {
                id: "ru2",
                name: "Incendiary Shot",
                image: "/static_images/RSTools/abilitys/range/Incendiary_Shot.png"
            },
            {
                id: "ru3",
                name: "Unload",
                image: "/static_images/RSTools/abilitys/range/Unload.png"
            },
            {
                id: "ru4",
                name: "Death's Swiftness",
                image: "/static_images/RSTools/abilitys/range/Deaths_Swiftness.png"
            }
        ]
    },
    magic: {
        basics: [
            {
                id: "mcb1",
                name: "Wrack",
                image: "/static_images/RSTools/abilitys/magic/Wrack.png"
            },
            {
                id: "mcb2",
                name: "Impact",
                image: "/static_images/RSTools/abilitys/magic/Impact.png"
            },
            {
                id: "mcb3",
                name: "Dragon Breath",
                image: "/static_images/RSTools/abilitys/magic/Dragon_Breath.png"
            },
            {
                id: "mcb4",
                name: "Sonic Wave",
                image: "/static_images/RSTools/abilitys/magic/Sonic_Wave.png"
            },
            {
                id: "mcb5",
                name: "Concentrated Blast",
                image: "/static_images/RSTools/abilitys/magic/Concentrated_Blast.png"
            },
            {
                id: "mcb6",
                name: "Combust",
                image: "/static_images/RSTools/abilitys/magic/Combust.png"
            },
            {
                id: "mcb7",
                name: "Surge",
                image: "/static_images/RSTools/abilitys/magic/Surge.png"
            },
            {
                id: "mcb8",
                name: "Chain",
                image: "/static_images/RSTools/abilitys/magic/Chain.png"
            },
            {
                id: "mcb9",
                name: "Corruption Blast",
                image: "/static_images/RSTools/abilitys/magic/Corruption_Blast.png"
            }
        ],
        thresholds: [
            {
                id: "mct1",
                name: "Asphyxiate",
                image: "/static_images/RSTools/abilitys/magic/Asphyxiate.png"
            },
            {
                id: "mct2",
                name: "Deep Impact",
                image: "/static_images/RSTools/abilitys/magic/Deep_Impact.png"
            },
            {
                id: "mct3",
                name: "Detonate",
                image: "/static_images/RSTools/abilitys/magic/Detonate.png"
            },
            {
                id: "mct4",
                name: "Wild Magic",
                image: "/static_images/RSTools/abilitys/magic/Wild_Magic.png"
            },
            {
                id: "mct5",
                name: "Smoke Tendrils",
                image: "/static_images/RSTools/abilitys/magic/Smoke_Tendrils.png"
            }
        ],
        ultimates: [
            {
                id: "mcu1",
                name: "Omnipower",
                image: "/static_images/RSTools/abilitys/magic/Omnipower.png"
            },
            {
                id: "mcu2",
                name: "Metamorphosis",
                image: "/static_images/RSTools/abilitys/magic/Metamorphosis.png"
            },
            {
                id: "mcu3",
                name: "Tsunami",
                image: "/static_images/RSTools/abilitys/magic/Tsunami.png"
            },
            {
                id: "mcu4",
                name: "Sunshine",
                image: "/static_images/RSTools/abilitys/magic/Sunshine.png"
            }
        ]
    },
    other: {
        basics: [
            {
                id: "db1",
                name: "Anticipation",
                image: "/static_images/RSTools/abilitys/defensive/Anticipation.png"
            },
            {
                id: "db2",
                name: "Bash",
                image: "/static_images/RSTools/abilitys/defensive/Bash.png"
            },
            {
                id: "db3",
                name: "Provoke",
                image: "/static_images/RSTools/abilitys/defensive/Provoke.png"
            },
            {
                id: "db4",
                name: "Freedom",
                image: "/static_images/RSTools/abilitys/defensive/Freedom.png"
            },
            {
                id: "db5",
                name: "Resonance",
                image: "/static_images/RSTools/abilitys/defensive/Resonance.png"
            },
            {
                id: "db6",
                name: "Preparation",
                image: "/static_images/RSTools/abilitys/defensive/Preparation.png"
            },
            {
                id: "db7",
                name: "Regenerate",
                image: "/static_images/RSTools/abilitys/defensive/Regenerate.png"
            },
            {
                id: "db8",
                name: "Sacrifice",
                image: "/static_images/RSTools/abilitys/defensive/Sacrifice.png"
            },
            {
                id: "db9",
                name: "Siphon",
                image: "/static_images/RSTools/abilitys/defensive/Siphon.png"
            },
            {
                id: "db10",
                name: "Incite",
                image: "/static_images/RSTools/abilitys/defensive/Incite.png"
            },
            {
                id: "db11",
                name: "Tuska's Wrath",
                image: "/static_images/RSTools/abilitys/defensive/Tuskas_Wrath.png"
            },
            {
                id: "db12",
                name: "Storm Shards",
                image: "/static_images/RSTools/abilitys/defensive/Storm_Shards.png"
            },
            {
                id: "db13",
                name: "Weapon Special attack",
                image: "/static_images/RSTools/abilitys/defensive/Weapon_Special_attack.png"
            }
        ],
        thresholds: [
            {
                id: "dt1",
                name: "Devotion",
                image: "/static_images/RSTools/abilitys/defensive/Devotion.png"
            },
            {
                id: "dt2",
                name: "Revenge",
                image: "/static_images/RSTools/abilitys/defensive/Revenge.png"
            },
            {
                id: "dt3",
                name: "Reflect",
                image: "/static_images/RSTools/abilitys/defensive/Reflect.png"
            },
            {
                id: "dt4",
                name: "Debilitate",
                image: "/static_images/RSTools/abilitys/defensive/Debilitate.png"
            },
            {
                id: "dt5",
                name: "Shatter",
                image: "/static_images/RSTools/abilitys/defensive/Shatter.png"
            },
            {
                id: "dt6",
                name: "Reprisal",
                image: "/static_images/RSTools/abilitys/defensive/Reprisal.png"
            }
        ],
        ultimates: [
            {
                id: "du1",
                name: "Immortality",
                image: "/static_images/RSTools/abilitys/defensive/Immortality.png"
            },
            {
                id: "du2",
                name: "Rejuvenate",
                image: "/static_images/RSTools/abilitys/defensive/Rejuvenate.png"
            },
            {
                id: "du3",
                name: "Barricade",
                image: "/static_images/RSTools/abilitys/defensive/Barricade.png"
            },
            {
                id: "du4",
                name: "Natural Instinct",
                image: "/static_images/RSTools/abilitys/defensive/Natural_Instinct.png"
            },
            {
                id: "du5",
                name: "Transfigure",
                image: "/static_images/RSTools/abilitys/defensive/Transfigure.png"
            },
            {
                id: "du6",
                name: "Guthix's Blessing",
                image: "/static_images/RSTools/abilitys/defensive/Guthixs_Blessing.png"
            },
            {
                id: "du7",
                name: "Onslaught",
                image: "/static_images/RSTools/abilitys/defensive/Onslaught.png"
            },
            {
                id: "du8",
                name: "Ice Asylum",
                image: "/static_images/RSTools/abilitys/defensive/Ice_Asylum.png"
            }
        ]
    }
}

const styleTypes = {
    1: "melee",
    2: "range",
    3: "magic"
}

const types = {
    PRESETS: 0,
    ITEMS: 1,
    ABILITYS: 2
}

export default {
    slotTypes,
    styleTypes,
    abilityData,
    types
}