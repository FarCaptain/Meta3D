import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { nullable } from "../../../defaults/meta3d-commonlib-ts/src/nullable"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { Map } from "immutable";

export const workPluginName = "engine-work-plugin-webgl1-worker-render"

export type config = {
    isDebug: boolean,
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService
}

export type verticesVBOMap = Map<number, WebGLBuffer>;
export type indicesVBOMap = Map<number, WebGLBuffer>;
export type programMap = Map<number, WebGLProgram>;

export type state = {
    isDebug: boolean,
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    canvas: nullable<OffscreenCanvas>,
    gl: nullable<WebGLRenderingContext>,
    vbo: {
        verticesVBOMap: verticesVBOMap,
        indicesVBOMap: indicesVBOMap
    },
    material: {
        programMap: programMap
    },
    viewMatrix: nullable<Float32Array>,
    pMatrix: nullable<Float32Array>,
    allGeometryIndices: number[],
    allMaterialIndices: number[],
    typeArray: nullable<Uint32Array>,
    renderGameObjectsCount: number
}


export type states = { "engine-work-plugin-webgl1-worker-render": state };