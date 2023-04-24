const User = require('../model/userSchema');
const express = require('express');
const { request } = require('express');
const nodemailer = require('nodemailer');
require('../connection/conn');

//signin
signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email: email }).then((result) => {
      console.log(result, 11);
      if (result.password == req.body.password) {
        res.send({
          email: result.email,
          name: result.name,
          message: 'Login successfull',
          token: 'HIVEFIVE',
          code: 200,
        });
      } else {
        res.send({ message: 'Invalid credential', code: 422 });
      }
    });
  } catch (err) {
    res.send({ message: 'Fill credential', code: 500 });
  }
};

//signup
signup = async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  // console.log(req.body);
  if (!name || !email || !password || !cpassword) {
    return res.send({ message: 'Please fill the field properly', code: 422 });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.send({ message: 'Email already exist', code: 422 });
    } else if (password !== cpassword) {
      res.send({ message: 'password not matching', code: 422 });
    } else {
      const user = new User({ name, email, password, cpassword });

      await user.save();

      res.send({ message: 'user register Successfully', code: 200 });
      console.log(req.body);
    }
  } catch (err) {
    // console.log(err);
    res.send({ message: 'something fishy', code: 400 });
  }
};

//Send otp

// sendotp
sendotp = async (req, res) => {
  console.log(req.body);

  const _otp = Math.floor(100000 + Math.random() * 900000);

  console.log(_otp);

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.send({ code: 500, message: 'User not found' });
  }

  // let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '20cse005ayushkumar@gmail.com',
      pass: 'iurnwlcknmphqauo',
    },
  });

  let info = await transporter.sendMail({
    from: '20cse005ayushkumar@gmail.com',
    to: req.body.email,
    subject: 'OTP Verification',
    text: `Your OTP is ${_otp}`,
    // html: `<html>
    //     <body>
    //       Hello and Welcome
    //     </body>
    //   </html>`,
  });
  if (info) {
    console.log(info, 84);
    User.updateOne({ email: req.body.email }, { otp: _otp })
      .then((result) => {
        res.send({ message: 'OTP send', code: 200 });
      })
      .catch((err) => {
        console.log(err);
        // res.send({ message: 'Server Error', code: 500 });
      });

    // res.send({message:'OTP send',code:200})
  } else {
    res.send({ message: 'Server Error', code: 500 });
  }
};



//submitotp
submitotp = (req, res) => {
  // const otp = '2131';

  User.findOne({ otp: req.body.otp })
    .then((result) => {
      User.updateMany(
        { email: result.email },
        {
          $set: {
            password: req.body.password,
            cpassword: req.body.cpassword,
          },
        }
        // { password: req.body.password },
        // { cpassword: req.body.cpassword }
      )
        .then((result) => {
          res.send({ code: 200, message: 'Password Updated' });
        })
        .catch((err) => {
          console.log(err);
          // res.send({ message: 'user not found', code: 500 });
        });
    })
    .catch((err) => {
      res.send({ message: 'OTP is wrong', code: 500 });
    });
};
module.exports = { signin, signup, sendotp, submitotp };
