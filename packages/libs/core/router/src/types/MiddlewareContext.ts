import { Type } from "@funnelnek/ioc";
import { CanActivate } from "@nestjs/common";
import { ComponentType } from "react";
import { CanActivateChild, PipeTransform, CanDeactivate, CanLoad, Guardian, } from "../contracts";
import { InterceptorMiddleware } from "../InterceptorMiddleware";

export type MiddlewareContext = Type<Guardian> | Type<CanDeactivate<ComponentType>> | Type<CanLoad> | Type<CanActivate> | Type<CanActivateChild> | Type<InterceptorMiddleware> | Type<PipeTransform>;