import * as bcrypt from 'bcrypt';
import { AES, enc } from 'crypto-ts';

export const encryptPassword = async (password: string): Promise<string> => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

export const comparePassword = async (password: string, passwordEncrypted: string): Promise<boolean> => {
    return bcrypt.compareSync(password, passwordEncrypted);
};

export const decryptPasswordClient = (password: string) => {
    return AES.decrypt(password, ''.trim()).toString(enc.Utf8);
};