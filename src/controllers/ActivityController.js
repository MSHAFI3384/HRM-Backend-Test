import ActivityService from '../services/ActivityService'
module.exports = class Activity{

   static async test(req, res, next){
       try {
         const test = await ActivityService.test(req.body);
         if(!test){
            res.status(404).json("test!")
         }
         res.json(test);
       } catch (error) {
          res.status(500).json({error: error})
       }

      }

   static async apiGetAllActivitys(req, res, next){
      try {
        const Activitys = await ActivityService.getAllActivitys();
        if(!Activitys){
           res.status(404).json("There are no Activity published yet!")
        }
        res.json(Activitys);
      } catch (error) {
         res.status(500).json({error: error})
      }

  }

   static async apiGetActivityById(req, res, next){
      try {
         let id = req.params.id || {};
         const Activity = await ActivityService.getActivitybyId(id);
         res.json(Activity);
      } catch (error) {
         res.status(500).json({error: error})
      }
   }

   static async apiGetActivityByLeadId(req, res, next){
      try {
         let id = req.query.id || {};
         const leadActivity = await ActivityService.getActivityByLeadId(id);
         return leadActivity;
         //res.json(Activity);
      } catch (error) {
         res.status(500).json({error: error})
      }
   }

   static async apiCreateActivity(req, res, next){
      try {
         const createdActivity =  await ActivityService.createActivity(req.body);
         res.status(200).json(createdActivity)
      } catch (error) {
         res.status(500).json({error: error});
      }
   }

   static async apiCreateMultipleActivity(req, res, next){
      try {
         const createdMultipleActivity =  await ActivityService.createMultipleActivity(req);
         //res.status(200).json(createdMultipleActivity)
         return createdMultipleActivity.ops;
      } catch (error) {
         res.status(500).json({error: error});
      }
   }

   static async apiUpdateActivity(req, res, next){
      try {
         const comment = {}
         comment.title        = req.body.title;
         comment.body         = req.body.body;
         comment.ActivityImage = req.body.Activity_image

         const updatedActivity = await ActivityService.updateActivity(comment);

         if(updatedActivity.modifiedCount === 0){
            throw new Error("Unable to update Activity, error occord");
         }

         res.json(updatedActivity);

      } catch (error) {
         res.status(500).json({error: error});
      }
   }

   static async apiDeleteActivity(req, res, next){
         try {
            const ActivityId = req.params.id;
            const deleteResponse =  await ActivityService.deleteActivity(ActivityId)
            res.json(deleteResponse);
         } catch (error) {
            res.status(500).json({error: error})
         }
   }

}