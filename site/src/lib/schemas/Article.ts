import common from "./_common"

export default function (props: any) {
  return {
    "@type": "Article",
    ...common(props)
  }
}