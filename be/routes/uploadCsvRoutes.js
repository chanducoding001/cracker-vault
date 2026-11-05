const { uploadCsvController, getCsvDataController } = require("../controllers/uploadCsvController");
const upload = require("../middlewares/upload");

const router = require("express").Router();


router.post(process.env.UPLOAD_CSV_TAIL_URL,upload.single("file"), uploadCsvController);

router.get(process.env.GET_UPLOADED_CSV_DATA_URL, getCsvDataController);


module.exports = router;

