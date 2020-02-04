const User = require('../models/User');

module.exports = {
    async index(request,response) {
        const Users = await User.find();

        return response.json(Users);
    },
    async store(request,response) {
        console.log(request.body);
        const { name,role,bio,email,phone} =  request.body;
        let user = await User.findOne({email});
        console.log('usuario existe', user)

        if(user) {
            return response.status(403).send({error: "USER_ALREADY_EXISTS"});
        }

        if(!user){
            console.log(name);
            console.log(bio);
            user = await User.create({
                name,
                username: email,
                password: '123456',
                role,
                bio,
                email,
                phone,
            })
        }
        return response.status(200).json(user);
    },

    async find(request, response) {
        const user = await User.findById(request.params.id);

        return response.json(user);
    },

    async update(request, response){
        try {
            const updatedUser = await User.findOneAndUpdate({_id: request.params.id}, request.body);

            return response.json(updatedUser);
        } catch (error) {
            return response.status(403).send('Error')
        }
    },

    async destroy(request, response){
        console.log(request.params.id);
        try {
            
            await User.deleteOne({_id: request.params.id});
        } catch (error) {
            console.log(error);
            return response.status(422).json({message: error})
    
            
        }
    
       return response.status(200).json({message: "User deleted."})
    }
};