const express=require('express');
const router=express.Router();
const authcontroller=require('../Controller/authController');

router.route('/getTeachers').get(authcontroller.getTeachers);
router.route('/addTeacher').post(authcontroller.addTeacher);
router.route('/filter').get(authcontroller.filter);
router.route('/search').post(authcontroller.search);
router.route('/update/:id').put(authcontroller.update);
router.route('/delete/:id').delete(authcontroller.delete);



module.exports=router;