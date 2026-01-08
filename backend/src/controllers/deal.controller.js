import Deal from "../models/Deal.js"
import Lead  from "../models/Lead.js"

export const createDeal = async (req, res) => {
    try {
        const { leadId, amount, closingDate } = req.body;

        if(!leadId || !amount) {
            return res.status(400).json({ message: "Lead and amount are required" })
        }

        const lead = await Lead.findById(leadId)

        if(!lead || !lead.isActive) {
            return res.status(404).json({ message: "Lead not found" })
        }

            // Prevent duplicate active deals for same lead
        const existingDeal = await Deal.findOne({
            lead: leadId,
            status: "open"
        })

        if(existingDeal) {
            return res
            .status(400)
            .json({ message: "Active deal already exists for this lead" })
        }


        const deal = await Deal.create({
            lead: leadId,
            amount,
            closingDate,
            createdBy: req.user._id 
        })

        res.status(201).json(deal)
    } catch (error) {
        res.status(500).json({ message: "Faild to create deal "})
    }

}


export const getDeals = async (req, res) => {
    try {
        const deals = await Deal.find()
        .populate("lead", "name status")
        .populate("createdBy", "name email")
        .sort({ createdAt: -1})

    res.json(deals)
    } catch (error) {
        res.status(500).json({ message: "Faild to fetch deals" })
    }
}


export const closeDeal = async (req, res) => {
    try {
        const  { status } = req.body;

        if(!["won", "lost"].includes(status)) {
            return res.status(400).json({ message: "Invalid deal status" })
        }

        const deal = await Deal.findById(req.params.id)

        if(!deal) {
            return res.status(404).json({ message: "Deal not found" })
        }

        if (deal.status !== "open") {
            return res
            .status(400)
            .json({ message: "Deal already closed" })
        }

        deal.status = status;
        await deal.save();


        await Lead.findByIdAndUpdate(deal.lead, {
            status: status === "won" ? "won" : "lost"
        })

        res.json(deal)
    } catch (error) {
        res.status(500).json({message: "Faild to close deal" })
    }
}