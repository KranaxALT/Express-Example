const product = require('../model/product')

exports.read = async (req, res) =>{
   try{
        const id =  req.params.id
        const producted = await product.find({_id : id}).exec();
        res.send(producted)
   }catch(err){
        console.log(err)
        res.status(500).send('server')
   }
}

exports.list = async (req,res) =>{
    try{
        const producted = await product.find({}).exec();
        res.send(producted)
    }catch(err){
        //errd
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.create = async (req,res) =>{
    try{
        //code
        console.log(req.body)
        const producted = await product(req.body).save()

        res.send(producted)
    }catch(err){
        //errd
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.update = async (req,res) =>{
    try{
        //code
        const id = req.params.id
        const updated = await product.findOneAndweUpdate({_id: id}, req.body, {new: true})
        res.send(updated)
    }catch(err){
        if(err){
            console.log(err)
            res.status(500).send('Server Error')
        }else{
            res.status(400).send('Bad Request')
        }
    }
}

exports.remove = async (req,res) =>{
    try{
        //code
        const id = req.params.id;
        const producted = await product.findByIdAndDelete(id).exec();
        res.json({deleted: producted,
                 message: 'Product deleted successfully'});
    }catch(err){
        //errd
        console.log(err)
        res.status(500).send('Server Error')
    }
}