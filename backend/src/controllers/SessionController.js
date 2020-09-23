const User = require('../models/User');

module.exports = {
   async store(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    let user = await User.findOne({ email, password });

    if(!user) {
      user =  await User.create({ email, password });
    }

    return res.json(user);
  },

  async findUser(req, res) {
    const email = req.query.email;
    const password = req.query.password;

    console.log(email);
    console.log(password);

    let user = await User.findOne({email, password});

    if(user != null) {
      
      return res.json(user);
    }else {
      return res.json({message: "user not found"});
    }

  }
};