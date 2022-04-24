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
     /**
    * @swagger
    * /quizdata/create:
    *   post:
    *     tags:
    *       - Quiz Data
    *     summary: Create a new Quiz Data
    *     description: Create a new quiz data by an instructor
    *     parameters:
    *       - in: header
    *         name: token
    *         description: an authorization header
    *         required: true
    *         type: string
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               quiz_id:
    *                 type: integer
    *               quizdata_question:
    *                 type: string
    *               quizdata_answers:
    *                 type: string
    *     responses:
    *       201:
    *         description: Successfully created quiz
    *         content:
    *           application/json:
    *             schema:
    *               properties:
    *                 result:
    *                   type: array
    *                   items:
    *                     type: object
    *                     properties:
    *                       quiz_id:
    *                         type: integer
    *                       quizdata_question:
    *                         type: string
    *                       quizdata_answers:
    *                         type: string
    *                       quizdata_id:
    *                         type: integer            
    *       400:
    *         description: Bad Request
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 error:
    *                   type: string
    *       401:
    *         description: Unauthorized
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *       403:
    *         description: no token provided
    *       500:
    *         description: An internal error occured.
    */
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

   /**
    * @swagger
    * /quizdata/{id}:
    *   get:
    *     tags:
    *       - Quiz Data
    *     summary: Get a quiz's data by id
    *     description: Get a quiz's data by id
    *     parameters:
    *       - in: path
    *         name: id
    *         description: the id of the quiz
    *         required: true
    *         type: integer
    *     responses:
    *       200:
    *         description: Successfully retrieved quiz
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 quiz:
    *                   type: object
    *                   properties:
    *                       quiz_id:
    *                         type: integer
    *                       quizdata_question:
    *                         type: string
    *                       quizdata_answers:
    *                         type: string
    *       400:
    *         description: Bad Request
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 error:
    *                   type: string
    *       401:
    *         description: Unauthorized
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *       403:
    *         description: no token provided
    *       500:
    *         description: An internal error occured.
    */
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
   

    /**
    * @swagger
    * /quizdata/delete/{id}:
    *   delete:
    *     tags:
    *       - Quiz Data
    *     summary: Delete a quiz's data by id
    *     description: Delete a quiz's data by id
    *     parameters:
    *       - in: path
    *         name: id
    *         description: the id of the quiz
    *         required: true
    *         type: integer
    *       - in: header
    *         name: token
    *         description: an authorization header
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: Successfully deleted quiz
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: boolean
    *       400:
    *         description: Bad Request
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 error:
    *                   type: string
    *       401:
    *         description: Unauthorized
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *       403:
    *         description: no token provided
    *       500:
    *         description: An internal error occured.
    */
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