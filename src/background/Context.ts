import Engine from './Engine';
import { Entity } from './Entity';

export type ContextConstructor = new (engine: Engine) => Context

export default abstract class Context extends Entity {
    public abstract tick(delta: number): void;
}