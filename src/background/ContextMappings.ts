import { AppRoute } from '../AppRoutes';
import { ContextConstructor } from './Context';
import PhysContext from './contexts/Phys';
import TeapotContext from './contexts/Teapot';
import HelixContext from './contexts/Helix';

export const ContextMappings: {
    [key in AppRoute]: ContextConstructor | null;
} = {
    "/": PhysContext,
    "/narrative": TeapotContext,
    "/testing": HelixContext
};
