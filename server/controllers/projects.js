var Project = require("../models/project");

//Post
exports.postProjects = function (req, res) {
  // Create a new instance of the Project model
  var project = new Project();

  console.log("lo que llega: " + JSON.stringify(req.body));

  // Set the project properties that came from the POST data
  project.name = req.body.name;
  project.client = req.body.client;
  project.firstDate = req.body.firstDate;
  project.finishDate = req.body.finishDate;
  project.limitDate = req.body.limitDate;

  console.log(JSON.stringify(project));

  // Save the project and check for errors
  project.save(function (err) {
    if (err) {

      res.send(err);
      //console.log(err);
      return;

    }
    console.log("exited: "+project)
    res.status(200).json(project);
  });
};

//Gets
//Get All
exports.allProjects = function (req, res) {
  // Use the Project model to find all projects
  Project.find(function (err, project) {
    if (err) {

      res.send(err);
      return;
    }

    res.json(project);
  });
};

//Get One
exports.getProject = function (req, res) {
  // Use the Project model to find a specific project
  Project.findById(req.params.id, function (err, project) {
    if (err){
      res.send(err);
        return;
    }

    res.json(project);
  });
};

//Put
exports.putProjects = function (req, res) {
  // Use the Project model to find a specific project
  Project.findById(req.params.id, req.body, { new: true },
    (err, project) => {
      if (err){
        res.send(err);
        return;
      }
        

      project.save(function (err) {
        if (err) {

          res.send(err);
        return;

        }
        res.json(project);
      });
    });

};

//Delete
exports.deleteProjects = function (req, res) {
  // Use the Project model to find a specific project and remove it
  Project.findByIdAndRemove(req.params.id, function (err) {
    if (err){
      res.send(err);
        return;
    }
      

    res.json({ message: 'Project removed!' });
  });
};