import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as immutableService } from "meta3d-immutable-protocol/src/service/ServiceType"
import { workPluginName as createGLWorkPluginName, state as createGLState } from "meta3d-work-plugin-webgl1-creategl-protocol"
import { workPluginName as materialWorkPluginName, state as materialState } from "meta3d-work-plugin-webgl1-material-protocol"
import { transform } from "meta3d-component-transform-common-protocol"
import { geometry } from "meta3d-component-geometry-common-protocol"
import { pbrMaterial } from "meta3d-component-pbrmaterial-common-protocol"

export const workPluginName = "WebGL1_Render"

export type transformData = {
    componentName: string,
    localToWorldMatrixDataName: number,
}

export type geometryData = {
    componentName: string,
    indicesCountDataName: number,
}

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    immutableService: immutableService,
    workPluginWhichHasAllRenderComponentsName: string,
    transformData: transformData,
    geometryData: geometryData
}

export type allRenderComponents = Array<{ transform: transform, geometry: geometry, material: pbrMaterial }>

export type workPluginWhichHasAllRenderComponentsState = {
    allRenderComponents: allRenderComponents
}

export type states = {
    [workPluginWhichHasAllRenderComponentsName: string]: workPluginWhichHasAllRenderComponentsState | createGLState | materialState | state,
    [createGLWorkPluginName]: createGLState,
    [materialWorkPluginName]: materialState,
    [workPluginName]: state
}

export type config = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    engineCoreService: engineCoreService,
    immutableService: immutableService,
    workPluginWhichHasAllRenderComponentsName: string,
    transformData: transformData,
    geometryData: geometryData
}