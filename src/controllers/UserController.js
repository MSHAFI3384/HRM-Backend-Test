import UserService from '../services/UserService'

module.exports = class Activity {

    static async apiLogin(req, res, next){
        try {
          const User = await UserService.userLogin(req.body, res);
          if(!User){
             res.status(404).json("User not Found!")
          }
          res.json(User);
        } catch (error) {
           res.status(500).json({error: error})
        }
  
    }

}