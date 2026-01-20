import { AppRoute } from '../AppRoutes';
import { ContextConstructor } from './Context';
import PhysContext from './contexts/Phys';
import TeapotContext from './contexts/Teapot';
import HelixContext from './contexts/Helix';
import FaceContext from './contexts/Face';
import StarContext from './contexts/Shader';
import WrenchContext from './contexts/Wrench';

export const ContextMappings: {
    [key in AppRoute]: ContextConstructor | null;
} = {
    "/": PhysContext,
    "/narrative": TeapotContext,
    "/pro-con": HelixContext,
    "/about-me": FaceContext,
    "/tutorial": StarContext,
    "/tools": WrenchContext
};
