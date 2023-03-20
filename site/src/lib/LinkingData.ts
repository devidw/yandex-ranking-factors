import * as fs from "fs"
import Article from "./schemas/Article";
import TechArticle from "./schemas/TechArticle";

const schemas = {
  Article,
  TechArticle,
}

export function wrap(jsonld: object[]) {
  let ld = ""
  if (jsonld.length === 0) {
    ld = JSON.stringify(jsonld[0])
  } else {
    ld = JSON.stringify(jsonld)
  }
  return `<script type="application/ld+json">${ld}</script>`
}

export function generate(props: any) {
  if (!props.schema?.type) return
  const schema = schemas[props.schema.type]
  if (!schema) return
  const jsonld = schema(props)
  if (!props.schema.extra) return jsonld
  return {
    ...jsonld,
    ...props.schema.extra,
  }
}

export function maybeRead(path: string) {
  const regex = /\/index\.(md|mdx)$/
  if (!path.match(regex)) return
  const ldPath = `${path.replace(regex, "")}/ld.json`
  if (!fs.existsSync(ldPath)) return
  const content = fs.readFileSync(ldPath, "utf8")
  return JSON.parse(content)
}