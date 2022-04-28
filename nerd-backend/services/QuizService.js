/**
 * @typedef {Object} Quiz
 * @property {number} quiz_id
 * @property {string} quiz_name
 * @property {number} unit_id
 * @property {number} instructor_id
 */

/**
 * @typedef {Object} QuizDTO
 * @property {number} quiz_id
 * @property {string} quiz_name
 * @property {number} unit_id
 * @property {number} instructor_id
 */

 const BaseService = require("./utility/BaseService");
 const Result = require("./utility/Result").Result;
 
 class QuizService extends BaseService{
     
     /**
      * @param {QuizDTO} quizDTO
      * @returns {Promise<Result<quiz>>}
      */
     createQuiz(quizDTO) { }


     /**
      * @param {number} quiz_id
      * @returns {Promise<Result<boolean>>} 
      */
     deleteQuiz(quiz_id) { }


     /**
      * @param {QuizDTO} quizDTO
      * @returns {Promise<Result<quiz>>}
      */
     updateQuiz(quizDTO) { }
 

     /**
      * @param {QuizDTO} quizDTO
      * @returns {Promise<Result<quiz>>}
      */
     getQuiz(quizDTO){ }
 
    /**
     * @param {QuizDTO} quizDTO
     * @returns {Promise<Result<Quiz>>} 
     */
    async getQuizByUnitId(quizDTO){ }

 };
 
 module.exports = QuizService