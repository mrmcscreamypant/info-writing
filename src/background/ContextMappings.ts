import { AppRoute } from '../AppRoutes';
import { ContextConstructor } from './Context';
import PhysContext from './contexts/Phys';
import TeapotContext from './contexts/Teapot';
import HelixContext from './contexts/Helix';
import FaceContext from './contexts/Face';

export const ContextMappings: {
    [key in AppRoute]: ContextConstructor | null;
} = {
    "/": PhysContext,
    "/narrative": TeapotContext,
    "/pro-con": HelixContext,
    "/about-me": FaceContext
};
