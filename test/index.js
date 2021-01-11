
import {unpkg} from '../dist';

unpkg('uhtml').then(res => {
  console.log(res)
})
unpkg('hueman@1.0.0').then(res => {
  console.log(res)
})

unpkg('uhtml', false).then(res => {
  console.log(res)
})

unpkg('umap', { pin: false }).then(res => {
  console.log(res)
})

unpkg('umap', { min: false }).then(res => {
  console.log(res)
})