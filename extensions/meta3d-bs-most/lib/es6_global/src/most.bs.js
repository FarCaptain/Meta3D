

import * as Most from "most";
import * as Curry from "./../../../../rescript/lib/es6/curry.js";

function unfold(f) {
  return function (param) {
    return Most.unfold((function (x) {
                  var match = Curry._1(f, x);
                  if (match !== undefined) {
                    return {
                            value: match[0],
                            seed: match[1]
                          };
                  } else {
                    return {
                            done: true
                          };
                  }
                }), param);
  };
}

function fromList(list) {
  return unfold(function (curList) {
                if (curList) {
                  return [
                          curList.hd,
                          curList.tl
                        ];
                }
                
              })(list);
}

var Subject = {};

export {
  unfold ,
  fromList ,
  Subject ,
  
}
/* most Not a pure module */
