var express = require(`express`)
var router = express.Router();
const ServiceLocator = require("../services/utility/ServiceLocator");
const AuthService = require("../services/utility/AuthService");

const QuizDataService = require("../services/QuizDataService");

const utcStr = new Date().toUTCString();

router
    .use(function timeLog(req, res, next) {
        console.log('Access quizdata route Time: ', utcStr);
        next();
    })
 
    .post("/api/quizdata/create", async(req, res) => {
        /**
         * @type {QuizDataService}
         */
        const quizDataService = ServiceLocator.getService(QuizDataService.name);

        try{
            const { payload: result, error } = await quizDataService.createQuizData(req.body);
            if(error) {
                res.status(400).json(error);
            } else {
                res
                    .status(201)
                    .json({
                        result
                    });
            }
        }catch(e){
            console.log("An error occured in quizRoutes, post/quizdata");
            res.status(500).end();
        }
        
        
    })

 
    .get("/api/quizdata/:id", async(req, res) => {

        /**
         * @type {QuizDataService}
         */
        const quizDataService = ServiceLocator.getService(QuizDataService.name);
        req.body.quiz_id = req.params.id;
        try{
            
            const { payload: quizdata, error } = await quizDataService.getQuizData(req.body);

            if(error) {
                res.status(400).json(error);
            } else {
                res
                    .status(200)
                    .json(
                        {
                            quiz_id:quizdata.quiz_id,
                            quizdata_question:question.quizdata_question,
							quizdata_answers:answers.quizdata_answers,
                        }
                    );
            }
        }catch(e){
            console.log("an error occured in quizdataRoutes, get/quizdata");
            res.status(500).end();
        }

    })
    
    .delete("/api/quizdata/:id", async(req, res) => {

        /**
         * @type {quizDataService}
         */
        const quizDataService = ServiceLocator.getService(QuizDataService.name);
        req.body.quiz_id = req.params.id;
        try{
            
            const { payload: message, error } = await quizDataService.deleteQuizData(req.body);

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
            console.log("an error occured in quizdataRoutes, delete/quizdata");
            res.status(500).end();
        }

    });

module.exports = router;