const File = require('../models/File');
const User = require('../models/User');
const Training = require('../models/Training');

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

    await User.updateOne({_id: user._id},  { $set: { avatar: file }});
    user.avatar = file;
    return res.json(user);
  }

  async storeBanner(req, res) {
    console.log('file controller ', req.params.id)
    const training = await Training.findById( req.params.id);
    
    console.log('emcontrou banner ', training)
    const { originalname: name, filename: path } = req.file;
    const file = new File({
      name,
      path,
    });

    console.log('criou arquivo ',file)

    await Training.updateOne({_id: training._id},  { $set: { banner: file }});
    training.banner = file;
    return res.json(training);
  }
}

module.exports = new FileController();
