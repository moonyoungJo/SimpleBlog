const Post = require('models/post');
const {ObjectId} = require('mongoose').Types;
const Joi = require('joi');

exports.checkLogin = (ctx, next) => {
  if(!ctx.session.logged){
    ctx.status = 401;
    return null;
  }
  return next();
}

//존재하는 ID인지 검색
exports.checkObjectId = (ctx, next) => {
  const {id} = ctx.params;

  if(!ObjectId.isValid(id)){
    ctx.status = 400;
    return null;
  }
  return next();
}

//db에 write하기
exports.write = async (ctx) => {
  //request.body의 구조 확인
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required()
  });
  const result = Joi.validate(ctx.request.body, schema);
  if(result.error){
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  //save
  const {title, body, tags} = ctx.request.body;
  const post = new Post({
    title, body, tags
  })
  try{
    await post.save();
    ctx.body = post;
  }catch (e) {
    ctx.throw(e, 500);
  }
}
//목록 가져오기
exports.list = async (ctx) => {
  const page = parseInt(ctx.query.page || 1, 10);
  if (page < 1) {
    ctx.status = 400;
    return;
  }
  
  const { tag } = ctx.query;
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
    ctx.body = posts.map(limitBodyLength);

    ctx.set('Last-Page', Math.ceil(postCount / postN));
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.read = async (ctx) => {
  const {id} = ctx.params;
  try{
    const post = await Post.findById(id).exec();

    if(!post){
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  }catch(e) {
    ctx.throw(e, 500);
  }
}
exports.remove = async(ctx) => {
  const {id} = ctx.params;
  try{
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  }catch(e) {
    ctx.throw(e, 500);
  }
}
exports.update = async(ctx) => {
  const {id} = ctx.params;
  try{
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true
    }).exec();

    if(!post){
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  }catch(e){
    ctx.throw(e, 500);
  }
}