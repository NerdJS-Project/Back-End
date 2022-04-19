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
    *     summary: Adds a new score to the database
    *     description: Creates a new score in the database
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               score_name:
    *                 type: string
    *               score_email:
    *                 type: string
    *               score_password:
    *                 type: string
    *               score_type:
    *                 type: string
    *     responses:
    *       201:
    *         description: The score was added to the database
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message: 
    *                   type: boolean
    *       400:
    *         description: The score was not added to the database
    *       500:
    *         description: An internal error occured
    */
    .post("/api/score/create", AuthService.encrypt, async(req, res) => {
        /**
         * @type {ScoreService}
         */
        const scoreService = ServiceLocator.getService(ScoreService.name);

        try{
            const { payload: message, error } = await scoreService.createScore(req.body);
            if(error) {
                res.status(400).json(error);
            } else {
                res
                    .status(201)
                    .json({message: message});
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
    *     summary: Retrieve a single score.
    *     description: Retrieve a single score. Only the score that created the score can retrieve it.
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: Numeric ID of the score to retrieve.
    *         type: integer
    *       - in: header
    *         name: token
    *         description: an authorization header
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: Retrieved a single score by id.
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 score_id: 
    *                   type: integer
    *                   description: The score ID.
    *                   example: 0
    *                 score_name: 
    *                   type: string
    *                   description: The score's name.
    *                   example: Leanne Graham
    *                 score_email: 
    *                   type: string
    *                   description: The score's email.
    *                   example: john@email.com
    *                 score_type: 
    *                   type: string
    *                   description: The score's type.
    *                   example: admin
    *       400:
    *         description: The score was not retrieved.
    *       401:
    *         description: The score was not retrieved because the score is not authorized
    *       403:
    *         description: The score was not retrieved because no token was provided in header
    *       500:
    *         description: An internal error occured.
    */
    .get("/api/score/:id", AuthService.verifyToken, async(req, res) => {

        /**
         * @type {ScoreService}
         */
        const scoreService = ServiceLocator.getService(ScoreService.name);
        req.body.score_id = req.params.id;
        try{
            
            const { payload: score, error } = await scoreService.getScoreById(req.body);

            if(error) {
                res.status(400).json(error);
            } else {
                res
                    .status(200)
                    .json(
                        {
                            score_id:score.score_id,
                            score_email:score.score_email,
                            score_name:score.score_name,
                            score_type:score.score_type
                        }
                    );
            }
        }catch(e){
            console.log("an error occured in scoreRoutes, get/score");
            res.status(500).end();
        }

    })

    /**
    * @swagger
    * /score/update/{id}:
    *   put:
    *     tags:
    *       - Score
    *     summary: Update a single score.
    *     description: Update a single score, by sending the score's id and the score's new information. The score's id is required to update the score.NOTE The score's password and email are not updated. Anyfield left blank will be erased.
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: Numeric ID of the score to update.
    *         type: integer
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
    *               score_name:
    *                 type: string
    *               score_type:
    *                 type: string
    *     responses:
    *       200:
    *         description: The score was updated.
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message: 
    *                   type: boolean
    *       400:
    *         description: The score was not updated
    *       401:
    *         description: The score was not updated because the score is not authorized
    *       403:
    *         description: The score was not updated because no token was provided in header
    *       500:
    *         description: An internal error occured
    */
    .put("/api/score/update/:id", AuthService.verifyToken, async(req, res) => {

        /**
         * @type {ScoreService}
         */
        const scoreService = ServiceLocator.getService(ScoreService.name);
        req.body.score_id = req.score_id;
        try{
            
            const { payload: message, error } = await scoreService.updateScore(req.body);

            if(error) {
                res.status(400).json(error);
            } else {
                res
                    .status(200)
                    .json({message: message});
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
    *     summary: Delete a single score.
    *     description: Delete a single score, by sending the score's id. The score's id is required to delete the score.
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: Numeric ID of the score to delete.
    *         type: integer
    *       - in: header
    *         name: token
    *         description: an authorization header
    *         required: true
    *         type: string
    *     responses:
    *       200:
    *         description: The score was deleted.
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 message: 
    *                   type: boolean
    *       400:
    *         description: The score was not deleted from the database
    *       401:
    *         description: The score was not deleted because the score is not authorized
    *       403:
    *         description: The score was not deleted because no token was provided in header
    *       500:
    *         description: An internal error occured
    */
    .delete("/api/score/delete/:id", AuthService.verifyToken, async(req, res) => {

        /**
         * @type {ScoreService}
         */
        const scoreService = ServiceLocator.getService(ScoreService.name);
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