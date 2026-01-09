precision highp float;

varying vec2 vUv;
varying float vTime;

const float pi2 = 3.1415926535 * 2.0;

float positiveSin(float x) {
    return sin(x) / 2.0 + 0.5;
}

float positiveCos(float x) {
    return cos(x) / 2.0 + 0.5;
}

void main() {
    float fade = sqrt(cos(vUv.y * pi2 + vTime));
    float r = positiveSin(vUv.x * pi2 * cos(vTime));
    float g = positiveSin(dot((vUv.yx * sin(vTime)) / (vUv.xy * cos(vTime)), vec2(0, 0)));
    float b = positiveCos(sin(vUv.y / vUv.x) * pi2 * sin(vTime));
    gl_FragColor = vec4(r, g, b, fade);
}