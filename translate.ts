// deno script

// read factors.json and translate all "description" props from russian to
// english, add the translation to the "description_en" prop

const factors = JSON.parse(await Deno.readTextFile("./out/factors_en.json"));

// curl -X POST 'https://api-free.deepl.com/v2/translate' \
// 	-H 'Authorization: DeepL-Auth-Key xyz' \
// 	-d 'text=Hello%2C%20world!' \
// 	-d 'target_lang=DE'

// translate text
async function translate(text) {
  const response = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: {
      Authorization: "DeepL-Auth-Key " + Deno.env.get("DEEPL_AUTH_KEY"),
    },
    body: new URLSearchParams({
      text,
      target_lang: "EN",
    }),
  });

  try {
    const json = await response.json();
    if (!json.translations[0].text) throw new Error("no translations found")
    return json.translations[0].text
  } catch (error) {
    console.error(error);
    return await response.text();
  }
}

// translate all descriptions
for (const factor of factors) {
  if (!factor.description || factor.description_en) continue;

  factor.description_en = await translate(factor.description);

  // write to file
  await Deno.writeTextFile("./out/factors_en.json", JSON.stringify(factors, null, 2));
}