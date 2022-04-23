const { Result, IError } = require("../utility/Result");
const QuizDataService = require("../QuizDataService");

class MySQLQuizDataService extends QuizDataService {
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
     * @param {import("../QuizDataService").quizdataDTO} quizdataDTO
     * @returns {Promise<Result<import("../QuizDataService").QuizData>>} 
     */
    async createQuizData(quizdataDTO) {
        const createQuizDataCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql: "INSERT INTO quizdata (quiz_id, quizdata_question, quizdata_answers) VALUES(?,?,?);",
                values:[quizdataDTO.quiz_id, quizdataDTO.quizdata_question, quizdataDTO.quizdata_answers]
            },
            (err, results) => {
                if(err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
        try{
            const results = await createQuizDataCMD;
            if(results.affectedRows>0) return this.getLastInsert();
            else return new Result(false, null);
        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
        
    }

    /**
     * @returns {Promise<Result<../QuizDataService>QuizData} 
     */
     async getLastInsert() {
        const getLastInsertCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql: "SELECT * FROM quizdata WHERE quiz_id = (SELECT MAX(quiz_id) FROM quizdata);"
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
     * @param {import("../QuizDataService").quizdataDTO} quizdataDTO
     * @returns {Promise<Result<boolean>} 
     */
    async getQuizData(quizdataDTO){
        /**
         * @type {Promise<import("../QuizDataService").quizdata>}
         */
        const getQuizDataCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql:"SELECT * FROM quizdata WHERE quiz_id=?;",
                values: [quizdataDTO.quiz_id]
            }, (err, results) => {
                
                if(err){
                    return reject(err);
                }

                if(!results || results.length === 0){
                    var err = new Error("User does not exist!");
                    err.errno = 1404;
                    err.code = "NOT FOUND";
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
        try{
            const newQuizData = await getQuizDataCMD;
            return new Result(newquizdata, null);

        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
    }
  
    /**
     * @param {import("../QuizDataService").quizdataDTO} quizdataDTO
     * @returns {Promise<Result<boolean>} 
     *//*
    async updateQuizDataQuestion(quizdataDTO) {
        const updateQuizDataCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql: "UPDATE quizdata SET quizdata_question=? WHERE quiz_id=?;",
                values:[quizdataDTO.quizdata_question, quizdataDTO.quiz_id]
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
     * @param {import("../QuizDataService").quizdataDTO} quizdataDTO
     * @returns {Promise<Result<boolean>} 
     *//*
    async updateQuizDataAnswers(quizdataDTO) {
        const updateQuizDataAnswersCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql: "UPDATE quizdata SET quizdata_answers=? WHERE quiz_id=?;",
                values:[quizdataDTO.quizdata_answers, quizdataDTO.quiz_id]
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
     * @param {import("../QuizDataService").quizdataDTO} quizdataDTO
     * @returns {Promise<Result<boolean>} 
     */
    async deleteQuizData(quizdataDTO) {
        const deleteQuizDataCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql: "DELETE FROM quizdata WHERE quiz_id=?;",
                values:[quizdataDTO.quiz_id]
            },
            (err, results) => {
                
                if(err) {
                    return reject(err);
                }

                resolve(results);
            });
        });
        try{
            const results = await deleteQuizDataCMD;
            if(results.affectedRows>0) return new Result(true, null);
            else return new Result(false, null);

        } catch(e) {
			console.log(e.code, e.errno);

			return new IError(`Unhandled error ${e.code} - ${e.errno}`, e.errno);
            
        }
    }

}
module.exports = MySQLQuizDataService;