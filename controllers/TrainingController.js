const Training = require('../models/Training');

module.exports = {
    async index(request,response) {
        const trainings = await Training.find();

        return response.json(trainings);
    },
    async store(request,response) {
        console.log(request.body);
        const { title, description, type} =  request.body;
        let training = await Training.findOne({type});
        console.log('usuario existe', training)

        if(training) {
            return response.status(403).send({error: "TRAINING_ALREADY_EXISTS"});
        }

        if(!training){
            training = await Training.create({
                title,
                type,
                description
            })
        }
        return response.status(200).json(training);
    },

    async destroy(request, response){
        console.log(request.params.id);
        try {
            
            await Training.deleteOne({_id: request.params.id});
        } catch (error) {
            console.log(error);
            return response.status(422).json({message: error})
    
            
        }
    
       return response.status(200).json({message: "Training deleted."})
    }
};