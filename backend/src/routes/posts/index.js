const router = require('express').Router();

const Post = require('models/post');
const User = require('models/user');
const {ObjectId} = require('mongoose').Types;
const Joi = require('joi');

//login 되어있는지 검색
checkLogin = (req, res, next) => {
  if(!req.session.userid){
    res.status(401).send();
    return;
  }
  return next();
}

//존재하는 리스트ID인지 검색
checkListId = (req, res, next) => {
  const {id} = req.params;

  if(!ObjectId.isValid(id)){
    res.status(400).send();
    return;
  }
  return next();
}

//존재하는 유저 ID인지 검색
checkUserId = async (req, res, next) => {
  const {userid} = req.params;
  const user = await User.findOne({userid:userid}).exec();
  if(!user){
    res.status(400).send();
    return;
  }
  return next();
}

//페이지리스트 얻어오기
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page || 1, 10);
  if (page < 1) {
    res.status(400).send();
  }
  
  const { userid, tag } = req.query;
  let query = tag ? {
    tags: tag 
  } : {};
  query = userid ? {
    ...query,
    userid: userid
  } : query;

  const postN = 3;
  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(postN)
      .skip((page - 1) * postN)
      .lean()
      .exec();
    const postCount = await Post.countDocuments(query).exec();
    const limitBodyLength = post => ({
      ...post,
      body: post.body.length < 350 ? post.body : `${post.body.slice(0, 350)}...`
    });

    res.setHeader('Last-Page', Math.ceil(postCount / postN));
    res.send(posts.map(limitBodyLength));
  } catch (e) {
    res.status(500).send(e);
  }
});

//게시글 가져오기
router.get('/:id', checkListId, async (req, res) => {
  const {id} = req.params;
  try{
    const post = await Post.findById(id).exec();
    if(!post){
      res.status(404).send();
    }
    res.send(post);
  }catch(e) {
    res.status(500).send(e);
  }
});

router.post('/', checkLogin, async (req, res) => {
  console.log('hihihi')
  //request.body의 구조 확인
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    username: Joi.string().required(),
    userid: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required()
  });
  const result = Joi.validate(req.body, schema);
  console.log(result.error);
  if(result.error || req.body.userid !== req.session.userid){
    res.status(400).send(result.error);
    return;
  }

  //save
  const {title, body, tags, userid, username} = req.body;
  const post = new Post({
    title, body, tags, userid, username
  })
  try{
    await post.save();
  }catch (e) {
    res.status(500).send(e);
    return;
  }


  res.status(200).send(post);
});

router.delete('/:id', checkLogin, checkListId, async(req, res) => {
  const {id} = req.params;
  try{
    await Post.findByIdAndRemove(id).exec();
  }catch(e) {
    res.status(500).send(e);
    return;
  }

  res.status(204).send();
});
router.patch('/:id', checkLogin, checkListId, async(req, res) => {
  const {id} = req.params;
  
  let post;
  try{
    post = await Post.findByIdAndUpdate(id, req.body, {
      new: true
    }).exec();
  }catch(e){
    res.status(500).send(e);
    return;
  }
  
  if(!post){
    res.status(404).send();
    return;
  }
  
  res.send(post);
});

module.exports = router;