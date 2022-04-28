/**
 * @typedef {Object} User
 * @property {number} user_id
 * @property {string} user_name
 * @property {string} user_email
 * @property {string} user_bio
<<<<<<< HEAD
=======

>>>>>>> 4f60e766253573e6010f2cba87f187f92804f1c5
 * @property {Blob} user_pp
 * @property {string} user_password
 * @property {string} user_type
 */

/**
 * @typedef {Object} UserDTO
 * @property {number} user_id
 * @property {string} user_name
 * @property {string} user_email
 * @property {string} user_bio
 * @property {Blob} user_pp
 * @property {string} user_password
 * @property {string} user_type
 */

 const BaseService = require("./utility/BaseService");
 const Result = require("./utility/Result").Result;
 
 class UserService extends BaseService{
     
     /**
      * @param {UserDTO} userDTO
      * @returns {Promise<Result<User>>}
      */
     createUser(userDTO) { }


     /**
      * @param {number} user_id
      * @returns {Promise<Result<boolean>>} 
      */
     deleteUser(user_id) { }


     /**
      * @param {UserDTO} userDTO
      * @returns {Promise<Result<User>>}
      */
     updateUser(userDTO) { }
 

     /**
      * @param {UserDTO} userDTO
      * @returns {Promise<Result<User>>}
      */
     getUser(userDTO){ }

    /**
     * @param {UserDTO} userDTO
     * @returns {Promise<Result<User>>} 
     */
    getUserByEmail(userDTO){ }

        /**
     * @param {UserDTO} userDTO
     * @returns {Promise<Result<User>>} 
     */
    getUserById(userDTO){ }
 

 };
 
 module.exports = UserService