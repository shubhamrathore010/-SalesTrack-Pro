import Lead from "../models/Lead.js"

export const leadByStatus = async (req, res) => {
    try {
        const data = await Lead.aggregate([
            { $match : { isActive: true } },
            {
                $group : {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(data)
    } catch (err) {
        res.status(500).json({ message: "Faild to lead status stats" })
    }
}


export const leadBySource = async (req, res) => {
    try {
        const data = await Lead.aggregate([
            { $match : { isAcitve: true } },
            {
                $group: {
                    _id: "$source",
                    count: { $sum: 1 }
                }
            }
        ])


        res.json(data);
    } catch (err) {
        res.status(500).json({ message : "Failed to load source stats " })
    }
}


export const leadsPerSalesRep = async (req ,res )=> {
    try {
        const data  = await Lead.aggregate([
            { $match : { isActive : true, assignedTo: { $ne: null } } },
            {
                $group : {
                    _id: "$assignedTo",
                    totalLeads: { $sum: 1 }
                }
            },
            {
                 $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "salesRep"
                 }
            },
            {  $unwind: "$salesRep"   },
            {
                $project: {
                    _id: 0,
                    salesRep: "$salesRep.name",
                    totalLeads: 1
                }
            }
        ]);

        res.json(data)
    } catch (err) {
        req.status(500).json({ message: "Faild to load sales performance" });
    }
}


// Monthly Deals Revenue 


import Deal from "../models/Deal.js"

export const monthlyRevenue = async (req , res )=> {
    try {
        const data = await Deal.aggregate([
            { $match: { status: "won" } },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    revenue: { $sum: "$amount" } 
                }
            }, 
            { $sort: { "_id.year": 1, "_id.month" : 1 } }
        ]);


        res.json(data);
    } catch (err) {
        res.status(500).json({ message: "Failed to load revenue stats" } )
    }
}

// Conversiom Rate 

export const conversionRate = async ( req , res) =>{
    try {
      const data = await Lead.aggregate([
        {
        $group: {
            _id: null,
            qualified: {
                $sum: {
                    $cond: [{ $eq: ["$status", "qualified"]  }, 1, 0]
                }
            },
            won: {
                $sum: {
                    $cond: [{ $eq: ["$status", "won" ] }, 1, 0]
                }
              }
            }
        },
        {
         $project: {
            conversionRate: {
                $cond: [
                    { $eq: ["$quialified", 0] },
                    0,
                    { $multiply: [{ $divide: ["$won", "$qualified"] }, 100] }
                ]
              }
           }
        }
    ])
    
    res.json(data[0]);
} catch(err) {
    res.status(500).json({ message: "Failed to calculate conversion rate" });
   }
}


// Overdue follow-ups 


import Task from "../models/Task.js"

export const overdueTasks = async (req ,res )=> {
    try{
        const data = await Task.find({
            status : "pending",
            dueDate: { $lt: new Date() }
        })
        .populate("lead", "name status")
        .populate("assignedTo", "name");

    res.json(data);

    } catch (err) {
        res.status(500).json({ message: "Fialed to  fetch overdue tasks" }) 
      }
}