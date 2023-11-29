const About = require('../model/About.ts');

// Get data
const getAboutPageData = async (req, res) => {
    try {
        const aboutData = await About.find();
        res.json(aboutData);
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
};

// Update data
const updateAboutPageData = async (req, res) => {
    try {
        const about = await About.findOne(); // Retrieve data
    
        if (!about) {
          // Create if it data does not exist
          const newAbout = new About({
            aboutUs: req.body.aboutUs,
            ourMission: req.body.ourMission,
            ourValues: req.body.ourValues,
            meet: req.body.meet
          });
          await newAbout.save();
          return res.json({ message: 'New About entry created' });
        }
    
        // Update fields
        about.aboutUs = req.body.aboutUs;
        about.ourMission = req.body.ourMission;
        about.ourValues = req.body.ourValues;
        about.meet = req.body.meet;
        await about.save();
    
        res.json({ message: 'About details updated successfully' });
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
};

module.exports = {
    getAboutPageData,
    updateAboutPageData
}