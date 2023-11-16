const Home = require('../model/Home.ts');

// Get data
const getHomePageData = async (req, res) => {
  try {
    const homeData = await Home.find();
    res.json(homeData);
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
};
  
  // Update data
  const updateHomePageData = async (req, res) => {
    try {
      const home = await Home.findOne(); // Retrieve data
  
      if (!home) {
        // Create if it data does not exist
        const newHome = new Home({
          hero: req.body.hero,
          info: req.body.info
        });
        await newHome.save();
        return res.json({ message: 'New Home entry created' });
      }
  
      // Update fields
      home.hero = req.body.hero;
      home.info = req.body.info;
      await home.save();
  
      res.json({ message: 'Home details updated successfully' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

  module.exports = {
    getHomePageData, 
    updateHomePageData
  }