// create database
use mongo_practice
// create collections
db.createCollection("movies")
// view collection
show collections
// view databases
show dbs

// insert documents
db.movie.insertMany([
    {
        title:"fight club",
        writer:"chuck painhniuko",
        year:1999,
        actors:[
            "brad pitt","edward nortoin"
        ]
    },
    {
        title:"pulp fiction",
        writer:"chuck painhniuko",
        year:1994,
        actors:[
            "john travoita","uma thuman"
        ]
    },
    {
        title:"injurious basterds",
        writer:"chuck painhniuko",
        year:2009,
        actors:[
            "brad pitt","diane krunger","elli roth"
        ]
    },
    {
        title:{the_hobbit:"an unexpected journy"},
        writer:"j.r.r tolkien",
        year:2012,
        frachies:"the hobbit"
    },
    {
        title:{the_hobbit:"the desolation of smug"},
        writer:"j.r.r tolkien",
        year:2013,
        frachies:"the hobbit"
    },
    {
        title:{the_hobbit:"the battle of two armies"},
        writer:"j.r.r tolkien",
        year:2012,
        frachies:"the hobbit",
        synopsis:"bilbo and company are force to engage in a war aginst an array of combatants and keep the lonely mountain from falling into the hands of raising darkness."

    },
    {
        title:"pee wee herman's big adventure"
    },
    {
        title:"avatar"
    }
])
// 1.get all the documents
db.movie.find().pretty()
// 2.get all the document with writer set to "Quentin tarantino"
db.movie.find({writer:"Quentin tarantino"}).pretty()
// 3.get all documents where actors include "brad pitt"
db.movie.find({actors:"brad pitt"}).pretty()
// 4.get all the documents with frachies set to "the hobbit"
db.movie.find({frachies:"the hobbit"}).pretty()
// 5.get all movies released in 90's
db.movie.find({year:{$gt:1990 ,$lt:2000}}).pretty()
// 6.get all the movies released before the year 2000 or after 2010
db.movie.find(
    {
        $or:[
            {year:{$lt:2000}},
            {year:{$gt:2010}}
        ]
    }
).pretty()
// update the document
// 1.add the synopsis to "the hobbit:an unexpected journey"

db.movie.update({title:{the_hobbit:"an unexpected journy"}},
{
    $set:{
   synopsis:"a reluctant hobbit bilbo baggins,sets out to the lonelymountain with a spririted group of dwarves to reclaim their mountains home-and the gold with it -from the dragon smug"
    }
})
// 2.add the synopsis to "the hobbit :the desolation smug"
db.movie.update({title:{the_hobbit:"the desolation of smug"}},
{
    $set:{
   synopsis:"the dwarves along with bilbo baggis and gandlf the grey.continue their quest to certain ,erebor,thier homeland from smug .bilbo from sumg.bilbo baggins is in possession of a mysterious and magicalring"
    }
})
// 3.add an actor names "samuel l jackson" to the movie "pulp fiction"
db.movie.update({title:"pulp fiction"},
{
    $set:{
        actors:[
            "john travoita","uma thuman","samuel l jackson"
        ]

    }
})
// delete documents
// 1.delete movie  "pee wee herman's big adventure"
db.movie.remove({title:"pee wee herman's big adventure"})
// 2.delete movie "avatar"
db.movie.remove({title:"avatar"})

// text search
// 1.find all movies that have a synopsis that contains the word bilbo
db.movie.find({
    synopsis:{$regex:"bilbo"}
}
).forEach(printjson)
// 2.find all movies that  have a synopsis the contain the word "gandalf"
db.movie.find({
    synopsis:{$regex:"gandalf"}
})
// 3.find all the movies that have synopsis contain the word "bilbo" and not "gandalf"
db.movie.find({
    synopsis:{$regex:"bilbo",$not:{$regex:"gandalf"}}}

).pretty()
// wrong
// 4.find all the movies that have synopsis contain the dwarves or hobbit
db.movie.find({
    $or:[{synopsis:{$regex:"dwarves"}},
{synopsis:{$regex:"hobbit"}}]
})

// 5.find all movies synopsis contain gold and dragon
db.movie.find({
    synopsis:{$regex:"gold",$regex:"dragon"}
})

// creating user collection
db.createCollection('user')
db.user.insertMany([
    {
    username:'goodguygreg',
    firstname:'good guy',
    lastname:'greg',
    },
    {
    username:'scrumbagsteave',
    fullname:{
        first:'scrum',
        last:'steve'
    }
}
]  
)
// post collections
db.createCollection('posts')
db.posts.insertMany([
    {
    username:'goodguygreg',
    title:'passes out at party',
    body:'wakes up early and cleans house'
    },
    {
        username:'goodguygreg',
        title:'steals your identity',
        body:'rais your credit score'
    },
    {
        username:'goodguygreg',
        title:'reports a bug your code',
        body:' sends you pull a request'
    },
    {
        username:'scrumbbagsteve',
        title:'barrows somthing',
        body:'sells it'
     },
     {
        username:'scrumbbagsteve',
        title:'barrows everything',
        body:'the end'
     },
     {
        username:'scrumbbagsteve',
        title:'folks your repo on github',
        body:'sets private'
     }
    
])
db.createCollection('comments')
db.comments.insertMany([
    {
        username:'goodguygreg',
        comment:'hope you got the good idea',
        post:'62a8694460145443b62fae5f'
    },
    {
        username:'goodguygreg',
        comment:'whts mine yours',
        post:'62a8694460145443b62fae60'
    },
    {
        username:'goodguygreg',
        comment:'dont voilet the licensing agreement',
        post:'62a8694460145443b62fae61'
    },
    {
        username:'scrumbsteve',
        comment:'still its not clean',
        post:'62a8694460145443b62fae62'
    },
    {
        username:'scrumbsteve',
        comment:'denied your pr cause i found hack',
        post:'62a8694460145443b62fae63'
    },
    
])
// querying related collections
// 1.find all users
db.user.find().pretty()
// 2.find all posts
db.posts.find().pretty()
// 3.find all posts that was authored by googuygre
db.posts.find({username:'goodguygreg'}).pretty()
// 4.find all posts that was authored by scrumbagsteve
db.posts.find({username:'scrumbsteve'}).pretty()
// 5.find all comments
db.comments.find().pretty()
// 6.find all comments that was authored by googuygre
db.comments.find({username:'goodguygreg'})
// 3.find all comments that was authored by scrumbagsteve
db.comments.find({username:'scrumbsteve'}).pretty()
// 8.find all comments belonging to the post 'reporta bug in your code'
db.comments.find({post:'62a8694460145443b62fae61'})