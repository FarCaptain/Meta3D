import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { state as meta3dState } from "meta3d-type/src/Index"

export type service = {
	register: (engineCoreState: engineCoreState, meta3dState: meta3dState) => engineCoreState
}