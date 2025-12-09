import { AppRoute } from '../AppRoutes';
import { ContextConstructor } from './Context';
import TeapotContext from './contexts/Teapot';


export const ContextMappings: {
    [key in AppRoute]: ContextConstructor | null;
} = {
    "/": TeapotContext,
    "/narrative": null
};
