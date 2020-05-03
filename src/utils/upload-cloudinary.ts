import { existsSync, unlinkSync } from 'fs';
import * as cloudinary from 'cloudinary';

export const uploadFileCloud = (path: string): Promise<any> => {
    return cloudinary.v2.uploader.upload(path, function(err, result) {
        if (err) {
            if (existsSync(path)) {
                unlinkSync(path);
            }
        }
        return result.secure_url;
    });
}

export const deleteImgCloud = async (path: string, publicId: string): Promise<any> => {
    if (existsSync(path)) {
        unlinkSync(path);
    }
    if (publicId) {
        await cloudinary.v2.uploader.destroy(publicId);
    }
}
