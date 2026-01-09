varying vec2 vUv;

precision highp float;

void main() {
    vUv = uv;

    gl_Position = projectionMatrix *
        modelViewMatrix *
        vec4(position, 1.0);
}