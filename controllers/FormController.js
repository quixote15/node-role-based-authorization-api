const Form = require('../models/Form');
const Page = require('../models/Page');
const Element = require('../models/Element');

async function disabledAllPreviosForms() {
 return Form.updateMany({},{isActive: false});
}

module.exports = {
    async index(req, res) {
        const forms = await Form.find();

        return res.json(forms);
    },
    async store(req, res) {
        const {pages, title, type = 'default', isActive} = req.body;
        console.log(req.body)

        // Se o novo formulário deve ficar ativo, desativar os outros.
        if(isActive){
            await disabledAllPreviosForms();
        }

        const pagesSchemas = pages.map(page => {
            return new Page(page);
        });

        console.log(pagesSchemas);

        const currentDate = new Date();

        const form = await Form.create({
            title,
            type,
            pages: pagesSchemas,
            isActive,
            createdAt: currentDate,
            updatedAt: null,
        });

        console.log(form)

        return res.status(200).json(form);
    },

    async findActive(req, res){
        const [activeForm] = await Form.find({isActive: true});

        return res.json(activeForm);
    },

    async find(req, res) {
        const form = await Form.findById(req.params.id);

        return res.json(form);
    },

    async update(req, res) {
        const {isActive} = req.body;

        if(isActive){
            await disabledAllPreviosForms();
        }

        await Form.updateOne({_id: req.params.id}, {
            $set: { isActive }
        });
    },

    async destroy(req, res) {
        try {
            await Form.deleteOne({_id: req.params.id});
            return res.json({message: 'Formulário deletado.'})
        } catch (error) {
            console.log(error);
            return res.status(422).json({message: error})
        }
    }
}