var express= require('express');
var router= express.Router();

// Connecting to mongodb database
var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/images',{ useMongoClient: true })

var multer= require('multer');
var upload= multer({dest:'uploads/'});

var fs= require('fs');

//Creating model for collection in database
var Image= mongoose.model('Image',{
	image: String
});

// API to serve GET request for images list
router.get('/images',function(req,res,next){
	
	Image.find({},function(err,files){
		if(err){
			res.send(err);
		}
		console.log("======from get method====");
		console.log(files)
		res.send(files);   //Sending response to Client
	});
})

//API to serve POST request to upload the image
router.post('/images',upload.any(),function(req,res,next){
	console.log(req.files);
	//upload the files and place it...
	if(req.files){
		req.files.forEach(function(file){
			console.log(file);
		
			var fileName=(new Date).valueOf()+'-'+file.originalname;
			fs.rename(file.path,'public/images/'+fileName,function(err){
					if(err) throw err;

					//Save images to mongodb
					var image= new Image({
						image: fileName
					});

					image.save(function(err,result){
						if(err){

						}

						res.json(result);  //Sending response to Client
					});

					console.log('File Uploaded...');
			});
		});
	}
});


module.exports=router;