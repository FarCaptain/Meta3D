type eventData

type eventName = string

type eventHandler<'dependentExtensionNameMap, 'eventData> = (
  (Meta3dType.Index.api, 'dependentExtensionNameMap),
  Meta3dType.Index.state,
  'eventData,
) => Js.Promise.t<Meta3dType.Index.state>

type onedEventHandler<'eventData> = (
  Meta3dType.Index.state,
  'eventData,
) => Js.Promise.t<Meta3dType.Index.state>