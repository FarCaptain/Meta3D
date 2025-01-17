import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute_points/work/WorkPluginContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-work-plugin-transform-protocol"
import { updateTransform } from "../UpdateTransformUtils"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService, engineCoreService, transformData } = getState(states)

	return mostService.callFunc(() => {
		console.log("update transform job")

		return updateTransform(engineCoreState, engineCoreService, transformData)
	})
}