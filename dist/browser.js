'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var umap = _ => ({
  // About: get: _.get.bind(_)
  // It looks like WebKit/Safari didn't optimize bind at all,
  // so that using bind slows it down by 60%.
  // Firefox and Chrome are just fine in both cases,
  // so let's use the approach that works fast everywhere 👍
  get: key => _.get(key),
  set: (key, value) => (_.set(key, value), value)
});

let cache = umap(new Map);

let cdn = "https://unpkg.com";

async function unpkg(dependency, is_module=true){
  if(dependency.startsWith('.') || dependency.startsWith('https://') || dependency.startsWith('http://')){
    // if local dependency or existing web url, don't edit
    return dependency
  }
  let [id, version='latest'] = dependency.split('@').filter(s=>s.length);
  id = dependency.charAt(0) === '@' ? `@${id}` : id;
  let module_id = `${id}@${version}`;
  return lookup(module_id, is_module)
}

async function lookup(module_id, is_module){
  return cache.get(module_id) || cache.set(module_id,(await fetchUnpkg(module_id,is_module)))
}

async function fetchUnpkg(module_id,is_module=true){
  try{
    let { url } = await fetch(`${cdn}/${module_id}${is_module ? '?module' : ''}`);
    return url
  } catch(e){
    console.log("Error fetching " + module_id + ". Returning empty strings");
    console.log(e);
    return ""
  }
}

exports.unpkg = unpkg;
