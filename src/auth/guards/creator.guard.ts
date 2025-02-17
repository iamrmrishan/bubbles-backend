import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_CREATOR_KEY } from '../decorators/creator.decorator';

@Injectable()
export class CreatorGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isCreator = this.reflector.getAllAndOverride<boolean>(
      IS_CREATOR_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!isCreator) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user?.isCreator) {
      throw new ForbiddenException(
        'This endpoint is only available to creators',
      );
    }

    return true;
  }
}
