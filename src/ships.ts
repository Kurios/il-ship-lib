
export type WeaponType = "missile" | "torp" | "projectile" | "plasma"
export type AARange = "self" | "row"
export type ShipType = "unknown" | "destroyer" | "frigate" | "cruiser" | "battlecruiser" | "carrier" | "fighter" | "corvette"

export class Ship {
    //a ship has modules. Be the armour or whatever....
    modules:Module[] = [];
    //a ship has calculated values....
    hp = 0;
    armour = 0;
    energyResist = 0;
    name = "unknown";
    type = "unknown";
    cp = 0;

    initShip(){
        //So some ship factory makes modules...
        //initShip then needs to take those modules and "exec" them to make ship stats.
        for(let module of this.modules){
            module.initModule(this);
        }
    }
}
export abstract class Module {
    upgradeSlots = 0
    type = "N/A"
    potentialUpgrades:Upgrade[] = []
    upgrades:{upgrade:Upgrade,points:number}[] = []
    
    initModule(ship:Ship):void {
        //lazy loop twice...
        for(let upgrade of this.upgrades){
            if(!upgrade.upgrade.strategy){
                for(let j = 0; j < upgrade.points; j++){
                    upgrade.upgrade.function(ship,this)
                }
            }
        }
        for(let upgrade of this.upgrades){
            if(upgrade.upgrade.strategy){
                for(let j = 0; j < upgrade.points; j++){
                    upgrade.upgrade.function(ship,this)
                }
            }
        }
    }
}

export type ArmourDef = {
    type:"amour"
    hp:number
    armour:number
    energyResist:number
    upgrades:string[]
    slots:number
}

export class Armour extends Module {
    type = "armour"
    hp = 0
    armour = 0
    energyResist = 0

    Armour(def:ArmourDef){
        this.hp = def.hp;
        this.armour = def.armour;
        this.energyResist = def.energyResist;
        this.upgradeSlots = def.slots;
    }

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
    intercept?:number
    aa_range?:AARange
    cooldown:number
    lockon:number
    duration?:number
    attacks:number
    rounds:number
}
export type Upgrade = {
    name:string
    cost:number[]
    strategy:boolean
    function:(s:Ship,m:Module)=>{}
}

export class ShipFactory{
    
    static parseShip(def:ShipDefType):Ship{
        let ship = new Ship();
        ship.name = def.name;
        ship.type = def.type;
        ship.cp = def.cp;
        return ship
    }
}

export type ShipDefType = {
    name:string
    type:ShipType
    cp:number
    modules:ModuleDef[]
}

export type ModuleDef = ArmourDef | WeaponDef | SupportDef | EngineDef

export type WeaponDef = {
    hp?:number
    main:boolean
    name:string
    subweapons:SubWeapon[]
    upgrades:string[]
    slots:number
}

export type SupportDef = {
    type:"amour"
    hp:number
    m_fighters?:number,
    h_fighters?:number,
    corvette?:number,
    repair_UAV?:number,
    hitrate_UAV?:number,
    aa_UAV?:number,
    guided_weapon_dodge?:number
    direct_fire_dodge?:number
    upgrades:string[]
    slots:number
}

export type EngineDef = {
    type:"amour"
    hp:number
    cruiseSpeed:number
    warpSpeed:number
    evasion?:number
    upgrades:string[]
    slots:number
}

let exmaple = [
    {
        "type":"Destroyer",
        "ships": [
            {
                "type":"destroyer",
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