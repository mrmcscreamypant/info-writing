import { AppRoute } from '../AppRoutes';
import { ContextConstructor } from './Context';
import TeapotContext from './contexts/Teapot';
import TitleContext from './contexts/Title';

export const ContextMappings: {
    [key in AppRoute]: ContextConstructor | null;
} = {
    "/": TitleContext,
    "/narrative": TeapotContext
};
