import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/models/user.entity";

export const GetUser = createParamDecorator((data, req) => {
    return req.user;
});