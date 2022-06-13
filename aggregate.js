
// Atlanta Population
// 1.use db.zipcodes.find(),filter the results only the city is atlant and state is Ga
db.zipcodes.find({city:"ATLANTA",state:"GA"})

// 2.use $match for above quetion
db.zipcodes.aggregate(
    [
        {$match:{city:"ATLANTA",state:"GA"}}
    ]
)
// 3.number of zipcodes in atlanta
db.zipcodes.aggregate(
    [
        { $match:{city:"ATLANTA"}},
            {$group:{_id:"$city",Zipcodes:{$sum:1}}}
        
    ]
)
// 4.total population atlanta
db.zipcodes.aggregate(
    [
        {$match:{city:"ATLANTA"}},
        {$group:{_id:"$city",population:{$sum:"$pop"}}}

    ]
)

// population by state 
// 1.use aggregate to calculate the total population for each state
db.zipcodes.aggregate(
    [
        {$match: {}},
        {$group: {_id:"$state",population:{$sum:"$pop"}}}
    ]
)
// 2.sort the result by population highest first

db.zipcodes.aggregate(
    [
        {$match: {}},
        {$group: {_id:"$state",population:{$sum:"$pop"}}},
        {$sort:{population:-1}},
        

    ]
)
// 3.limit the results what are the top 3 states in population
db.zipcodes.aggregate(
    [
        {$match: {}},
        {$group: {_id:"$state",population:{$sum:"$pop"}}},
        {$sort:{population:-1}},
        {$limit:3}

    ]
)
// population by city
// 1.calculate the total population of each city ,use can use combination of each city and state
db.zipcodes.aggregate(
    [
        {$match:{}},
        {$group:{_id:{city:"$city",state:"$state"},population:{$sum:"$pop"}}}
    ]
)
// 2.sorting in order to population highest first
db.zipcodes.aggregate(
    [
        {$match:{}},
        {$group:{_id:"$city",population:{$sum:"$pop"}}},
        {$sort:{population:-1}}
    ]
)
// display highrest 3 data of highest population
 db.zipcodes.aggregate(
    [
        {$match:{}},
        {$group:{_id:"$city",population:{$sum:"$pop"}}},
        {$sort:{population:-1}},
        {$limit:3}
    ]
)
// 4 what are the top 3 cities in populatuin in texas
// db.zipcodes.aggregate(
//     [
//         {$match:{city:"TEXAS"}},
//         {$group:{_id:"$city",population:{$sum:"$pop"}}}
//     ]
// )

// BONUS
// 1.average  city population for each state
db.zipcodes.aggregate(
    [
        {$match:{}},
        {$group:{_id:{city:"$city",state:"$state"},population:{$avg:"$pop"}}}
    ]
)
// 2.top 3 states in average
db.zipcodes.aggregate(
    [
        {$match:{}},
        {$group:{_id:{state:"$state"},population:{$avg:"$pop"}}},
        {$limit:3}
    ]
)
