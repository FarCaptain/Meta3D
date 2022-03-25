import { execFunc as execFuncType } from "../../Type"
import { getState } from "../../Utils"
import { states } from "engine-work-plugin-webgl1-worker-render-protocol"
import { createGetMainWorkerDataStream } from "meta3d-commonlib-ts/src/CreateWorkerDataStreamService"

export let execFunc: execFuncType = (engineCoreState, { getStatesFunc, setStatesFunc }) => {
	let states = getStatesFunc<states>(engineCoreState)
	let { mostService } = getState(states)

	let offscreenCanvas: OffscreenCanvas
	let allGeometryIndices: number[]
	let allMaterialIndices: number[]

	return createGetMainWorkerDataStream(
		mostService,
		(event: MessageEvent) => {
			offscreenCanvas = event.data.canvas
			allGeometryIndices = event.data.allGeometryIndices
			allMaterialIndices = event.data.allMaterialIndices
		},
		"SEND_INIT_RENDER_DATA",
		self as any as Worker
	).map(() => {
		console.log("get init render data job webgl worker exec on worker thread")

		// TODO fix: should use newest states @yyc

		return setStatesFunc<states>(
			engineCoreState,
			{
				...states,
				"engine-work-plugin-webgl1-worker-render": {
					...getState(states),
					canvas: offscreenCanvas,
					allGeometryIndices: allGeometryIndices,
					allMaterialIndices: allMaterialIndices
				}
			}
		)
	})
}