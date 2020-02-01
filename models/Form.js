const mongoose = require('mongoose');
const Page = require('./Page');
const PageSchema = mongoose.model('Page').schema;


const FormSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String,
    pages: [PageSchema],
    createdAt: Date,
    updatedAt: Date,
    isActive: Boolean,
});

module.exports = mongoose.model('Form', FormSchema);

/*

{
 "pages": [
  {
   "name": "page1",
   "elements": [
    {
     "type": "barrating",
     "name": "Treino",
     "title": "Como foi o treino hoje ?",
     "description": "Essa pergunta relaciona-se com sua satisfação geral do Treino A.",
     "choices": [
      1,
      2,
      3,
      4,
      5
     ]
    },
    {
     "type": "barrating",
     "name": "question4",
     "title": "Como foi a recepção hoje ?",
     "description": "Essa pergunta relaciona-se com sua satisfação geral da recepção.",
     "choices": [
      1,
      2,
      3,
      4,
      5
     ]
    },
    {
     "type": "rating",
     "name": "motivação",
     "title": "No geral voce se sentiu motivado?",
     "description": "Queremos saber sobre sua motivação aqui."
    },
    {
     "type": "barrating",
     "name": "question2",
     "title": "A academia estava limpa?",
     "description": "Voce encontrou algo sujo e que nao te agradou?",
     "choices": [
      1,
      2,
      3,
      4,
      5
     ]
    },
    {
     "type": "barrating",
     "name": "question3",
     "title": "Como foi o professor hoje ?",
     "choices": [
      1,
      2,
      3,
      4,
      5
     ]
    }
   ]
  }
 ]
}

*/