//Pré-requis et connection BDD
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
 
      useUnifiedTopology : true
 }
 mongoose.connect('mongodb+srv://Carole:lestat2003@cluster0-jvacm.azure.mongodb.net/usersAndBatch?retryWrites=true&w=majority',
  options,    
  function(err) {
   console.log(err);
  }
 );
 
 //Schéma Batch
 var BatchSchema= mongoose.Schema({
  city: String,
  batch_number: Number
});
const BatchModel= mongoose.model('batch', BatchSchema);

//Schéma User

var UserSchema= mongoose.Schema ({
  batch : { type : mongoose.Schema.Types.ObjectId , ref: 'batch'},
  nom : String,
  prenom: String,
});

const UserModel= mongoose.model ('users', UserSchema);

/* GET home page. */
router.get('/', async function(req, res, next) {
 /* création new user
  var newUser= new UserModel ({
    batch: new mongoose.Types.ObjectId(),
    nom: "Rice",
    prenom: "Anne"
  })
  var newBatch= new BatchModel ({
    city: "Louisiane",
    batch_number: 02
  })
  var user = await newUser.save();
  var user = await newBatch.save();*/
  var user = await UserModel.find({nom: "Rice"}).populate('batch').exec();
  console.log(user.nom);
  console.log(user.batch.batch_number); 
  res.render('index', { title: 'Express' });
});

module.exports = BatchModel
module.exports = UserModel;
module.exports = router;
