// deno script
// we have a ./in/factors_gen.txt file with c++ code like this:
// Factor {
//   Index:              0
//   CppName:            "FI_PAGE_RANK"
//   Name:               "PR"
//   Wiki:               "https://wiki.yandex-team.ru/jandekspoisk/kachestvopoiska/factordev/web/factors/PageRank"
//   AntiSeoUpperBound:  1.0
//   Tags:               [TG_DOC, TG_LINK_GRAPH, TG_STATIC, TG_L2, TG_UNUSED]
//   Description:        "Page rank. Фактор ремапится."
//   Authors:            "aavdonkin"
//   Responsibles:       "aavdonkin"
// UseArtifact:        {Name: "DssmNavigationL2"}
// DependsOn:          [{Feature: ["PopularQ"], Slice: "begemot_query_factors"}]
// }
//
// Factor {
//   Index:              1
//   CppName:            "FI_TEXT_RELEV"
//   Name:               "TR"
//   AntiSeoUpperBound:  0.95
//   Group:              "LegacyTR"
//   Tags:               [TG_DOC, TG_DOC_TEXT, TG_DYNAMIC, TG_REARR_USE, TG_UNDOCUMENTED, TG_NN_OVER_FEATURES_USE]
//   Description:        "Текстовая релевантность (maxfreq – частота самого частого слова, которая имеет смысл длины документа)."
//   Authors:            ["gulin", "iseg", "leo", "maslov"]
//   Responsibles:       ["gulin", "leo", "maslov"]
// }
//  and want to turn it into json

// get contents as string
const file = await Deno.readTextFile("./in/factors_gen.txt")

// split into lines
let lines = file.split("\n")

// remove empty lines
lines = lines.filter((line) => line.length > 0)

// remove comments starting with #
lines = lines.filter((line) => !line.trim().startsWith("#"))

let factors = []

// loop over lines
for (let i = 0; i < lines.length; i++) {
  let line = lines[i]

  // if we see a Factor, start a new factor
  if (line.startsWith("Factor")) {
    factors.push({})
  }

  // refactor with regex because we dont want to match http://
  const regex = /([a-zA-Z0-9_]+):\s*(.*)/
  const match = regex.exec(line)
  if (match) {
    let key = match[1].trim()
    let value = match[2].trim()

    // make first letter lowercase
    key = key.charAt(0).toLowerCase() + key.slice(1)

    if (key === "useArtifact") {
      // value = { Name: value }
      // extract what is written in quotes of value
      const regex = /"([^"]+)"/
      const match = regex.exec(value)
      if (match) {
        value = { Name: match[1] }
      }
    } else if (key === "dependsOn") {
      //[{Feature: ["PopularQ"], Slice: "begemot_query_factors"}]
      // -> { "Feature": "PopularQ", "Slice": "begemot_query_factors" }
      const regex = /{([^}]+)}/
      const match = regex.exec(value)
      if (match) {
        const props = match[1].split(",")
        const obj = {}
        props.forEach((prop) => {
          const [key, value] = prop.split(":")
          // obj[key.trim()] = value?.trim()
          // remove [] and quotes
          obj[key.trim()] = value?.replace(/[\[\]"]+/g, "").trim()
        })
        value = obj
      }
    }
    // if the value is a number, convert it to a number
    else if (!isNaN(value)) {
      value = Number(value)
    }

    // if the value is a string, remove quotes
    else if (
      typeof value === "string" &&
      value.startsWith('"') &&
      value.endsWith('"')
    ) {
      value = value.substring(1, value.length - 1)
    }

    // if the value is an array, convert it to an array
    else if (
      typeof value === "string" &&
      value.startsWith("[") &&
      value.endsWith("]")
    ) {
      value = value.substring(1, value.length - 1)
      value = value.split(",")
      value = value.map((v) => v.trim())
    }

    factors[factors.length - 1][key] = value
  }
}

// foreach authors and responsibles, remove quotes
factors.forEach((factor) => {
  function removeQuotes(array) {
    return array.map((value) => {
      if (value.startsWith('"') && value.endsWith('"')) {
        return value.substring(1, value.length - 1)
      }
      return value
    })
  }

  const props = ["authors", "responsibles", "ticket", "countries", "group"]

  props.forEach((prop) => {
    // if is string make it an array
    if (typeof factor[prop] === "string") {
      factor[prop] = [factor[prop]]
    }

    // if is array, remove quotes
    if (Array.isArray(factor[prop])) {
      factor[prop] = removeQuotes(factor[prop])
    }
  })
})

// write to file
await Deno.writeTextFile("./out/factors.json", JSON.stringify(factors, null, 2))