'use strict';

var Caml_obj = require("rescript/lib/js/caml_obj.js");
var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var DisposeUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeUtils.bs.js");
var ArrayMapUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/component/ArrayMapUtils.bs.js");
var MutableSparseMap$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");
var ConfigUtils$Meta3dComponentGeometry = require("../config/ConfigUtils.bs.js");
var BufferGeometryUtils$Meta3dComponentWorkerUtils = require("meta3d-component-worker-utils/lib/js/src/geometry/BufferGeometryUtils.bs.js");
var GetNeedDisposedGeometrysUtils$Meta3dComponentGeometry = require("../gameobject/GetNeedDisposedGeometrysUtils.bs.js");
var ReallocatedPointsGeometryUtils$Meta3dComponentGeometry = require("./ReallocatedPointsGeometryUtils.bs.js");

var _removeComponent = MutableSparseMap$Meta3dCommonlib.remove;

function deferDisposeComponent(state) {
  var gameObjectGeometryMap = state.gameObjectGeometryMap;
  var needDisposedGeometryArray = state.needDisposedGeometryArray;
  return function (param) {
    var gameObject = param[1];
    var newrecord = Caml_obj.caml_obj_dup(state);
    newrecord.needDisposedGeometryArray = ArrayMapUtils$Meta3dCommonlib.addValue(needDisposedGeometryArray, param[0], gameObject);
    newrecord.gameObjectGeometryMap = MutableSparseMap$Meta3dCommonlib.remove(gameObjectGeometryMap, gameObject);
    return newrecord;
  };
}

var _batchRemoveGameObjects = ArrayMapUtils$Meta3dCommonlib.batchRemoveValueArr;

var _getGameObjects = MutableSparseMap$Meta3dCommonlib.get;

function _isComponentHasNoGameObject(gameObjectsMap, component, gameObjectArr) {
  var arr = MutableSparseMap$Meta3dCommonlib.get(gameObjectsMap, component);
  if (arr !== undefined) {
    return arr.length > 0;
  } else {
    return false;
  }
}

function _disposeData(state) {
  var verticesInfos = state.verticesInfos;
  var texCoordsInfos = state.texCoordsInfos;
  var normalsInfos = state.normalsInfos;
  var indicesInfos = state.indicesInfos;
  return function (isDebug, component) {
    var infoIndex = BufferGeometryUtils$Meta3dComponentWorkerUtils.getInfoIndex(component);
    ReallocatedPointsGeometryUtils$Meta3dComponentGeometry.setInfo(verticesInfos, infoIndex, 0, 0, isDebug);
    ReallocatedPointsGeometryUtils$Meta3dComponentGeometry.setInfo(texCoordsInfos, infoIndex, 0, 0, isDebug);
    ReallocatedPointsGeometryUtils$Meta3dComponentGeometry.setInfo(normalsInfos, infoIndex, 0, 0, isDebug);
    ReallocatedPointsGeometryUtils$Meta3dComponentGeometry.setInfo(indicesInfos, infoIndex, 0, 0, isDebug);
    return state;
  };
}

function _removeDisposedComponentsFromNeedDisposedComponents(needDisposedComponents, disposedComponents) {
  return ArraySt$Meta3dCommonlib.reduceOneParam(disposedComponents, MutableSparseMap$Meta3dCommonlib.remove, needDisposedComponents);
}

function disposeComponents(state, componentDataMap) {
  var isDebug = ConfigUtils$Meta3dComponentGeometry.getIsDebug(state);
  var needDisposedComponents = GetNeedDisposedGeometrysUtils$Meta3dComponentGeometry.get(state);
  DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(isDebug, "component", MutableSparseMap$Meta3dCommonlib.getKeys(componentDataMap), MutableSparseMap$Meta3dCommonlib.getKeys(needDisposedComponents));
  var match = MutableSparseMap$Meta3dCommonlib.reducei(componentDataMap, (function (param, gameObjects, component) {
          var disposedComponents = param[1];
          var state = param[0];
          state.gameObjectsMap = ArrayMapUtils$Meta3dCommonlib.batchRemoveValueArr(state.gameObjectsMap, component, gameObjects);
          if (_isComponentHasNoGameObject(state.gameObjectsMap, component, gameObjects)) {
            return [
                    state,
                    disposedComponents
                  ];
          } else {
            return [
                    _disposeData(state)(isDebug, component),
                    ArraySt$Meta3dCommonlib.push(disposedComponents, component)
                  ];
          }
        }), [
        state,
        []
      ]);
  var disposedComponents = match[1];
  var state$1 = match[0];
  state$1.disposedGeometryArray = state$1.disposedGeometryArray.concat(disposedComponents);
  state$1.needDisposedGeometryArray = _removeDisposedComponentsFromNeedDisposedComponents(needDisposedComponents, disposedComponents);
  return state$1;
}

exports._removeComponent = _removeComponent;
exports.deferDisposeComponent = deferDisposeComponent;
exports._batchRemoveGameObjects = _batchRemoveGameObjects;
exports._getGameObjects = _getGameObjects;
exports._isComponentHasNoGameObject = _isComponentHasNoGameObject;
exports._disposeData = _disposeData;
exports._removeDisposedComponentsFromNeedDisposedComponents = _removeDisposedComponentsFromNeedDisposedComponents;
exports.disposeComponents = disposeComponents;
/* No side effect */