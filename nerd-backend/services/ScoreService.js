/**
 * @typedef {Object} Score
 * @property {number} user_id
 * @property {number} quiz_id
 * @property {number} class_id
 * @property {number} lesson_id
 * @property {number} module_id
 * @property {number} unit_id
 * @property {number} instructor_id
 * @property {number} score_id
 * @property {number} score
 * @property {Date} date_graded
 * @property {Date} date_regraded
 */

/**
 * @typedef {Object} ScoreDTO
 * @property {number} user_id
 * @property {number} quiz_id
 * @property {number} class_id
 * @property {number} lesson_id
 * @property {number} module_id
 * @property {number} unit_id
 * @property {number} instructor_id
 * @property {number} score_id
 * @property {number} score
 * @property {Date} date_graded
 * @property {Date} date_regraded
 */

 const BaseService = require("./utility/BaseService");
 const Result = require("./utility/Result").Result;
 
 class ScoreService extends BaseService{
     
     /**
      * @param {ScoreDTO} scoreDTO
      * @returns {Promise<Result<quiz>>}
      */
     createScore(scoreDTO) { }


     /**
      * @param {number} score_id
      * @returns {Promise<Result<boolean>>} 
      */
     deleteScore(score_id) { }


     /**
      * @param {ScoreDTO} scoreDTO
      * @returns {Promise<Result<score>>}
      */
     updateScore(scoreDTO) { }
 

     /**
      * @param {ScoreDTO} scoreDTO
      * @returns {Promise<Result<score>>}
      */
     getScore(scoreDTO){ }
 

 };
 
 module.exports = ScoreService