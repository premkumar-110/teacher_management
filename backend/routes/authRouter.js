const express=require('express');
const router=express.Router();
const authcontroller=require('../Controller/authController');
const authProducts=require('../Controller/authProducts');
const cors = require('cors')
// const authDetails=require('../Controller/authDetails');
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the origin of your client application
    credentials: true, // Allow cookies and credentials to be sent
  };
router.route('/login').post(authcontroller.login);
router.route('/signup').post(authcontroller.signup);
router.route('/googleLogin').post(cors(corsOptions),authcontroller.googleLogin);
router.route('/sendEmail').post(authcontroller.sendEmail);
router.route('/resetPassword').post(authcontroller.resetPassword);
router.route('/sendSMS').post(authcontroller.sendSMS);
router.route('/logout').get(authcontroller.logout);
router.route('/addDetails').post(authcontroller.addDetails);
router.route('/getDetails').post(authcontroller.getDetails);
router.route('/addToCart').post(authcontroller.addToCart);
router.route('/removefromCart').post(authcontroller.removefromCart);
router.route('/verifyToken').post(authcontroller.verifyToken);
router.route('/addToPurchased').post(authcontroller.addToPurchased);


router.route('/setProducts').post(authProducts.setProducts)
router.route('/getProducts').get(authProducts.getProducts);
router.route('/getSingleProduct').post(authProducts.getSingleProduct);
router.route('/getProductById').post(authProducts.getProductById); 


// router.route('/getUserDetails').get(authDetails.getUserDetails)
// router.route('/setUserDetails').post(authDetails.setUserDetails)
module.exports=router;