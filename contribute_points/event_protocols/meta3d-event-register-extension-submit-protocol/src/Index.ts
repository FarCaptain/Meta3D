export const eventName = "RegisterExtensionSubmit"

export type eventData = {
    extensionName: string,
    dependentExtensionNameMap: null,
    getExtensionServiceFunc: any,
    createExtensionStateFunc: any
}

export type meta3dUIProtocolData = {
    protocolName: "meta3d-ui-protocol",
    protocolVersion: "^0.2.0",
}

export type dependentExtensionProtocolMap = {
    meta3dUIProtocolData: meta3dUIProtocolData
}

export type dependentExtensionNameMap = {
    meta3dUIExtensionName: string
}

