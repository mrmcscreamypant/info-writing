precision highp float;

varying vec2 vUv;
varying float vTime;

uniform float time;

void main() {
    vUv = uv;
    vTime = time;

    gl_Position = projectionMatrix *
        modelViewMatrix *
        vec4(position, 1.0);
}