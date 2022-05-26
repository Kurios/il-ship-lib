import { ShipDefType, ShipFactory } from "./ships"

let io:ShipDefType = {
    name:"Io Ion Cannon",
    cp:18,
    type:"cruiser",
    modules:[
        {
            type:"weapon",
            name:"Viggen Ion Cannon",
            hp:13000,
            main:true,
            subweapons:[
                {
                    name:"Ion Cannon",
                    type:"beam",
                    priority:"large",
                    alpha:600,
                    antiship:18720,
                    antiair:0,
                    siege:3456,
                    cooldown:12,
                    lockon:8,
                    duration:8,
                    count:1,
                    fequency:4
                }
            ],
            upgrades:["overdrive","damage2","damage2","cooldown3","cooldown3","hitrate2","largehitrate3","moduleHP7","critReduction6"],
            slots:6
        },
        {
            type:"weapon",
            name:"Integrated Battery System",
            hp:13000,
            main:false,
            subweapons:[
                {
                    name:"Rapid Fire Cannon",
                    type:"cannon",
                    priority:"air",
                    alpha:35,
                    antiship:2100,
                    antiair:1260,
                    siege:126,
                    cooldown:4,
                    lockon:3,
                    attacks:1,
                    rounds:1,
                    count:4
                }
            ],
            upgrades:["damage10","damage10","cooldown15","cooldown15","airhitrate15"],
            slots:4
        },
        {
            type:"weapon",
            name:"Generic Missile System",
            hp:13000,
            main:false,
            subweapons:[
                {
                    name:"AM-8x150A",
                    type:"missile",
                    priority:"small",
                    alpha:100,
                    antiship:4457,
                    antiair:0,
                    siege:171,
                    cooldown:20,
                    lockon:5,
                    duration:8,
                    count:2,
                    rounds:8,
                    attacks:1
                }
            ],
            upgrades:["damage10","damage10","cooldown15","smallhitrate15","smallhitrate15"],
            slots:4
        },
        {
            type:"armour",
            hp:553690,
            armour:50,
            energyResist:10,
            upgrades:["armour2","armour2","armour6","energy2","energy2","antiMissile3"],
            slots:4
        },
        {
            type:"support",
            hit_rate:5,
            evasion:15,
            upgrades:["evade8","evade8"],
            slots:2
        },
        {
            type:"engine",
            warpSpeed:3250,
            cruiseSpeed:650,
            hp:12000,
            upgrades:["cruise5","cruise5","warp5"],
            slots:2
        }
    ]

}

let s = ShipFactory.parseShip(io)