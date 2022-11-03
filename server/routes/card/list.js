const db = require("../../prisma")

const listHandler = async(req, res) =>{
    const { id, admin } = req.tokenObj

    if(!admin){
        return res.status(400).json({
            message: "Not previleged to perform this task"
        })
    }

    var { skip = 0, take = 10 } = req.query;
    skip = Number(skip);
    take = Number(take)


    try{
        const data = await db.card.findMany({
            where: {},
            select:{
                id: true,
                balance: true,
            },
            skip,
            take,
        })

        const formattedData = data.reduce(
            (accum, value) => ({
                ...accum,
                [value.id]:{
                    balance: value.balance
                },
            }),
            {}
        )
        return res.status(200).json(formattedData)
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message: "Something went wrong."
        })
    }
}


module.exports = listHandler