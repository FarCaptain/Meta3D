open Meta3dWorkPluginRootProtocol.Index

let _getExecFunc = (_pipelineName: string, jobName: string) => {
  switch jobName {
  | "init_root_meta3d" => InitJob.execFunc
  | "update_root_meta3d" => UpdateJob.execFunc
  | "render_root_meta3d" => RenderJob.execFunc
  | _ => Js.Nullable.null->Obj.magic
  }
}

let _init = _state => {
  ()
}

let getWorkPluginContribute: Meta3dEngineCoreProtocol.StateType.getWorkPluginContribute<
  state,
  config,
  states,
> = mostService => {
  {
    workPluginName: workPluginName,
    createStateFunc: (): state => {
      mostService: mostService,
    },
    initFunc: _init,
    getExecFunc: _getExecFunc->Obj.magic,
    allPipelineData: [
      {
        name: "init",
        groups: [
          {
            name: "first_root_meta3d",
            link: #concat,
            elements: [
              {
                name: "init_root_meta3d",
                type_: #job,
                is_set_state:true -> Js.Nullable.return
              },
            ],
          },
        ],
        first_group: "first_root_meta3d",
      },
{
        name: "update",
        groups: [
          {
            name: "first_root_meta3d",
            link: #concat,
            elements: [
              {
                name: "update_root_meta3d",
                type_: #job,
                is_set_state:true -> Js.Nullable.return
              },
            ],
          },
        ],
        first_group: "first_root_meta3d",
      },
{
        name: "render",
        groups: [
          {
            name: "first_root_meta3d",
            link: #concat,
            elements: [
              {
                name: "render_root_meta3d",
                type_: #job,
                is_set_state:true -> Js.Nullable.return
              },
            ],
          },
        ],
        first_group: "first_root_meta3d",
      }
    ],
  }
}
