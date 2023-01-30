// deno script
import factors from "./out/factors_en.json" assert { type: "json" };

// [{index, description_en,}] to {index: description_en}
const factors_en = Object.fromEntries(factors.map((f) => [f.index, f.description_en]));

// write to out/en.json
await Deno.writeTextFile("./out/en.json", JSON.stringify(factors_en, null, 2));