import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../user/entities/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // get role from controller 
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    // if is not have any roles decorator return true (continue)
    if (!requiredRoles) {
      return true
    }

    // get the request from context
    const request = context.switchToHttp().getRequest();

    // get user session from the request
    const { user } = request

   // return boolean after check the role of user from the request is matching with role fom Roles decorator
    return requiredRoles.some((role) => user.role?.includes(role))
  }

}
