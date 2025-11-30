import imagekit from "../Config/imageKit.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import fs from "fs";
import Car from "../models/User.js"

// API to change the role of the user
export const changeRoleToOwner = async (req, res)=>{
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"})
        res.json({success: true, message: "Now you can list cars"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to list Car

export const addCar = async (req, res)=>{
    try {
        const {_id} = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })

        // For URL Generation (images & vids)
        var optimizedImageUrl = imagekit.url({
            path : response.filePath,
            transformation : [
                {width: '1280'},
                {quality: 'auto'}, // Auto compression
                {format: 'webp'} // Converting to wide range of formats
            ]
        });

        const image = optimizedImageUrl;
        await Car.create({...car, owner: _id, image})
        
        res.json({success: true, message: "Car Added"})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Writing an API to List Owner Cars
export const getOwnerCars = async (req, res)=>{
    try {
        const {_id} = req.user;
        const cars = await Car.find({owner: _id})
        res.json({success: true, cars})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

//API to Toggle Car Availability
export const toggleCarAvailability  = async (req, res)=>{
    try {
        const {_id} = req.user;
        const {carId} = req.body
        const car = await Car.findById(carId)

        if(car.owner.toString() != _id.toString()){
            return res.json({success: false, message: "Unauthorized"})
        } 

        car.isAvailable = !car.isAvailable;
        await car.save()
        
        res.json({success: true, message: "Availability Toggled"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to delete a car
export const deleteCar = async (req, res)=> {

    try {
        const {_id} = req.user;
        const {carId} = req.body
        const car = await Car.findById(carId)

        if(car.owner.toString() != _id.toString()){
        return res.json({success: false, message: "Unauthorized"})
        }
    
        car.owner = null;
        car.isAvailable = false;

        res.json({success: true, message: "Car Removed"})
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to get Dashboard Data
export const getDashboardData = async(req, res)=>{

    try {
        const { _id, role } = req.user;

        if(role!= 'owner'){
            return res.json({success: false, message: "Unauthorized"})
        }
        const cars = await Car.find({owner: _id})
        const bookings = await Booking.find({owner: _id}).populate('car').sort({createdAt:-1});

        const pendingBookings = await Booking.find({owner: _id, status:"pending"})
        const completedBookings = await Booking.find({owner: _id, status:"confimred"})

        //Calculating the monthly revenue from confirmed bookings
        const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking)=> acc + booking.price, 0)

        const getDashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length, 
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: booking.slice(0,3),monthlyRevenue
        }

        res.json({success: true, dashboardData})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to update image
export const updateUserImage = async (req, res)=>{
    try {
        const { _id } = req.user;
        const imageFile = req.file;

        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })

        // For URL Generation (images & vids)
        var optimizedImageUrl = imagekit.url({
            path : response.filePath,
            transformation : [
                {width: '400'},
                {quality: 'auto'}, // Auto compression
                {format: 'webp'} // Converting to wide range of formats
            ]
        });

        const image = optimizedImageUrl;

        await User.findByIdAndUpdate(_id, {image});
        response.json({sucess: true, message: "Image Updated"})
        
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}