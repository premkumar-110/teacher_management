const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const user = require('../Models/authModel');
const products=require('../Models/productsModel');
const fs = require('fs');
const twilio=require('twilio');
const nodemailer = require('nodemailer');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

exports.signup = async (req, res) => {
  try {
    const existingUser = await user.findOne({ email: req.body.email });
    if (existingUser) {
      res.send({
        status:"exists",
        message: "User Already Exists",
      });
    } else {
      const hashedPassword = await bcryptjs.hash(req.body.password, 12);
      req.body.password = hashedPassword;
      const newUser = await user.create(req.body);
      res.send({
        status: 200,
        user: newUser,
      });
    }
  } catch (err) {
    res.send(err);
  }
};