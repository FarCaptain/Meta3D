let getComponentContribute: Meta3dEngineCoreProtocol.ComponentContributeType.getComponentContribute<
  StateType.state,
  Meta3dComponentBasiccameraviewProtocol.Index.config,
  
  Meta3dComponentBasiccameraviewProtocol.Index.needDisposedComponents,
  Meta3dComponentBasiccameraviewProtocol.Index.batchDisposeData,
  Meta3dComponentBasiccameraviewProtocol.Index.cloneConfig,
  Meta3dComponentBasiccameraviewProtocol.Index.basicCameraView,
> = () => {
  componentName: Meta3dComponentBasiccameraviewProtocol.Index.componentName,
  createStateFunc: (. {isDebug}) => CreateStateUtils.createState(isDebug),
  createComponentFunc: (. state) => CreateBasicCameraViewUtils.create(state),
  addComponentFunc: (. state, gameObject, cameraView) => {
    AddBasicCameraViewUtils.add(state, gameObject, cameraView)
  },
  removeComponentFunc: (. state, gameObject, cameraView) => {
    RemoveBasicCameraViewUtils.remove(state, gameObject, cameraView)
  },
  hasComponentFunc: (. state, gameObject) => {
    HasBasicCameraViewUtils.has(state, gameObject)
  },
  getComponentFunc: (. state, gameObject) => {
    GetBasicCameraViewUtils.get(state, gameObject)
  },
  getNeedDisposedComponentsFunc: (. state) => {
    GetNeedDisposedBasicCameraViewsUtils.get(state)
  },
  getGameObjectsFunc: (. state, cameraView) => {
    GetGameObjectsUtils.get(state, cameraView)
  },
  getComponentDataFunc: (. state, cameraView, dataName) => {
    GetBasicCameraViewDataUtils.getData(. state, cameraView, dataName)
  },
  setComponentDataFunc: (. state, cameraView, dataName, dataValue) => {
    SetBasicCameraViewDataUtils.setData(. state, cameraView, dataName, dataValue)
  },
  getAllComponentsFunc: (. state) => {
    GetAllBasicCameraViewsUtils.getAll(state)
  },
  deferDisposeComponentFunc: (. state, cameraViewData) => {
    DisposeBasicCameraViewUtils.deferDisposeComponent(state, cameraViewData)
  },
  disposeComponentsFunc: (. state, cameraViews) => {
    DisposeBasicCameraViewUtils.disposeComponents(state, cameraViews)
  },
  cloneComponentFunc: (. state, countRange, _, sourceBasicCameraView) => {
    CloneBasicCameraViewUtils.clone(state, countRange, sourceBasicCameraView)
  },
}
