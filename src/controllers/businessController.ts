import { Request, Response, NextFunction } from 'express';
import AppError, { ErrorConstants } from '../classes/AppError';
import Business ,{IBusiness}from '../models/Business';

export default {
  get: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const businesses = await Business.find();
      res.status(200).json(businesses);
    } catch (error) {
      next(new AppError(ErrorConstants.INTERNAL_SERVER_ERROR)); 
    }
  },

  getByEmail: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email: string | null = req.params.email;
      if (!email) 
        return next(new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS));  
      const business = await Business.findOne({ email });
      if (!business) {
        return next(new AppError(ErrorConstants.INVALID_CREDENTIALS));
      }
      res.status(200).json(business);
    } catch (error) {
      next(new AppError(ErrorConstants.INTERNAL_SERVER_ERROR));  
    }
  },

  post: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
      const { name,description,email,telephone,address }:IBusiness= req.body;
      if (!name||!description||!email||!address) 
        return next(new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS)); 
      const findBusiness= await Business.findOne({email});
      if(findBusiness) 
        return next(new AppError(ErrorConstants.DATA_ALREADY_EXISTS));
      const newBusiness = new Business({ name, description, email, telephone, address });
      const savedBusiness = await newBusiness.save();
      res.status(201).json({ success: true, data: savedBusiness });
    } catch (error) {
        next(new AppError(ErrorConstants.INTERNAL_SERVER_ERROR));
    }
  },

  put: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
      const {email} = req.params;
      if (!email) 
        return next(new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS)); 
      const findBusiness= await Business.findOne({email});
      if(!findBusiness) 
        return next(new AppError(ErrorConstants.INVALID_CREDENTIALS));
      const { name,description,telephone,address }:IBusiness= req.body;
      const savedBusiness = await Business.findOneAndUpdate({email:email}, 
        {$set:{name,description,telephone,address}},
        {new:true}
      );
      res.status(200).json({ success: true, data: savedBusiness });
    } catch (error) {
        next(new AppError(ErrorConstants.INTERNAL_SERVER_ERROR, ));
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
      const {email}= req.params;
      if (!email) 
        return next(new AppError(ErrorConstants.MISSING_REQUIRED_FIELDS)); 
      const findBusiness= await Business.findOne({email});
      if(!findBusiness) 
        return next(new AppError(ErrorConstants.INVALID_CREDENTIALS));
      const deletedBusiness = await Business.findOneAndDelete({email});
      res.status(200).json({ success: true, data: deletedBusiness });
    } catch (error) {
        next(new AppError(ErrorConstants.INTERNAL_SERVER_ERROR, ));
    }
  }
};
