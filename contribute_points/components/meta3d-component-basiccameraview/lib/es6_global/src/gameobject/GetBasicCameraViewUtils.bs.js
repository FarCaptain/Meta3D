

import * as ImmutableSparseMap$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/structure/sparse_map/ImmutableSparseMap.bs.js";

function get(param, gameObject) {
  return ImmutableSparseMap$Meta3dCommonlib.unsafeGet(param.gameObjectBasicCameraViewMap, gameObject);
}

export {
  get ,
  
}
/* No side effect */
