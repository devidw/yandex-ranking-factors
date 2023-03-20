// import json from "./out/factors.json"

import factors from "./out/factors_en.json" assert { type: "json" }

// print unique object props and their value types
const props = {}
factors.forEach((factor) => {
  Object.keys(factor).forEach((key) => {
    if (!props[key]) {
      props[key] = new Set()
    }
    props[key].add(typeof factor[key])
  })
})

console.log(props)

// write to out/schema.json
Deno.writeTextFile("./out/schema.json", JSON.stringify(props, null, 2))