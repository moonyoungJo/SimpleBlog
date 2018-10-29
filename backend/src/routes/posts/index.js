const router = require('express').Router();

const Post = require('models/post');
const {ObjectId} = require('mongoose').Types;
const Joi = require('joi');

//login 되어있는지 검색
checkLogin = (req, res, next) => {
  if(!req.session.logged){
    res.status(401).send();
  }
  return next();
}

//존재하는 ID인지 검색
checkObjectId = (req, res, next) => {
  const {id} = req.params;

  if(!ObjectId.isValid(id)){
    res.status(400).send();
  }
  return next();
}

//페이지리스트 얻어오기
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page || 1, 10);
  if (page < 1) {
    res.status(400).send();
  }
  
  const { tag } = req.query;
  const query = tag ? {
    tags: tag 
  } : {};

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
router.get('/:id', checkObjectId, async (req, res) => {
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
  //request.body의 구조 확인
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required()
  });
  const result = Joi.validate(req.body, schema);

  if(result.error){
    res.status(400).send(result.error);
  }

  //save
  const {title, body, tags} = req.body;
  const post = new Post({
    title, body, tags
  })
  try{
    await post.save();
  }catch (e) {
    res.status(500).send(e);
  }

  res.status(200).send(post);
});

router.delete('/:id', checkLogin, checkObjectId, async(req, res) => {
  const {id} = req.params;
  try{
    await Post.findByIdAndRemove(id).exec();
  }catch(e) {
    res.status(500).send(e);
  }

  res.status(204).send();
});
router.patch('/:id', checkLogin, checkObjectId, async(req, res) => {
  const {id} = req.params;
  try{
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true
    }).exec();
  }catch(e){
    res.status(500).send(e);
  }

  if(!post){
    res.status(404).send();
  }
  res.send(post);
});

module.exports = router;