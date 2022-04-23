/**
 * @typedef {Object} QuizData
 * @property {number} quiz_id
 * @property {string} quizdata_question
 * @property {string} quizdata_answers
 * @property {number} unit_id
 * @property {number} instructor_id
 */

/**
 * @typedef {Object} QuizDataDTO
 * @property {number} quiz_id
 * @property {string} quizdata_question
 * @property {string} quizdata_answers
 * @property {number} unit_id
 * @property {number} instructor_id
 */

 const BaseService = require("./utility/BaseService");
 const Result = require("./utility/Result").Result;
 
 class QuizDataService extends BaseService{
     
     /**
      * @param {QuizDataDTO} quizdataDTO
      * @returns {Promise<Result<quiz>>}
      */
     createQuizData(quizdataDTO) { }


     /**
      * @param {number} quiz_id
      * @returns {Promise<Result<boolean>>} 
      */
     deleteQuizData(quiz_id) { }


     /**
      * @param {QuizDataDTO} quizdataDTO
      * @returns {Promise<Result<quiz>>}
      */
     updateQuizData(quizdataDTO) { }
 

     /**
      * @param {QuizDataDTO} quizdataDTO
      * @returns {Promise<Result<quiz>>}
      */
     getQuizData(quizdataDTO){ }
 

 };
 
 module.exports = QuizDataService