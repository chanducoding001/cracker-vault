const { signUpController, loginController, settingsController } = require("../controllers/authController");

const router = require("express").Router();

router.post(process.env.SIGNUP_URL, signUpController);
router.post(process.env.LOGIN_URL, loginController);
router.post(process.env.SETTINGS_URL,settingsController);

module.exports = router;
