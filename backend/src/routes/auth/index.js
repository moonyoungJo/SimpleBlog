const router = require('express').Router();

const User = require('models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const {userid, password} = req.body;

  //잘못된 입력
  if(!userid && !password){
    res.status(401).send();
    return;
  }
  
  const user = await User.findOne({
    userid:userid,
  }).exec();
  
  //해당 유저 없음
  if(!user){
    res.status(401).send();
    return;
  }

  //비밀번호 비교
  try{
    const result = await bcrypt.compare(password, user.password);
    if(!result){
      res.status(401).send();
      return;
    }
  }catch(err){
    res.status(500).send({message: 'server error'});
    return;
  }

  req.session.userid=userid;
  req.session.username=user.username;
  res.send({userid, username: user.username});
});

//회원추가
router.post('/joinus', async (req, res) => {
  const {userid, password, username, email} = req.body;
  //스키마 구조 확인
  const schema = Joi.object().keys({
    userid: Joi.string().required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
  });
  const result = Joi.validate(req.body, schema);
  if(result.error){
    res.status(400).send({message: '폼을 모두 채워주세요'});
    return;
  }

  //아이디 검사
  let user = await User.findOne({
    userid
  }).exec();
  
  if(user){
    res.status(400).send({message: '이미 존재하는 아이디 입니다.'});
    return;
  }

  //이메일 검사
  user = await User.findOne({
    email:email,
  }).exec();
  if(user){
    res.status(400).send({message: '이미 등록된 이메일 입니다.'});
    return;
  }
  //해시암호화
  let hash;
  try {
    hash = await bcrypt.hash(password, 12);
  }catch(e){
    res.status(500).send({message: 'server error'});
    return;
  }
  user = new User({
    userid, password: hash, username, email
  });

  try{
    await user.save();
  }catch(e){
    res.status(500).send({message: 'db에러'});
    return;
  }

  req.session.userid=userid;
  req.session.username = username;
  res.status(200).send({
    username,
    userid
  });
})

router.get('/check', (req, res) => {
  if(req.session.userid){
    res.send({
      logged: true,
      userid: req.session.userid,
      username: req.session.username,
    });
  }else{
    res.send({
      logged: false,
    });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.status(204).send();
});

module.exports = router;