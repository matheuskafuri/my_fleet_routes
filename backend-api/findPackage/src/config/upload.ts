import multer from "multer";
import { resolve } from "path";
import crypto from "crypto";
const tmp_folder = resolve(__dirname,"..","..","tmp")
export default {
  tmp_folder,
  storage: multer.diskStorage({
    destination: tmp_folder,
    filename:(request,file,callback)=>{
      const fileHash = crypto.randomBytes(16).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;
      return callback(null,fileName);
    }
  })
}