import { AppRoute } from '../AppRoutes';
import TeapotContext from './contexts/Teapot';
import Engine from './Engine';
import { Entity } from './Entity';

type ContextConstructor = new (engine: Engine) => Context

export const ContextMappings: { [key in keyof typeof AppRoute]: ContextConstructor | null } = {
    INDEX: TeapotContext,
    NARRATIVE: null
};

export default abstract class Context extends Entity {
    public abstract tick(delta: number): void;
}