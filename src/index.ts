const resolveCwd = require('resolve-cwd')
const umap = require('umap')
const path = require('path')
const escalade = require('escalade')
const { https } = require('follow-redirects')

let cache = umap(new Map)

let cdn = "unpkg.com"

async function localVersion(dependency:string):Promise<string>{
  try{
    let version=""
    let pkg_path = await escalade(path.dirname(resolveCwd(dependency)), (dir:string, names:[string]) => {
      if(names.includes('package.json')){
        let { name, version } = require(path.join(dir,'package.json'))
        if(name === dependency && version){
          return 'package.json'
        }
      }
    })
    if(pkg_path){
      version = require(pkg_path).version
    }
    // if we couldn't locate it locally, assume latest version
    return version || "latest"
  } catch(e){
    return "latest"
  }
}

export async function unpkg(dependency:string, is_module=true):Promise<string>{
  if(dependency.startsWith('.') || dependency.startsWith('https://') || dependency.startsWith('http://')){
    // if local dependency or existing web url, don't edit
    return dependency
  }
  let [id, version] = dependency.split('@').filter(s=>s.length)
  id = dependency.charAt(0) === '@' ? `@${id}` : id
  if(!version){
    // if version wasn't specified, try to use local version (fallback to latest)
    version = await localVersion(dependency)
  }
  let module_id = `${id}@${version}`
  return await lookup(module_id, is_module)
}

async function lookup(module_id:string, is_module:boolean):Promise<string>{
  return cache.get(module_id) || cache.set(module_id,(await fetchUnpkg(module_id,is_module)))
}

async function fetchUnpkg(module_id:string,is_module:boolean):Promise<string>{
  try{
    return new Promise((res, rej) => {
      const request = https.get(`https://${cdn}/${module_id}${is_module ? '?module' : ''}`,
      ({ responseUrl }: { responseUrl: string}) => {
        res(responseUrl)
      }, console.log);
    })
  } catch(e){
    console.log(`Error fetching "${module_id}" from unpkg. Returning empty string`)
    console.log(e)
    return ""
  }
}