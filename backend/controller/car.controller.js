import Car from "../models/cars.models.js";

const getCar = async (req, res) => {
    try {
        const car = await Car.find();        
        res.status(200).json(car);
    } catch (error) {
        console.error("error : " ,error);
        res.status(500).json(error);
    }   
};

export default getCar;




