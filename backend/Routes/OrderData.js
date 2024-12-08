const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
router.post('/orderdata', async(req,res)=>{
    let data = req.body.order_data
    await data.splice(0,0, {order_date: req.body.order_date})
    let eID = await Order.findOne({'email':req.body.email})
    console.log(eID)
    if(eID === null){
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(()=>{
                res.json({success:true})
            })
        } catch (error) {
            res.status(500).send("Server Err: " + error.message);

        }
    }

    else{
        try{
            await Order.findOneAndUpdate({email:req.body.email},
            {$push: {order_data: data }}).then(()=>{
                res.json({success: true})
            })
        }
        catch(error){
            res.send("Server Err", error.message)
        }
    }
})


router.post('/myOrderdata', async (req, res) => {
    try {
        let myOrder = await Order.findOne({"email": req.body.email});

        if (!myOrder) {
            // Handle the case when the order is not found
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ orderData: myOrder });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;