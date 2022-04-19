const { Result, IError } = require("../utility/Result");
const ScoreService = require("../ScoreService");

class MySQLScoreService extends ScoreService {
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
     * @param {import("../ScoreService").ScoreDTO} scoreDTO
     * @returns {Promise<Result<boolean>} 
     */
    async createScore(scoreDTO) {
        const createScoreCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql: "INSERT INTO scores (user_id,quiz_id,class_id,lesson_id,module_id,unit_id,instructor_id,score,date_graded,date_regraded) VALUES(?,?,?,?,?,?,?,?,?,?,?);",
                values:[scoreDTO.user_id,scoreDTO.quiz_id,scoreDTO.class_id,scoreDTO.lesson_id,scoreDTO.module_id,scoreDTO.unit_id,scoreDTO.instructor_id,scoreDTO.score,scoreDTO.date_graded,scoreDTO.date_regraded]
            },
            (err, results) => {
                if(err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
        try{
            const results = await createScoreCMD;
            if(results.affectedRows>0) return new Result(true, null);
            else return new Result(false, null);
        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
        
    }

  
    /**
     * @param {import("../ScoreService").ScoreDTO} scoreDTO
     * @returns {Promise<Result<import("../ScoreService").Score>>} 
     */
    async getScore(scoreDTO){
        /**
         * @type {Promise<import("../ScoreService").Score>}
         */
        const getScoreCMD = new Promise((resolve, reject) => {
            this.connection.query({
			/* maybe change this later*/ 
                sql:"SELECT score FROM scores WHERE score_id=?,quiz_id=?,instructor_id=?;",
                values: [scoreDTO.score_id]
            }, (err, results) => {
                
                if(err){
                    return reject(err);
                }

                if(!results || results.length === 0){
                    var err = new Error("Score does not exist!");
                    err.errno = 1404;
                    err.code = "NOT FOUND";
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
        try{
            const newScore = await getScoreCMD;
            return new Result(newScore, null);

        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
    }

        /**
     * @param {import("../ScoreService").ScoreDTO} scoreDTO
     * @returns {Promise<Result<boolean>>} 
     */
    async updateScore(scoreDTO) {
        const updateScoreCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql: "UPDATE scores SET date_regraded=?, score=? WHERE score_id=?;",
                values:[scoreDTO.date_regraded, scoreDTO.score, scoreDTO.score_id]
            },
            (err, results) => {
                
                if(err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
        try{
            const results = await updateScoreCMD;
            if(results.affectedRows>0) return new Result(true, null);
            else return new Result(false, null);
        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
           
    }

     /**
     * @param {import("../ScoreService").ScoreDTO} scoreDTO
     * @returns {Promise<Result<boolean>>}
     */
    async deleteScore(scoreDTO) {
        const deleteScoreCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql: "DELETE FROM scores WHERE score_id=?,user_id=?,quiz_id=?;",
                values:[scoreDTO.score_id,scoreDTO.user_id,scoreDTO.quiz_id]
            },
            (err, results) => {
                
                if(err) {
                    return reject(err);
                }

                resolve(results);
            });
        });
        try{
            const results = await deleteScoreCMD;
            if(results.affectedRows>0) return new Result(true, null);
            else return new Result(false, null);

        } catch(e) {
			console.log(e.code, e.errno);

			return new IError(`Unhandled error ${e.code} - ${e.errno}`, e.errno);
            
        }
    }

}
module.exports = MySQLScoreService;