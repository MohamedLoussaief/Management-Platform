import Depart from "../models/depart.js";
// Add Update Depart
const addDepart = async (req, res) => {
    const { departName } = req.body;
    try {
        const depart = await Depart.addDepart(departName);
        res.status(200).json({ depart });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// get Depart
const getDepart = async (req, res) => {
    try {
        const departs = await Depart.find();
        res.status(200).json(departs);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export { addDepart, getDepart };
//# sourceMappingURL=depart.js.map