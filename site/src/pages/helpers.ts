export function format(value: string, format: string) {
  switch (format) {
    case "name":
      return value.replace(/([A-Z])/g, " $1")
    case "group":
      return value.replace(/([a-z])([A-Z])/g, "$1 $2")
    case "tags":
      return value.replace(/TG_/, "").replaceAll("_", " ").toLowerCase()
    case "countries":
      return value.replace(/CNT_/, "").replaceAll("_", " ")
    default:
      return value
  }
}