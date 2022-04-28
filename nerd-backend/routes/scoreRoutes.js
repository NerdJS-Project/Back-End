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
    
    /** 
    * @swagger
    * /score/create:
    *   post:
    *     tags:
    *       - Score
    *     summary: Add new Score
    *     description: Add new Score. User should add scores for each quiz.
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
    *               user_id:
    *                 type: integer
    *               quiz_id:
    *                 type: integer
    *               class_id:
    *                 type: string
    *               lesson_id:
    *                 type: integer
    *               module_id:
    *                 type: integer
    *               unit_id:
    *                 type: integer
    *               instructor_id:
    *                 type: integer
    *               score:
    *                 type: integer
    *     responses:
    *       201:
    *         description: The Score was added to the database
    *         content:
    *           application/json:
    *             schema:
    *               properties:
    *                 result:
    *                   type: array
    *                   items:
    *                     type: object
    *                     properties:
    *                       user_id:
    *                         type: integer
    *                       quiz_id:
    *                         type: integer
    *                       class_id:
    *                         type: string
    *                       lesson_id:
    *                         type: integer
    *                       module_id:
    *                         type: integer
    *                       unit_id:
    *                         type: integer
    *                       instructor_id:
    *                         type: integer
    *                       score:
    *                         type: integer
    *       400:
    *         description: The Score was not added to the database
    *       401:
    *         description: The user is not authorized to add a score
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *       500:
    *         description: An internal error occured
    */
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

   
    /** 
    * @swagger
    * /score/{id}:
    *   get:
    *     tags:
    *       - Score
    *     summary: Retrieve a Score
    *     description: Retrieve a Score by id. 
    *     parameters:
    *       - in: header
    *         name: token
    *         description: an authorization header
    *         required: true
    *         type: string
    *       - in: path
    *         name: id
    *         description: score id
    *         required: true
    *         type: integer
    *     responses:
    *       201:
    *         description: The Score was added to the database
    *         content:
    *           application/json:
    *             schema:
    *               properties:
    *                 result:
    *                   type: array
    *                   items:
    *                     type: object
    *                     properties:
    *                       user_id:
    *                         type: integer
    *                       quiz_id:
    *                         type: integer
    *                       class_id:
    *                         type: string
    *                       lesson_id:
    *                         type: integer
    *                       module_id:
    *                         type: integer
    *                       unit_id:
    *                         type: integer
    *                       instructor_id:
    *                         type: integer
    *                       score:
    *                         type: integer
    *       400:
    *         description: The Score was not added to the database
    *       401:
    *         description: The user is not authorized to add a score
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *       500:
    *         description: An internal error occured
    */
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

    /** 
    * @swagger
    * /score/student/{id}:
    *   get:
    *     tags:
    *       - Score
    *     summary: Retrieve a Score by student id
    *     description: Retrieve a Score by id. User should be able to see their scores for each quiz.
    *     parameters:
    *       - in: header
    *         name: token
    *         description: an authorization header
    *         required: true
    *         type: string
    *       - in: path
    *         name: id
    *         description: user id
    *         required: true
    *         type: integer
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               quiz_id:
    *                 type: integer
    *     responses:
    *       201:
    *         description: The Score was added to the database
    *         content:
    *           application/json:
    *             schema:
    *               properties:
    *                 result:
    *                   type: array
    *                   items:
    *                     type: object
    *                     properties:
    *                       user_id:
    *                         type: integer
    *                       quiz_id:
    *                         type: integer
    *                       class_id:
    *                         type: string
    *                       lesson_id:
    *                         type: integer
    *                       module_id:
    *                         type: integer
    *                       unit_id:
    *                         type: integer
    *                       instructor_id:
    *                         type: integer
    *                       score:
    *                         type: integer
    *       400:
    *         description: The Score was not added to the database
    *       401:
    *         description: The user is not authorized to add a score
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *       500:
    *         description: An internal error occured
    */
    .get("/api/score/student/:id", AuthService.verifyToken, async(req, res) => {

        /**
         * @type {ScoreService}
         */
        const scoreService = ServiceLocator.getService(ScoreService.name);
        req.body.user_id = req.params.id;
        try{
            
            const { payload: score, error } = await scoreService.getScoreStudent(req.body);

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

    /** 
    * @swagger
    * /score/instructor/{id}:
    *   get:
    *     tags:
    *       - Score
    *     summary: Retrieve a Score for an instructor
    *     description: Retrieve a Score by id. User should be able to see their scores for each quiz.
    *     parameters:
    *       - in: header
    *         name: token
    *         description: an authorization header
    *         required: true
    *         type: string
    *       - in: path
    *         name: id
    *         description: instructor id
    *         required: true
    *         type: integer
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               quiz_id:
    *                 type: integer
    *     responses:
    *       201:
    *         description: The Score was added to the database
    *         content:
    *           application/json:
    *             schema:
    *               properties:
    *                 result:
    *                   type: array
    *                   items:
    *                     type: object
    *                     properties:
    *                       user_id:
    *                         type: integer
    *                       quiz_id:
    *                         type: integer
    *                       class_id:
    *                         type: string
    *                       lesson_id:
    *                         type: integer
    *                       module_id:
    *                         type: integer
    *                       unit_id:
    *                         type: integer
    *                       instructor_id:
    *                         type: integer
    *                       score:
    *                         type: integer
    *       400:
    *         description: The Score was not added to the database
    *       401:
    *         description: The user is not authorized to add a score
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *       500:
    *         description: An internal error occured
    */
    .get("/api/score/instructor/:id", AuthService.verifyToken, async(req, res) => {

        /**
         * @type {ScoreService}
         */
        const scoreService = ServiceLocator.getService(ScoreService.name);
        req.body.instructor_id = req.params.id;
        try{
            
            const { payload: score, error } = await scoreService.getScoreInstructor(req.body);

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


    /** 
    * @swagger
    * /score/update/{id}:
    *   put:
    *     tags:
    *       - Score
    *     summary: update a Score
    *     description: Update a score by id.
    *     parameters:
    *       - in: header
    *         name: token
    *         description: an authorization header
    *         required: true
    *         type: string
    *       - in: path
    *         name: id
    *         description: score id
    *         required: true
    *         type: integer
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               score:
    *                 type: integer
    *     responses:
    *       201:
    *         description: The Score was added to the database
    *         content:
    *           application/json:
    *             schema:
    *               properties:
    *                 message:
    *                  type: string
    *       400:
    *         description: The Score was not added to the database
    *       401:
    *         description: The user is not authorized to add a score
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *       500:
    *         description: An internal error occured
    */
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

    /** 
    * @swagger
    * /score/delete/{id}:
    *   delete:
    *     tags:
    *       - Score
    *     summary: delete a Score
    *     description: delete a score by id.
    *     parameters:
    *       - in: header
    *         name: token
    *         description: an authorization header
    *         required: true
    *         type: string
    *       - in: path
    *         name: id
    *         description: score id
    *         required: true
    *         type: integer
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               score_id:
    *                 type: integer
    *     responses:
    *       201:
    *         description: The Score was added to the database
    *         content:
    *           application/json:
    *             schema:
    *               properties:
    *                 message:
    *                  type: string
    *       400:
    *         description: The Score was not added to the database
    *       401:
    *         description: The user is not authorized to add a score
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message:
    *                   type: string
    *       500:
    *         description: An internal error occured
    */
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