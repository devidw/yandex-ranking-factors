import common from "./_common"

export default function (props: any) {
  return {
    "@type": "TechArticle",
    ...common(props)
  }
}