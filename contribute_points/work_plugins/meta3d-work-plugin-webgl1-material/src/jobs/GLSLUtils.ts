export type vert = string;

export type frag = string;

export let getVertGLSL = () => `
	attribute vec3 a_position;
	uniform mat4 u_projection;
	uniform mat4 u_view;
	uniform mat4 u_model;
	void main() {
		gl_Position = u_projection * u_view * u_model * vec4(a_position, 1.0);
	}
`;

export let getFragGLSL = () => `
	precision mediump float;
	void main() {
		gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
	}
`;
