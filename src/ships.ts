
export type WeaponType = "missile" | "torp" | "projectile" | "plasma"
export type AARange = "self" | "row"

export class Ship {
    //a ship has modules. Be the armour or whatever....
    modules:Module[] = [];
    //a ship has calculated values....
    hp = 0;
    armour = 0;
    energyResist = 0;
}
export interface Module {
    upgradeSlots:number
    potentialUpgrades:Upgrade[]
    upgrades:[{upgrade:Upgrade,points:number}]
}
export interface Armour extends Module {
    type:"armour"
    hp:number
    armour:number
    energyResist:number

}
export interface Weapon extends Module {
    type:"weapon"
    name:string
    upgradeSlots:number
    potentialUpgrades:Upgrade[]
    upgrades:[{upgrade:Upgrade,points:number}]
    row_aa:number
    self_aa:number
}
export type SubWeapon = {
    name:string
    type:WeaponType
    alpha:number
    antiship:number
    antiair:number
    siege:number
    intercept:number
    aa_range:AARange
    cooldown:number
    lockon:number
    duration:number
    attacks:number
    rounds:number
}
export type Upgrade = {
    name:string
    cost:number[]
    function:(w:Weapon)=>{}
}



let exmaple = [
    {
        "type":"Destroyer",
        "ships": [
            {
                "name":"Guardian Support",
                "cp":9,
                "tank":{
                    "hp":23490,
                    "armour":20,
                    "energy":2,
                    "evasion": 0, // base 20%?
                    "guided_weapon_dodge": 30, // weapon type "torp","missile","plasma"
                    "direct_fire_dodge": 0 // weapon type "projectile","beam"
                },
                "support":{
                    "m_fighters":0,
                    "h_fighters":0,
                    "corvette":0,
                    "repair UAV":0,
                    "hitrateUAV":0,
                    "aaUAV": 0
                },
                "weapons":[
                    {
                        "name":"Storm Missile",
                        "type": "missile",
                        "Alpha" : 80,
                        "AS" : 3490,
                        "AA" : 1396,
                        "SS" : 349,
                        "target": "air",
                        "aa_range": "self",
                        "intercept":0, // base is 15%. Compute this into Tank...
                        "main":true,
                        "upgrades":5,
                        "upgradeChoices":["AASupport40","damage2_5","damage2_5","cooldown3_7","cooldown3_7","mHitRate2","smallHitRate3_7"]
                    }
                ]
            }
        ]

    }
]

let upgrades =  [
        {
            "name":"AASupport40",
            "cost": [4],
            "function":(weapon)=>{
                weapon.AA_row += (weapon.AA) * (30/55) * ((2  * .6) / 10 )
            }
        },
        {
            "name":"damage2_5",
            "cost": [1,1,1,1],
            "function":(weapon,level)=>{
                weapon.AS *= (weapon.AS) * 1 + (0.05 * level)
            }
        }

]