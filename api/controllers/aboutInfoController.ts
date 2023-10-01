const about = require('../model/aboutPage.ts');

// get about page details
const getAboutPageDetails = async (req, res) => {
    about.find(function(err, about){
        if(err) {
            console.log(err);
        } else {
            res.json(about)
        }
    })
};

// add new about page details (?)
// might be covered by 'update' function

// update about page details
const updateAboutPage = async (req, res) => {
    about.findById(req.params.id, function(err, about){
        if(!about)
            res.status(400).send("Page details not found.")
        else {
            about.openingPitch = req.body.openingPitch;
            about.aboutUs = req.body.aboutUs;
            about.ourMission = req.body.ourMission;
            about.ourValues = req.body.ourValues;
            about.meetGail = req.body.meetGail;
            image: {
                data: req.body.image.data,
                contentType: req.body.image.contentType,
            };
        }
    })
};

// delete about page details
const deleteAboutPageDetails = async(req, res) => {
    about.findByIdAndRemove({_id:req.params.id}, function(err, about) {
        if(err) res.json(err);
        else res.json("About Page details deleted.");
    })
};

module.exports = {
    getAboutPageDetails,
    updateAboutPage,
    deleteAboutPageDetails
}