const File = require('../models/File');
const User = require('../models/User');

class FileController {
  async store(req, res) {
    console.log('file controller ', req.params.id)
    const user = await User.findOne({_id: req.params.id});
    
    console.log('emcontrou user ',user)
    const { originalname: name, filename: path } = req.file;
    const file = new File({
      name,
      path,
    });

    console.log('criou arquivo ',file)

    await User.update({_id: user._id},  { $set: { avatar: file }});

    return res.json({...user, avatar: file});
  }
}

module.exports = new FileController();
