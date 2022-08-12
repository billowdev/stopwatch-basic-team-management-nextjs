import {
	createParamDecorator,
	ExecutionContext,
	ForbiddenException
} from "@nestjs/common";

export const GetSession = createParamDecorator(
	(data: string | undefined, ctx: ExecutionContext) => {
		try {
			const request: Express.Request = ctx.switchToHttp().getRequest();
			if (data) {
				return request.user[data];
			} else {
				return request.user;
			}
		} catch (error) {
			throw new ForbiddenException()
		}
	},
);