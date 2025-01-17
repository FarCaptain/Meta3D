import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { transformData } from "meta3d-work-plugin-transform-protocol"
import { transform, update } from "meta3d-component-transform-common-protocol"

export function updateTransform (engineCoreState: engineCoreState, engineCoreService: engineCoreService, { componentName, updateDataName }: transformData) {
	let usedTransformContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, componentName)
	let allTransforms = engineCoreService.getAllComponents<transform>(usedTransformContribute)

	usedTransformContribute = allTransforms.reduce((usedTransformContribute, transform) => {
		return engineCoreService.setComponentData<transform, update>(usedTransformContribute, transform, updateDataName, null)
	}, usedTransformContribute)

	return engineCoreService.setUsedComponentContribute(engineCoreState, usedTransformContribute, componentName)
}
