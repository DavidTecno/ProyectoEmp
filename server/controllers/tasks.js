var Task = require("../models/task");

//Post
exports.postTasks = function (req, res) {
  // Create a new instance of the Task model
  var task = new Task();

  // Set the task properties that came from the POST data
  task.name = req.body.name;
  task.project = req.body.project;
  task.category = req.body.category;
  task.desc = req.body.desc;

  console.log(JSON.stringify(task));

  // Save the task and check for errors
  task.save(function (err) {
    if (err) {

      res.send(err);
      //console.log(err);
      return;

    }
    res.status(200).json(task);
  });
};

//Push Hour on task
exports.postTaskHour = function (req, res) {

  Task.findById(req.params.id, function (err, task) {
      if (err){
        res.send(err);
        return;
      }

      console.log(JSON.stringify(task))

      task.hour.push({ 
        user: req.body.user,
        day: req.body.day,
        duration: req.body.duration 
      });
        

      task.save(function (err) {
        if (err) {

          res.send(err);
        return;

        }
        res.json(task);
      });
    });
}

//Gets
//Get All
exports.allTasks = function (req, res) {
  // Use the Task model to find all tasks
  Task.find(function (err, task) {
    if (err) {

      res.send(err);
      return;
    }

    res.json(task);
  });
};

//Get One
exports.getTask = function (req, res) {
  // Use the Task model to find a specific task
  Task.findById(req.params.id, function (err, task) {
    if (err){
      res.send(err);
        return;
    }

    console.log(task)

    res.json(task);
  });
};

//Get by Project
exports.getTaskProject = function (req, res) {
  Task.find({project: req.params.idPro}, function (err, task) {
    if (err) {

      res.send(err);
      return;
    }

    res.json(task);
  });
}

//Put
exports.putTasks = function (req, res) {
  // Use the Task model to find a specific task
  Task.findByIdAndUpdate(req.params.id, req.body, {new:true},
    (err, task) => {
      
      if (err){
        res.send(err);
        return;
      }


      task.save(function (err) {
        if (err) {

          res.send(err);
        return;

        }
        res.json(task);
      });

    });

};

//Delete
exports.deleteTasks = function (req, res) {
  // Use the Task model to find a specific task and remove it
  Task.findByIdAndRemove(req.params.id, function (err) {
    if (err){
      res.send(err);
        return;
    }
      

    res.json({ message: 'Task removed!' });
  });
};