const express=require("express");
const router = express.Router();
const {getProblem,getProblemById,getProblemByText} = require("../controllers/getProblem");
const {createProblem} = require("../controllers/createProblem");
const {updateProblem} = require("../controllers/updateProblem");
const {markProblem, unmarkProblem, getMarkedProblem, storeSolvedQuestion, getSolvedProblem} = require("../controllers/markProblem");

const {deleteProblem} = require("../controllers/deleteProblem");
const { createContest } = require("../controllers/contestControllers.js/createContest");
const { getContest, getContestById } = require("../controllers/contestControllers.js/getContest");
const {signup, login} = require("../controllers/Auth")
const {checkout,paymentVerification} = require("../controllers/paymentController.js");
const { getList, getSubmissions } = require("../controllers/Revision.js");
const { getUserData, manageFriend, getFriendList, addFriend, removeFriend, updateUser } = require("../controllers/UserController.js");

// revisin list


router.post("/signup", signup);
router.post("/login", login);

router.get("/getProblem",getProblem);
router.get("/getProblemByText",getProblemByText);
router.get("/getProblem/:id",getProblemById);

router.get("/getMarkedProblem", getMarkedProblem);
router.put("/storeSolvedQuestion",storeSolvedQuestion);
router.get("/getSolvedProblem", getSolvedProblem);
router.put("/markProblem",markProblem);
router.put("/unmarkProblem", unmarkProblem);



// revision routers
router.get("/getList",getList);
router.get("/getSubmissions", getSubmissions);



// users router
router.get("/getUserData", getUserData);
router.put("/manageFriend", manageFriend);
router.put("/addFriend", addFriend);
router.put("/removeFriend", removeFriend);
router.get("/getFriendList", getFriendList);
router.put("/updateUser", updateUser);

router.post("/createProblem",createProblem);
router.put("/updateProblem/:id",updateProblem);
router.delete("/deleteProblem/:id",deleteProblem);
router.post("/createContest",createContest);
router.get("/getContest",getContest);
router.get("/getContest/:id",getContestById);
router.post("/checkout",checkout);
router.post("/paymentverification", paymentVerification);

module.exports = router;
