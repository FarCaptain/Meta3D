'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Js_null_undefined = require("rescript/lib/js/js_null_undefined.js");
var OptionSt$Meta3dCommonlib = require("./OptionSt.bs.js");

function $$return(data) {
  return data;
}

function getWithDefault(nullableData, $$default) {
  return OptionSt$Meta3dCommonlib.getWithDefault(OptionSt$Meta3dCommonlib.fromNullable(nullableData), $$default);
}

function bind(nullableData, func) {
  return OptionSt$Meta3dCommonlib.toNullable(OptionSt$Meta3dCommonlib.bind(OptionSt$Meta3dCommonlib.fromNullable(nullableData), (function (val) {
                    return OptionSt$Meta3dCommonlib.fromNullable(Curry._1(func, val));
                  })));
}

var map = Js_null_undefined.bind;

exports.$$return = $$return;
exports.getWithDefault = getWithDefault;
exports.map = map;
exports.bind = bind;
/* No side effect */
