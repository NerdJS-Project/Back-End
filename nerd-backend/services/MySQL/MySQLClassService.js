const { Result, IError } = require("../utility/Result");
const ClassService = require("../ClassService");

class MySQLClassService extends ClassService {
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
     * @param {import("../ClassService").ClassDTO} classDTO
     * @returns {Promise<Result<boolean>} 
     */
    async createClass(classDTO) {
        console.log(classDTO);
        const createClassCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql: "INSERT INTO classes (class_id, class_name, class_descrip, user_class, instructor_id) VALUES(?,?,?,?,?);",
                values:[classDTO.class_id, classDTO.class_name, classDTO.class_descrip, classDTO.user_id, classDTO.instructor_id]
            },
            (err, results) => {
                if(err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
        try{
            const results = await createClassCMD;
            if(results.affectedRows>0) return new Result(true, null);
            else return new Result(false, null);
        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
        
    }

    /**
     * @param {import("../ClassService").ClassDTO} classDTO
     * @returns {Promise<Result<boolean>} 
     */
    async signUp(classDTO) {       
        const createClassCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql: "insert into classes (class_id, class_name, class_descrip, user_class, instructor_id) values(?,?,?,?,?);",
                values:[classDTO.class_id, classDTO.class_name, classDTO.class_descrip, classDTO.user_id, classDTO.instructor_id]
            },
            (err, results) => {
                if(err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
        try{
            const results = await createClassCMD;
            if(results.affectedRows>0) return new Result(true, null);
            else return new Result(false, null);
        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
        
    }
     /**
     * @param {import("../ClassService").ClassDTO} classDTO
     */
    async getInstructorId(classDTO){
        /**
         * @type {Promise<import("../ClassService").Class>}
         */
        const getInstructorIdCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql:"SELECT instructor_id FROM classes WHERE class_id=?;",
                values: [classDTO.class_id]
            }, (err, results) => {
                
                if(err){
                    return reject(err);
                }

                if(!results || results.length === 0){
                    var err = new Error("Class does not exist!");
                    err.errno = 1404;
                    err.code = "NOT FOUND Instructor Id";
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
        try{
            const id = await getInstructorIdCMD;
            return new Result(id, null);

        } catch(e) {
            console.log(e);
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
    }

    /**
     * @param {import("../ModuleService").ModuleDTO} moduleDTO
     * @returns {Promise<Result<String>>} 
     */
     async getClassId(moduleDTO){
        /**
         * @type {Promise<import("../ClassService").Class>}
         */
        const getClassIdCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql:"SELECT class_id FROM classes WHERE class_id=?;",
                values: [moduleDTO.class_id]
            }, (err, results) => {
                
                if(err){
                    console.log(err);
                    return reject(err);
                }

                if(!results || results.length === 0){
                    var err = new Error("Class does not exist!");
                    err.errno = 1404;
                    err.code = "NOT FOUND";
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
        try{
            const id = await getClassIdCMD;
            return new Result(id.class_id, null);

        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
    }

    /**
     * @param {import("../ClassService").ClassDTO} classDTO
     * @returns {Promise<Result<import("../ClassService").Class>>} 
     */
    async getClassById(classDTO){
        /**
         * @type {Promise<import("../ClassService").Class>}
         */
        const getClassCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql:"SELECT * FROM classes WHERE class_id=?;",
                values: [classDTO.class_id]
            }, (err, results) => {
                
                if(err){
                    return reject(err);
                }

                if(!results || results.length === 0){
                    var err = new Error("Class does not exist!");
                    err.errno = 1404;
                    err.code = "CLASS NOT FOUND";
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
        try{
            const newClass = await getClassCMD;
            return new Result(newClass, null);

        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
    }

    /**
     * @param {import("../ClassService").ClassDTO} classDTO
     * @returns {Promise<Result<import("../ClassService").Class>>} 
     */
    async getClassByName(classDTO){
        /**
         * @type {Promise<import("../ClassService").Class>}
         */
        const getClassCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql:"SELECT class_name, class_id, class_descrip, user_id, user_name as instructor_name from classes, user_table where classes.user_class = user_table.user_id and user_type='instructor' and class_name=?;",
                values: [classDTO.class_name]
            }, (err, results) => {
                
                if(err){
                    return reject(err);
                }

                if(!results || results.length === 0){
                    var err = new Error("Class does not exist!");
                    err.errno = 1404;
                    err.code = "NOT FOUND";
                    return reject(err);
                }
                resolve(results);
            });
        });
        try{
            const newClass = await getClassCMD;
            return new Result(newClass, null);

        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
    }

        /**
     * @param {import("../ClassService").ClassDTO} classDTO
     */
         async getAllModulesAndLessonsByClassId(classDTO){
            /**
             * @type {Promise<import("../ClassService").Class>}
             */
            const getAllModulesAndLessonsByClassIdCMD = new Promise((resolve, reject) => {
                this.connection.query({
                    sql:"SELECT c.class_id, c.user_class, c.class_name, c.class_descrip, m.instructor_id, m.module_id, m.module_name, m.module_descrip, l.lesson_id, l.lesson_name, l.lesson_descrip, l.lesson_index from classes c, modules m, lessons l where c.class_id=? and c.class_id=m.class_id and m.module_id=l.module_id;",
                    values: [classDTO.class_id]
                }, (err, results) => {
                    
                    if(err){
                        return reject(err);
                    }
    
                    if(!results || results.length === 0){
                        var err = new Error("Class does not exist!");
                        err.errno = 1404;
                        err.code = "NOT FOUND";
                        return reject(err);
                    }
                    resolve(results);
                });
            });
            try{
                const modsAndClasses = await getAllModulesAndLessonsByClassIdCMD;
                return new Result(modsAndClasses, null);
    
            } catch(e) {
                return new Result(null, new IError(e.code, e.sqlMessage));
            }
        }
    
    /**
     * @param {import("../ClassService").ClassDTO} classDTO
     * @returns {Promise<Result<boolean>>}
     */
    async getClassByUserIdAndClassId(classDTO){
        /**
         * @type {Promise<import("../ClassService").Class>}
         */
        const getClassByUserIdAndClassIdCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql:"SELECT * from classes where user_class=? and class_id=?;",
                values: [classDTO.user_id, classDTO.class_id]
            }, (err, results) => {
                
                if(err){
                    return reject(err);
                }

                if(!results || results.length === 0){
                    var err = new Error("Class does not exist!");
                    err.errno = 1404;
                    err.code = "NOT FOUND";
                    return reject(err);
                }
                resolve(results);
            });
        });
        try{
            const classes = await getClassByUserIdAndClassIdCMD;
            if(classes.length > 0){
                return new Result(true, null);
            } else {
                return new Result(false, null);
            }

        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
    }



    /**
     * @param {import("../ClassService").ClassDTO} classDTO
     * @returns {Promise<Result<import("../ClassService").Class>>} 
     */
    async getAllClassesByUser(classDTO){
        /**
         * @type {Promise<import("../ClassService").Class>}
         */
        const getAllClassesByUserCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql:"SELECT * from classes where user_class=?",
                values: [classDTO.user_id]
            }, (err, results) => {
                
                if(err){
                    return reject(err);
                }

                if(!results || results.length === 0){
                    var err = new Error("Class does not exist!");
                    err.errno = 1404;
                    err.code = "NOT FOUND";
                    return reject(err);
                }
                resolve(results);
            });
        });
        try{
            const newClasses = await getAllClassesByUserCMD;
            return new Result(newClasses, null);

        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
    }

    /**
     * @param {import("../ClassService").ClassDTO} classDTO
     * @returns {Promise<Result<import("../ClassService").Class>>} 
     */
    async getRoster(classDTO){
        /**
         * @type {Promise<import("../ClassService").Class>}
         */
        const getAllClassesByUserCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql:"SELECT * from classes, user_table where class_id=? and user_class=user_id;",
                values: [classDTO.class_id]
            }, (err, results) => {
                
                if(err){
                    return reject(err);
                }

                if(!results || results.length === 0){
                    var err = new Error("Class does not exist!");
                    err.errno = 1404;
                    err.code = "NOT FOUND";
                    return reject(err);
                }
                resolve(results);
            });
        });
        try{
            const newClasses = await getAllClassesByUserCMD;
            return new Result(newClasses, null);

        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
    }

    /**
     * @param {import("../ClassService").ClassDTO} classDTO
     * @returns {Promise<Result<import("../ClassService").Class>>} 
     */
    async getClassByUserId(classDTO){
        /**
         * @type {Promise<import("../ClassService").Class>}
         */
        const getClassCMD = new Promise((resolve, reject) => {
            this.connection.query({
			/* maybe change this later*/ 
                sql:"SELECT * FROM classes WHERE class_id=? and user_class=?;",
                values: [classDTO.class_id, classDTO.user_class]
            }, (err, results) => {
                
                if(err){
                    return reject(err);
                }

                if(!results || results.length === 0){
                    var err = new Error("Class does not exist!");
                    err.errno = 1404;
                    err.code = "NOT FOUND";
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
        try{
            const newClass = await getClassCMD;
            return new Result(newClass, null);

        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
    }

        /**
     * @param {import("../ClassService").ClassDTO} classDTO
     * @returns {Promise<Result<boolean>>} 
     */
    async updateClass(classDTO) {
        const updateClassCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql: "update classes set class_name=?, class_descrip=? where class_id=? and user_class=? and (select user_type from user_table where user_id=user_class and user_id=?)='instructor';",
                values:[classDTO.class_name, classDTO.class_descrip, classDTO.class_id, classDTO.user_id, classDTO.user_id]
            },
            (err, results) => {
                
                if(err) {
                    
                    return reject(err);
                }
                resolve(results);
            });
        });
        try{
            const results = await updateClassCMD;
            if(results.affectedRows>0) return new Result(true, null);
            else return new Result(false, null);
        } catch(e) {
            return new Result(null, new IError(e.code, e.sqlMessage));
        }
           
    }
//sql: "DELETE c, m FROM classes c, modules m JOIN c m ON c.class_id=m.class_id WHERE class_id=?;",
     /**
     * @param {import("../ClassService").ClassDTO} classDTO
     * @returns {Promise<Result<boolean>>}
     */
    async deleteClass(classDTO) {
        const deleteClassCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql: "DELETE c, m FROM classes c JOIN modules m ON c.class_id=m.class_id WHERE c.class_id=?;",
                values:[classDTO.class_id]
            },
            (err, results) => {
                
                if(err) {
                    return reject(err);
                }

                resolve(results);
            });
        });
        try{
            const results = await deleteClassCMD;
            if(results.affectedRows>0) return new Result(true, null);
            else return new Result(false, null);

        } catch(e) {
			console.log("delete class",e.code, e.errno);

			return new IError(`Unhandled error ${e.code} - ${e.errno}`, e.errno);
            
        }
    }

    /**
     * @param {import("../ClassService").ClassDTO} classDTO
     * @returns {Promise<Result<boolean>>}
     */
    async dropClass(classDTO) {
        const dropClassCMD = new Promise((resolve, reject) => {
            this.connection.query({
                sql: "DELETE FROM classes WHERE user_class=? and class_id=?;",
                values:[classDTO.user_id, classDTO.class_id]
            },
            (err, results) => {
                
                if(err) {
                    return reject(err);
                }

                resolve(results);
            });
        });
        try{
            const results = await dropClassCMD;
            if(results.affectedRows>0) return new Result(true, null);
            else return new Result(false, null);

        } catch(e) {
			console.log(e.code, e.errno);

			return new IError(`Unhandled error ${e.code} - ${e.errno}`, e.errno);
            
        }
    }

}
module.exports = MySQLClassService;