const express = require("express");
const Place = require("../models/place");
const Service = require("../models/service");
const TimeFrame = require("../models/timeFrame");
const Reservation = require('../models/reservation')
const { verifyJWT } = require("../middleware/verifyJWT");
const { db } = require("../models/place");
const { isObjectIdOrHexString } = require("mongoose");
const router = express.Router();
const ObjectId = require('mongodb').ObjectID

const checkTermCollides = async (dayOfWeek,placeId,serviceId,serviceStart,serviceEnd,serviceDate)=>{

    try {
        //dane usługi
        const service = await Service.findOne({$and:[{_id:serviceId},{placeId}]})    
        try {
            //sprawdz czy rezerwacja miesci sie w godzinach pracy danego dnia
            const timeFrames = await TimeFrame.find({
                $and:[
                    {placeId},
                    {dayIndex:dayOfWeek},                    
                    {$or:[
                        {start:serviceStart},
                        {start:{$lt:serviceStart}}
                    ]},
                    {$or:[
                        {end:serviceEnd},
                        {end:{$gt:serviceEnd}}
                    ]}
                ]
            }).count()
            
            if(timeFrames){
                //pobierz dokonane rezerwacje danego dnia kolidujace z podanym terminem
                const reservations = await Reservation.find({
                    $and:[
                        {serviceDate},
                        {placeId},
                        {$or:[
                            {$and:[
                                {serviceStart:{$gt:serviceStart}},
                                {serviceStart:{$lt:serviceEnd}}
                            ]},
                            {$and:[
                                {serviceStart:{$lt:serviceStart}},
                                {serviceEnd:{$gt:serviceEnd}}
                            ]},
                            {serviceStart:serviceStart},
                            {$and:[
                                {serviceEnd:{$gt:serviceStart}},
                                {serviceEnd:{$lt:serviceEnd}}
                            ]},
                            {serviceEnd:serviceEnd}
                        ]}
                    ]
                }).sort({"serviceEnd": 1})
               
                if(service.quanity>reservations.length){
                    //wolny termin
                    return {result:true}
                }else{
                    // brak wolnego terminu zwraca koniec zajetej rezerwacji z która koliduje
                    const endReservationTheSameId = reservations.filter(reserv=>reserv.serviceId==serviceId)

                    const endReservationTheSameIdLast = endReservationTheSameId.length && endReservationTheSameId.at(0).serviceEnd 

                    if(endReservationTheSameIdLast){
                        return {result:false,endOfReservations:endReservationTheSameIdLast}
                    }else{
                        return {result:false}
                    }
                }                         
            }else{
                return {result:false}
            }
        } catch (error) {
            console.log(error);
            return {result:false}
        }
    } catch (error) {
        console.log(error);
        return {result:false}
    }
}

router.post('/bookit',async (req,res)=>{

    const {dayOfWeek,placeId,serviceId,serviceStart,serviceEnd,serviceDate,clientFirstName,clientLastName,email} = req.body

    const check =await checkTermCollides(dayOfWeek,placeId,serviceId,serviceStart,serviceEnd,serviceDate)

if (check.result) {
     
    const reservation = new Reservation({dayOfWeek,placeId,serviceId,serviceStart,serviceEnd,serviceDate,clientFirstName,clientLastName,email})
    reservation.save((err,data)=>{
        if(err){
            console.log('reservation save failed',err);
            res.json({success:false,result:'reservation save failed'})            
        }else if(data){
            res.json({success:true,result:'reservation saved',data}) 
        }
    })
}else{
    res.json({success:false,result:'not available'}) 
}
})


router.get('/terms',async (req,res)=>{
    const freeTerms = []
    const {activePlace,activeService,date,dayOfWeek} = req.query  

    try {
        const service = await Service.findOne({$and:[{_id:activeService},{placeId:activePlace}]})
    try {
        const timeFrames = await TimeFrame.find({$and:[{placeId:activePlace},{dayIndex:dayOfWeek}]})
        for(timeFrame of timeFrames){
            const serviceDuration=service.duration
            const timeFrameStart = timeFrame.start
            const timeFrameEnd = timeFrame.end
            let serviceFrameStart = timeFrameStart
            let serviceFrameEnd = timeFrameStart + serviceDuration
           
           while(serviceFrameEnd<=timeFrameEnd){

            const check =await checkTermCollides(dayOfWeek,activePlace,activeService,serviceFrameStart,serviceFrameEnd,date)
            
            if(check.result){
                freeTerms.push({start:serviceFrameStart,end:serviceFrameEnd})
                serviceFrameStart = serviceFrameEnd
                serviceFrameEnd = serviceFrameEnd + serviceDuration   
            }else{
                serviceFrameStart = check.endOfReservations ? check.endOfReservations: serviceFrameEnd
                serviceFrameEnd = (check.endOfReservations ? check.endOfReservations: serviceFrameEnd) + serviceDuration   
            }
           }      
        }
    } catch (error) {
        console.log('timeFrames search failed');
        res.json({success:false,result:'timeFrames search failed'})
    }
   } catch (error) {
        console.log('service search failed');
        res.json({success:false,result:'service search failed'})
   }
    res.json({success:true,result:'free terms fetched',freeTerms})
})

router.get('/reservations',verifyJWT,async (req,res)=>{
    const placeId=req.query.activePlace
    try {
        const reservations = await Reservation.aggregate([
            {
                $match: {
                    placeId: ObjectId(req.query.activePlace)
                }
            },
            {
                $lookup:{
                    from:'services',
                    localField:'serviceId',
                    foreignField: "_id",                    
                    as: "serviceInfo",                    
                }
            }
        ])
        res.json({success:true,reservations})
    } catch (error) {
        console.log('reservation: ',error);
        res.json({success:false,result:'reservation search failed'})
    }
})

router.delete("/reservations", verifyJWT, (req, res) => {
    
    console.log(ObjectId(req.body.reservationId));
    const _id = new ObjectId(req.body.reservationId)
  
    Reservation.findOneAndDelete({_id},(err,data)=>{
      if(err){
        console.log('reservation delete failed',err);
        res.json({success:false,result:'delete failed'})
        
    }else{
        if(data){
            res.json({success:true,result:'servise deleted'})
        }else{
            res.json({success:false,result:'delete failed'})
        }
      }
    })
})

module.exports = router
