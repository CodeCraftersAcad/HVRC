import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'admin',
        email: 'test@test.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Jon Doe',
        email: 'test1@test.com',
        password:  bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Jane Doe',
        email: 'test2@test.com',
        password:  bcrypt.hashSync('123456', 10)
    },
]

export default users