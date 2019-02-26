var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var passport = require('passport');
var multer = require('multer');
var cors = require('cors');

var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(passport.initialize());

//Uploads Images
var Upload_Path = "server/uploads";

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, Upload_Path);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

let upload = multer({ storage: storage });

app.use(cors());


//Controllers
var projectController = require('./server/controllers/projects');
var taskController = require('./server/controllers/tasks');
var userController = require('./server/controllers/users')
var authController = require('./server/controllers/auth')
var imageController = require('./server/controllers/images')


//Create a news routes with the prefix /...
var router = express.Router();

//projects
router.route('/projects')
    .post(projectController.postProjects)
    .get(projectController.allProjects);

router.route('/projects/:id')
    .get(projectController.getProject)
    .put(projectController.putProjects)
    .delete(projectController.deleteProjects);

//tasks    
router.route('/tasksHour/:id')
    .put(taskController.postTaskHour);

router.route('/tasks')
    .post(taskController.postTasks)
    .get(taskController.allTasks);

router.route('/tasksProj/:idPro')
    .get(taskController.getTaskProject);

router.route('/tasks/:id')
    .get(taskController.getTask)
    .put(taskController.putTasks)
    .delete(taskController.deleteTasks);

//..users
router.route('/userAuth/:id')
    .get(authController.isAuthenticated, userController.getUser);

router.route('/users')
    .post(userController.postUsers)
    .get(userController.allUsers);

//image
router.route('/images')
    .post(upload.single('image'), imageController.postImages)
    .get(imageController.allImages);

router.route('/images/:id')
    .get(imageController.getImage)
    .delete(imageController.deleteImage);

mongoose.connect("mongodb://127.0.0.1:27017/TimeController", {
    // usar para evitar problemas con el node
    useCreateIndex: true,
    useNewUrlParser: true
}).then(() => {
    console.log("acess to mongo confirm");

});

router.get('/', function (res) {
    res.json({ message: 'This is the base of nodeJS' });
});


app.use("/api", router);

var port = 3005;

app.listen(port);

console.log('Insert module on port ' + port);