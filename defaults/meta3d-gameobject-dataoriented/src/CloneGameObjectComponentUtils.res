let _cloneComponent = (
  componentState,
  (getComponentFunc, cloneComponentFunc, addComponentFunc),
  isDebug,
  countRange,
  cloneConfig,
  (sourceGameObject, clonedGameObjects),
) => {
  getComponentFunc(. componentState, sourceGameObject)
  ->Meta3dCommonlib.NullableSt.map((. component) => {
    let (componentState, clonedComponents) = cloneComponentFunc(.
      componentState,
      countRange,
      cloneConfig,
      component,
    )

    let componentState = Meta3dCommonlib.BatchAddComponentUtils.batchAdd(
      componentState,
      addComponentFunc,
      isDebug,
      clonedGameObjects,
      clonedComponents,
    )

    (componentState, clonedComponents)
  })
  ->Meta3dCommonlib.NullableSt.getWithDefault((componentState, []))
}

let clone = (
  (
    transformState: Meta3dEngineCoreProtocol.ComponentType.transformState,
    pbrMaterialState: Meta3dEngineCoreProtocol.ComponentType.pbrMaterialState,
    geometryState: Meta3dEngineCoreProtocol.ComponentType.geometryState,
  ),
  ((cloneTransformFunc, addTransformFunc), pbrMaterialFuncs, geometryFuncs),
  isDebug,
  countRange,
  {isShareMaterial}: Meta3dGameobjectProtocol.Index.cloneConfig,
  sourceTransform,
  (sourceGameObject, clonedGameObjects),
) => {
  let (transformState, clonedTransforms) = cloneTransformFunc(.
    transformState,
    countRange,
    (),
    sourceTransform
  )
  let transformState = Meta3dCommonlib.BatchAddComponentUtils.batchAdd(
    transformState,
    addTransformFunc,
    isDebug,
    clonedGameObjects,
    clonedTransforms,
  )

  let (pbrMaterialState, _) = _cloneComponent(
    pbrMaterialState,
    pbrMaterialFuncs,
    isDebug,
    countRange,
    ({isShare: isShareMaterial}: Meta3dComponentPbrmaterialProtocol.Index.cloneConfig),
    (sourceGameObject, clonedGameObjects),
  )

  let (geometryState, _) = _cloneComponent(
    geometryState,
    geometryFuncs,
    isDebug,
    countRange,
    (),
    (sourceGameObject, clonedGameObjects),
  )

  ((transformState, pbrMaterialState, geometryState), clonedTransforms)
}
