const multer = require('multer');
const crypto = require('crypto');
const { extname, resolve } = require('path')
module.exports =  {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
        console.log(req)
      crypto.randomBytes(16, (error, res) => {
        console.log(file.originalname);
        if (error) return cb(error);
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
