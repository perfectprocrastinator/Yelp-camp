var express    = require('express');
    app        = express();
    bodyParser = require('body-parser');
    mongoose   = require('mongoose');
    Campground = require('./models/campground')
    seedDB     = require('./seeds');
//exported function by seeds.js file is store in seedDB and the the fn is called using seedDB();
seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
//because views is in other folder
app.set('views','v2/views');
//SCHEMA SETUP
//
// Campground.create(
//     {
//         name:"SalmonCreek ",img:"https://farm6.staticflickr.com/5098/5496185186_d7d7fed22a.jpg",desc:"A very beautiful mountain in Spain"
//     }
//         ,function (err,campgound) {
//         if(err){
//             console.log("error")
//
//         }
//         else {
//             console.log("newly created campground");
//             console.log(campgound);
//         }
//
//     }
// );


console.log("Yelp camp has started");
app.get('/',function (req,res) {
    res.render("landing");

})
//INDEX Route-- Show all campgrounds
app.get('/campground',function (req,res) {
    //Get all Campgrounds from DB
    Campground.find({},function (err,allcampgrounds) {

        if(err){
            console.log("error is:"+err);
        }
        else{
            res.render("index",{campgrounds:allcampgrounds});
            //here campground is ejs file
        }

    })



});
//NEW ROUTE-- show form to create new campgorunds
app.get('/campground/new',function (req,res) {
    res.render("new.ejs");

})
//SHOW ROUTE --show info about one campground
app.get('/campground/:id',function (req,res) {
    Campground.findById(req.params.id,function (err,foundCampground) {
        if(err){
            console.log(err)
        }
        else{
            res.render("show",{campground:foundCampground});
        }

    })

})
//CREATE --add new campgrounds to DB
app.post('/campground',function (req,res) {
    var name=req.body.name;
    var img=req.body.image;
    var desc=req.body.description;
    var newObj={name:name,img:img,desc:desc};
    console.log(newObj);
    //create a new campground and save to database
    Campground.create(newObj,function (err,newlyCreated) {
        if(err){
            console.log(err);
        }
        else{
            res.redirect('campground');
        }
        
    })
   // console.log(campgrounds);
    //redirect back to campgrounds page
    //res.redirect('campground');

})
app.listen('2325',function () {
    console.log("Server started on port 2325");
    
})