import { extname } from "path";
import { existsSync, mkdirSync } from "fs";
import multer, { diskStorage } from "multer";
import { v4 as uuid } from "uuid";
import { BadRequestException } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export const multerOptions : MulterOptions = {
  limits: {
    fileSize: 5 * 1024 * 1024 //5MB
  },

  fileFilter: (req: any, file: any, cb: any) => {
    const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!whitelist.includes(file.mimetype)) {
      return cb(new BadRequestException("file format is incorrect"), false);
    }
    cb(null, true);
  },

  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = process.env.UPLOAD_LOCATION;
      if (!existsSync(uploadPath)) mkdirSync(uploadPath);
      cb(null, uploadPath);
    },

    filename: (req: any, file: any, cb: any) => {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    }
  })
};
