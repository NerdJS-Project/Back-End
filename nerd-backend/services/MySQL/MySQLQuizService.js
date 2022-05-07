const { Result, IError } = require("../utility/Result");
const QuizService = require("../QuizService");

class MySQLQuizService extends QuizService {
    /**
     * @param {import("mysql").Pool} connection
     */
    constructor(connection) {
        super();
        /**
         * @private
         * @type {import("mysql").Pool}
         */
        this.connection = connection;
    }


    /**
     * @param {import("../QuizService").quizDTO} quizDTO
     * @returns {Promise<Result<import("../QuizService").Quiz>>} 
     */
    async createQuiz(quizDTO) {
        const createQuizCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql: "INSERT INTO quizzes (quiz_name, unit_id, instructor_id) VALUES(?,?,?);",
                values:[quizDTO.quiz_name, quizDTO.unit_id, quizDTO.instructor_id]
            },
            (err, results) => {
                if(err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
        try{
            const results = await createQuizCMD;
            if(results.affectedRows>0) return this.getLastInsert();
            else return new Result(false, null);
        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
        
    }

    /**
     * @returns {Promise<Result<../QuizService>Quiz} 
     */
     async getLastInsert() {
        const getLastInsertCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql: "SELECT * FROM quizzes WHERE quiz_id = (SELECT MAX(quiz_id) FROM quizzes);"
            },
            (err, results) => {
                if(err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
        try{
            const results = await getLastInsertCMD;
            return new Result(results, null);
        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
        
    }
    

    /**
     * @param {import("../QuizService").quizDTO} quizDTO
     * @returns {Promise<Result<boolean>} 
     */
    async getQuiz(quizDTO){
        /**
         * @type {Promise<import("../QuizService").quiz>}
         */
        const getQuizCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql:"SELECT * FROM quizzes WHERE quiz_id=?;",
                values: [quizDTO.quiz_id]
            }, (err, results) => {
                
                if(err){
                    return reject(err);
                }

                if(!results || results.length === 0){
                    var err = new Error("User does not exist!");
                    err.errno = 1404;
                    err.code = "quiz NOT FOUND";
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
        try{
            const newQuiz = await getQuizCMD;
            return new Result(newQuiz, null);

        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
    }

    /**
     * @param {import("../QuizService").quizDTO} quizDTO
     * @returns {Promise<Result<boolean>} 
     */
         async getQuizByUnitId(quizDTO){
            /**
             * @type {Promise<import("../QuizService").quiz>}
             */
            const getQuizByUnitIdCMD = new Promise((resolve, reject) => {
                this.connection.query({
                    sql:"SELECT * FROM quizzes WHERE unit_id=?;",
                    values: [quizDTO.unit_id]
                }, (err, results) => {
                    
                    if(err){
                        return reject(err);
                    }
                    
                    if(!results || results.length === 0){
                        var err = new Error("User does not exist!");
                        err.errno = 1404;
                        err.code = "quiz NOT FOUND";
                        return reject(err);
                    }
                    resolve(results);
                });
            });
            try{
                const newQuiz = await getQuizByUnitIdCMD;
                return new Result(newQuiz, null);

            } catch(e) {

                return new Result(null, new IError(e.code, e.sqlMessage));
            }
        }
    
   
    /**
     * @param {import("../QuizService").quizDTO} quizDTO
     * @returns {Promise<Result<boolean>} 
     */
    async updateQuiz(quizDTO) {
        const updateQuizCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql: "UPDATE Quizzes SET quiz_name=? WHERE quiz_id=?;",
                values:[quizDTO.quiz_name, quizDTO.quiz_id]
            },
            (err, results) => {
                
                if(err) {
                    
                    return reject(err);
                }
                resolve(results);
            });
        });
        try{
            const results = await updateQuizCMD;
            if(results.affectedRows>0) return new Result(true, null);
            else return new Result(false, null);
        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
           
    }

    /**
     * @param {import("../QuizService").quizDTO} quizDTO
     * @returns {Promise<Result<boolean>} 
     */
    async deleteQuiz(quizDTO) {
        const deleteQuizCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql: "DELETE FROM quizzes WHERE quiz_id=?;",
                values:[quizDTO.quiz_id]
            },
            (err, results) => {
                
                if(err) {
                    return reject(err);
                }

                resolve(results);
            });
        });
        try{
            const results = await deleteQuizCMD;
            if(results.affectedRows>0) return new Result(true, null);
            else return new Result(false, null);

        } catch(e) {
			return new IError(`Unhandled error ${e.code} - ${e.errno}`, e.errno);
            
        }
    }

}
module.exports = MySQLQuizService;