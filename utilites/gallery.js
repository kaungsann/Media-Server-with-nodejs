const saveFile = async (req, res, next) => {
  let filename = req.files.file;
  if (!filename) {
    next();
  } else {
    let file = new Date().valueOf() + "_" + filename.name;
    filename.mv(`./upload/${file}`);
    req.body["image"] = file;
    next();
  }
};
const saveFiles = async (req, res, next) => {
  let file = req.files.files;
  let fileArray = [];
  file.forEach((file) => {
    let filename = new Date().valueOf() + "_" + file.name;
    file.mv(`./upload${filename}`);
    fileArray.push(filename);
  });
  req.body["images"] = fileArray.join(",");
};

module.exports = {
  saveFile,
  saveFiles,
};
