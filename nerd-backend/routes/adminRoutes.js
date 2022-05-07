var express = require(`express`)
var router = express.Router();
const ServiceLocator = require("../services/utility/ServiceLocator");
const AuthService = require("../services/utility/AuthService");

const UserService = require("../services/UserService");
const ClassService = require("../services/ClassService");
const LessonService = require("../services/LessonService");
const ModuleService = require("../services/ModuleService");
const UnitService = require("../services/UnitService");
const QuizService = require("../services/QuizService");
const ScoreService = require("../services/ScoreService");
const QuizDataService = require("../services/QuizDataService");
const ProgressService = require("../services/ProgressService");

const utcStr = new Date().toUTCString();

router
    .use(function timeLog(req, res, next) {
        console.log('Access unit route Time: ', utcStr);
        next();
    })

        /**
    * @swagger
    * /admin/delete/class/{id}:
    *   delete:
    *     tags:
    *       - Admin
    *     summary: delete a class
    *     description: delete a class by id
    *     parameters:
    *       - in: path
    *         name: id
    *         description: class id to be deleted
    *         required: true
    *         type: string
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               user_email:
    *                 type: string
    *               user_password:
    *                 type: string
    *     responses:
    *       200:
    *         description: Successfully deleted user
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
    .delete("/api/admin/delete/class/:id", AuthService.authenticate, async(req, res) => {

        /**
         * @type {ClassService}
         */
        const classService = ServiceLocator.getService(ClassService.name);
        if(req.user_type != "admin"){
            res.status(401).json({message: "Can't work: wrong user type "+ req.user_type});
        }
        req.body.class_id = req.params.id;
        try{
            
            const { payload: message, error } = await classService.deleteClass(req.body);

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
            console.log("an error occured in adminRoutes, delete/user");
            res.status(500).end();
        }

    })

        /**
    * @swagger
    * /admin/delete/user/{id}:
    *   delete:
    *     tags:
    *       - Admin
    *     summary: delete a user
    *     description: delete a user by id
    *     parameters:
    *       - in: path
    *         name: id
    *         description: user id to be deleted
    *         required: true
    *         type: integer
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               user_email:
    *                 type: string
    *               user_password:
    *                 type: string
    *     responses:
    *       200:
    *         description: Successfully deleted user
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
    .delete("/api/admin/delete/user/:id", AuthService.authenticate, async(req, res) => {

        /**
         * @type {userService}
         */
        const userService = ServiceLocator.getService(UserService.name);
        if(req.user_type != "admin"){
            res.status(401).json({message: "Can't work: wrong user type "+ req.user_type});
        }
        req.body.user_id = req.params.id;
        try{
            
            const { payload: message, error } = await userService.deleteUser(req.body);

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
            console.log("an error occured in adminRoutes, delete/user");
            res.status(500).end();
        }

    });

module.exports = router;