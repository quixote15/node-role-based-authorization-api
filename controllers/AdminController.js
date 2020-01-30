const User = require('../models/User');
const Role = require('../_helpers/role');

module.exports = {
    async store(request,response) {
        console.log(request.body);
        const {name,bio,email,phone, username, password} =  request.body;
        let user = await User.findOne({email});
        if(!user){
            console.log(name);
            console.log(bio);
            user = await User.create({
                name,
                role: Role.Admin,
                bio,
                email,
                phone,
                username,
                password
            })
        }
        return response.status(200).json(user);
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
}