

import * as ImmutableSparseMap$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";

function add(state, gameObject, cameraView) {
  return {
          config: state.config,
          maxIndex: state.maxIndex,
          isActiveMap: state.isActiveMap,
          gameObjectMap: ImmutableSparseMap$Meta3dCommonlib.set(state.gameObjectMap, cameraView, gameObject),
          gameObjectBasicCameraViewMap: ImmutableSparseMap$Meta3dCommonlib.set(state.gameObjectBasicCameraViewMap, gameObject, cameraView),
          needDisposedBasicCameraViews: state.needDisposedBasicCameraViews,
          disposedBasicCameraViews: state.disposedBasicCameraViews
        };
}

export {
  add ,
  
}
/* No side effect */
