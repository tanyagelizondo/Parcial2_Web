const express = require ("express")
const router = express.Router()
const db = require("./connections")

router.get('/', (req,res) => {
    var dbo = db.db("mydb");
    dbo.collection("data").findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result.name);
      db.close();
    });

}

)

module.exports = router;