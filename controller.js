const jobModel = require("./model");
const jobCreate = async (req, res, next) => {
    try {
        // console.log(req.body);
        // Insert data into DB
        const jobObj = {
            ...req.body,
            isVacant: true
        }

        const response = await jobModel.create(jobObj); // db.jobs.insertOne()
        console.log(response);
        res.json({
            success: true,
            message: `Job created successfully with id ${response._id}`
        });
    } catch (err) {
        next(err);
    }
};
const jobList = async(req, res, next) => {
     try{
        const minExperienceRequired = parseInt(req.query.minExperienceRequired || 0);
        const jobList = await jobModel.find({
            minExperienceRequired:{
                $gte: minExperienceRequired
            }
        });

        //  const jobList = await jobModel.find();
        //  const jobList = await jobModel.findById("67c974f642ba1defdef7f5c0");
         res.json({
            success: true,
            message: "LIST JOb API",
            data: jobList
         })
     }catch(err){
        next(err);
     }
};
const jobEdit = async(req, res, next) =>{
   try{
     const findJob = {
        minExperienceRequired:{
            $gte:1
        }
     };
     const updateObj = {
        title:"MERN Stack Developer"
     }
     await jobModel.updateOne(findJob,updateObj);

     res.json({
        success: true,
        message: "Edited SUcessfully"
     })

   }catch(err){
    next(err);
   }
};
const jobDelete = async (req, res, next) => {
    try{
      const findJob = {
        minExperienceRequired:{
            $eq:0
        }
      };
      await jobModel.deleteOne(findJob);

      res.json({
        success: true,
        mesage: "Delete only one"
      });
    }catch(err){
        next(err);
    }
};

const jobController = {
    jobCreate,
    jobList,
    jobEdit,
    jobDelete
}

module.exports = jobController;