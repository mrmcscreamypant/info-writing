precision highp float;

varying vec2 vUv;

const float pi = 3.1415926535;

void main() {
    gl_FragColor = vec4(sin(vUv.x * pi * 10.0), cos(vUv.y * pi * 10.0), 0.5, 1.0);
}