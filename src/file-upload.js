const { Storage } = require("@google-cloud/storage");
const express = require("express");
const cors = require("cors");
const { format } = require("util");
const Multer = require("multer");

const app = express();
const port = 5000;
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});
app.use(cors());
const cloudStorage = new Storage({
  keyFilename: `${__dirname}/service_account_key.json`,
  projectId: "retail-shinonome"
});
const bucketName = "shinonome-retail";
const bucket = cloudStorage.bucket(bucketName);
app.post(
  "/upload-file-to-cloud-storage",
  multer.single("file"),
  function (req, res, next) {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.on("error", (err) => {
      next(err);
    });
    blobStream.on("finish", () => {
      // The public URL can be used to directly access the file via HTTP.
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      res.status(200).json({ publicUrl });
    });
    blobStream.end(req.file.buffer);
    console.log(req.file);
  }
);
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
