db = db.getSiblingDB('anime');
db.createUser({
    user: "zxc",
    pwd: "123",
    roles: [
        {
            role: "readWrite",
            db: "anime"
        },
        {
            role: "dbOwner",
            db: "anime"
        }
    ]
});
db.createCollection('users');
db.createCollection('anime');
db.anime.insertMany([
    {
        picture: 'no',
        title: "Fullmetal Alchemist: Brotherhood",
        genres: ["drama", "senen", "fantasy"],
        studio: "bones",
        description: "cool fantase anime",
        year: "2009",
        status: "released",
        rating: null
    },
    {
        picture: 'no',
        title: "Steins;Gate",
        genres: ["drama", "thriller", "psychological"],
        studio: "white fox",
        description: "bad anime",
        year: "2011",
        status: "released",
        rating: null
    }])
db.users.insertMany([
    {
        picture: 'no',
        email: 'helldonat228@gmail.com',
        username: 'admin',
        password: '$2a$10$Py8xR8V2kjJgrqH0cb2daekkpmCsSuLhpdeRWoimVvZoNWegKgsam',
        firstName: 'Nikita',
        lastName: 'Chupryna',
        birthday: new Date(2002, 2, 5),
        role: 'ADMIN'
    },
    {
        picture: 'yes',
        email: 'helldonat1337@gmail.com',
        username: 'user',
        password: '$2a$10$8C4DU0PkE6hd6vmHPMmelOXk18MAfEXOTKfKLNMK/5rpqcaDCKNAi',
        firstName: 'Nikita',
        lastName: 'Chortok',
        birthday: new Date(2001, 12, 24),
        role: 'USER'
    }
]);