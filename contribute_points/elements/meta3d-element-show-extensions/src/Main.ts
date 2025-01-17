import { state as meta3dState } from "meta3d-type/src/Index"
import { getElementContribute as getElementContributeMeta3D } from "meta3d-ui-protocol/src/contribute_points/ElementContributeType"
import { dependentExtensionNameMap, showExtensionsElementState, elementName } from "meta3d-element-show-extensions-protocol"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { traverseReducePromiseM } from "meta3d-element-utils"
import { eventData, eventName } from "meta3d-event-show-extension-protocol"
import { inputData, outputData, customControlName } from "meta3d-custom-control-button-protocol"

export let getElementContribute: getElementContributeMeta3D<dependentExtensionNameMap, showExtensionsElementState> = (api, { meta3dUIExtensionName, meta3dEventExtensionName }) => {
    return {
        elementName: elementName,
        elementState: {
            extensionDataArr: []
        },
        elementFunc: (meta3dState, elementName) => {
            let { getCustomControl, getElementState } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

            let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionName)


            /*! TODO move elementName to VisualElement/Group, judge is state change there!
        	
            // if (!isStateChange(uiState, elementName)) {
            // 	return _handleStateNotChange(meta3dState)
            // }
            */





            // TODO use Nullable.getExn
            let { extensionDataArr } = getElementState<showExtensionsElementState>(uiState, elementName) as showExtensionsElementState


            let drawButton = getCustomControl<inputData, outputData>(uiState, customControlName)

            return traverseReducePromiseM(extensionDataArr, ([meta3dState, index]: [meta3dState, number], { extensionName }) => {
                let data = drawButton(meta3dState,
                    [api, meta3dUIExtensionName],
                    {
                        rect: {
                            x: index * 10,
                            y: 240,
                            width: 20,
                            height: 20,
                        },
                        text: extensionName
                    })
                meta3dState = data[0]
                let isClick = data[1]

                if (isClick) {
                    let { trigger } = api.getExtensionService<eventService>(meta3dState, meta3dEventExtensionName)

                    return trigger<eventData>(meta3dState, meta3dEventExtensionName, eventName, {
                        extensionName: extensionName,
                    }).then((meta3dState) => [meta3dState, index + 1]) as Promise<[meta3dState, number]>
                }

                return new Promise((resolve) => {
                    resolve([meta3dState, index + 1])
                }) as Promise<[meta3dState, number]>
            }, [meta3dState, 0]).then(([meta3dState, _]) => meta3dState)
        }
    }
}