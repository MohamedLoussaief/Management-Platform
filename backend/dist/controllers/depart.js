import Depart from "../models/depart.js";
import User from "../models/user.js";
// Add Depart
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
// Get Depart
const getAllDepart = async (req, res) => {
    try {
        const departs = await Depart.find();
        res.status(200).json(departs);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Delete depart
export const deleteDepart = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteDepart = await Depart.findByIdAndDelete(id);
        const deleteEmp = await User.deleteMany({ id_depart: id });
        if (!deleteDepart) {
            res.status(404).json({ message: "Departement not found" });
            return;
        }
        res.status(200).json({ message: "Departement deleted succefully" });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};
// Update depart
const updateDepart = async (req, res) => {
    const { departName } = req.body;
    const { id } = req.params;
    try {
        const updatedDepart = await Depart.updateDepart(departName, id);
        if (!updatedDepart) {
            res.status(400).json({ message: "Departement not found" });
            return;
        }
        res.status(200).json(updatedDepart);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export { addDepart, getAllDepart, updateDepart };
//# sourceMappingURL=depart.js.map