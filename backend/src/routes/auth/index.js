const router = require('express').Router();

const {ADMIN_PASS: adminPass} = process.env;

router.post('/login', (req, res) => {
  const {password} = req.body;

  if(adminPass === password){
    req.session.logged = true;
    res.send({success: true});
  }else{
    res.writeHead(401);
    res.send({
      session: false
    });
  }
});

router.get('/check', (req, res) => {
  res.send({
    logged: !!req.session.logged
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.writeHead(204).end();
});

module.exports = router;