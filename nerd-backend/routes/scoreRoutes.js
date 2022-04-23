var express = require(`express`)
var router = express.Router();
const ServiceLocator = require("../services/utility/ServiceLocator");
const AuthService = require("../services/utility/AuthService");

const ScoreService = require("../services/ScoreService");

const utcStr = new Date().toUTCString();
//score routes
router
    .use(function timeLog(req, res, next) {
        console.log('Access score route Time: ', utcStr);
        next();
    })
    
  
    .post("/api/score/create", [AuthService.verifyToken, AuthService.verifyUserType], async(req, res) => {
        /**
         * @type {ScoreService}
         */
        const scoreService = ServiceLocator.getService(ScoreService.name);
        if(req.user_type != "student"){
            res.status(401).json({message: "Accsess Denied: Wrong User Type"});
        }
        try{
            const { payload: result, error } = await scoreService.createScore(req.body);
            if(error) {
                res.status(400).json(error);
            } else {
                res
                    .status(201)
                    .json(result);
            }
        }catch(e){
            console.log("An error occured in ScoreRoutes, post/score");
            res.status(500).end();
        }
        
        
    })

   
   
    .get("/api/score/:id", AuthService.verifyToken, async(req, res) => {

        /**
         * @type {ScoreService}
         */
        const scoreService = ServiceLocator.getService(ScoreService.name);
        req.body.score_id = req.params.id;
        try{
            
            const { payload: score, error } = await scoreService.getScore(req.body);

            if(error) {
                res.status(400).json(error);
            } else {
                res
                    .status(200)
                    .json(score );
            }
        }catch(e){
            console.log("an error occured in scoreRoutes, get/score",e);
            res.status(500).end();
        }

    })

   
    .put("/api/score/update/:id", AuthService.verifyToken, async(req, res) => {

        /**
         * @type {ScoreService}
         */
        const scoreService = ServiceLocator.getService(ScoreService.name);
        req.body.score_id = req.params.id;
        try{
            
            const { payload: message, error } = await scoreService.updateScore(req.body);

            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({message: message});
            }
        }catch(e){
            console.log("an error occured in scoreRoutes, put/score");
            res.status(500).end();
        }

    })


    .delete("/api/score/delete/:id", AuthService.verifyToken, async(req, res) => {

        /**
         * @type {ScoreService}
         */
        const scoreService = ServiceLocator.getService(ScoreService.name);
        req.body.score_id = req.params.id;
        try{
            
            const { payload: message, error } = await scoreService.deleteScore(req.body);

            if(error) {
                res.status(400).json(error);
            } else {
                res
                    .status(200)
                    .json(
                        {
                            message: message
                        }
                    );
            }
        }catch(e){
            console.log("an error occured in scoreRoutes, delete/score");
            res.status(500).end();
        }

    });

module.exports = router;