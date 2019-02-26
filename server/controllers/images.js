var Image = require("../models/image");
var Upload_Path = "server/uploads";
var fs = require('fs');
var del = require('del');
var path = require('path');

exports.postImages = function (req, res) {

  var image = new Image();
  image.filename = req.file.filename;
  image.project = req.body.projectId;

  // Save the image and check for errors

    image.save(function (err) {
      if (err) {
        res.send(err);
        return;
      }
      res.json({ message: 'Image added', data: image });
    });


};

//Gets
//Get All
exports.allImages = function (req, res) {
  // Use the Image model to find all images
  Image.find({}, '-__v').lean().exec((err, images) => {
    if (err) {
      res.sendStatus(400);
      return;
    }

    for (let i = 0; i< images.length; i++){
      var img = images[i];
      img.url = req.protocol + '://' + req.get('host') + '/api/images/' + img._id;
    }
    res.json(images);
  });
};

//Get One
exports.getImage = function (req, res) {
  // Use the Image model to find a specific image
  
  Image.findById(req.params.id, function (err, image) {
    if (err){

      res.sendStatus(400);
      return;
    }
    
    res.setHeader('Content-Type', 'image/jpeg');
    fs.createReadStream(path.join(Upload_Path, image.filename)).pipe(res);
  });
};

//Delete
exports.deleteImage = function (req, res) {
  // Use the Image model to find a specific image and remove it
  Image.findByIdAndRemove(req.params.id, function (err, image) {
    if (err){
      res.sendStatus(400);
      return;
    }

    del([path.join(Upload_Path, image.filename)]).then(deleted => {
      res.sendStatus(200);
    })
  });
};