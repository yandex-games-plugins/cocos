// JS object to JSON schema

type ObjectLike = { [key: string]: any };

export function generateSchema(obj: any) {
  if (Array.isArray(obj)) return;
  const properties: ObjectLike = {};

  for (const [key, value] of Object.entries(obj)) {
    switch (typeof value) {
      case "string":
        properties[key] = { type: "string" };
        break;
      case "object":
        const schema = generateSchema(value);
        if (schema) properties[key] = schema;
        break;
    }
  }

  return {
    type: "object",
    properties,
    required: Object.keys(properties),
  };
}
