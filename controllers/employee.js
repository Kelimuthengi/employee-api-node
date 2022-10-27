const Employee = require("../models/employee");
const asyncwrapper = require("../middleware/async");
const { createCustomError } = require("../error/customerror")


const addEmployee = asyncwrapper(async (req, res,) => {
  const employee = await Employee.create(req.body);
  return res.status(200).json({ success: true, data: employee });
});

const allemployee = asyncwrapper(async (req, res,next) => {
  const employees = await Employee.find();
  if (!employees) {

   return next(createCustomError("no employees in the database!", 400));
    // return res
    //   .status(400)
    //   .json({ success: false, message: "no employees in the database!" });
  }
  return res.status(200).json({
    succe: true,
    data: employees,
    user: req.user,
    number: (await employees).length,
  });
});

const getemployeequery = asyncwrapper(async (req, res,next) => {
  const { empid, username } = req.query;
  if (empid || username) {
    const employee = await Employee.findOne({
      ...(empid ? { _id: empid } : {}),
      ...(username ? { name: username } : {}),
    });
    if (!employee) {
    return  next(createCustomError(`no employee with such details`, 400));
      // return res
      //   .status(400)
      //   .json({ success: true, message: `no employee with such details` });
    }
    return res
      .status(200)
      .json({ success: true, data: employee, userdata: req.user });
  }
});

const getanemployee = asyncwrapper(async (req, res,next) => {
  const { id, name } = req.params;
  if (id || name) {
    const employee = await Employee.findOne({
      ...(id ? { _id: id } : {}),
      ...(name ? { name: name } : {}),
    });

    if (!employee) {
   return next(
     createCustomError("there is no employee with such details", 400)
   );
      // return res.status(400).json({
      //   success: false,
      //   message: "there is no employee with such details",
      // });
    }
    return res.status(200).json({ success: true, data: employee });
  }

  // try {
  //     const { id, name } = req.params;
  //   console.log(id, name);
  // const employee = await Employee.findOne({_id:id})
  // if(!employee){
  //   return res.status(400).json({success:false, message:`no employee with such ${id}`});
  // }
  // return res.status(200).json({success:true, data:employee});
  // } catch (error) {
  //    res.status(500).json({ message: error.message });
  // }
});

const deleteuser = asyncwrapper(async (req, res, next) => {
  const { empid, username } = req.query;

  if (empid || username) {
    const employee = await Employee.findOneAndDelete({
      ...(empid ? { _id: empid } : {}),
      ...(username ? { name: username } : {}),
    });

    if (!employee) {
      next(createCustomError("no employee with such details",400));
      // return res.status(400).json({ message: "no employee with such details" });
    }
    return res.status(200).json({ message: "delete successfully" });
  }
});

const editemployee = asyncwrapper(async (req, res, next) => {
  const { empid } = req.params;
  const newemployee = await Employee.findByIdAndUpdate(
    { _id: empid },
    req.body,
    {
      new: true,
      // runValidators:true,
      // overwrite:true
    }
  );
  if (!newemployee) {
  return next(createCustomError("no employee with such details", 400));
    // return res.status(400).json({ message: "no employee with such details" });
  }
  return res.status(200).json({ success: true, data: newemployee });
});

module.exports = {
  addEmployee,
  allemployee,
  getemployeequery,
  getanemployee,
  deleteuser,
  editemployee,
};
