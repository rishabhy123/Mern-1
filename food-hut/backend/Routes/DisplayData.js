const express = require("express");
const router = express.Router();

router.post("/foodData", (req,res)=>{
    try {
        res.send([global.foodThings, global.foodCategory]);
    } catch (error) {
        console.error(error.message)
        res.send("Error")
    }
})
module.exports = router;