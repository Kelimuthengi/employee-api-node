const express = require('express')
const router = express.Router();
const {
  addEmployee,
  allemployee,
  getemployeequery,
  getanemployee,
  deleteuser,
  editemployee,
} = require("../controllers/employee");

router.post("/addemployee", addEmployee);
router.get("/allemployees", allemployee);
router.get('/getsingleemployee/query', getemployeequery);
router.get("/getanemployee/:id/:name", getanemployee)
router.delete("/deleteauser/query", deleteuser);
router.put("/updatemployee/:empid", editemployee);
module.exports = router