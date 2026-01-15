const sanitizeValue = (value) => {
  if (value == null) return value;

  if (Array.isArray(value)) {
    return value.map((v) => sanitizeValue(v));
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "object") {
    if (
      value._bsontype === "ObjectID" ||
      typeof value.toHexString === "function"
    ) {
      return value.toString();
    }

    const sanitized = {};
    for (const [key, val] of Object.entries(value)) {
      sanitized[key] = sanitizeValue(val);
    }
    return sanitized;
  }

  return value;
};

export const replaceMongoIdInArray = (array) => {
  const mappedArray =
    array
      ?.map((item) => {
        const sanitized = sanitizeValue(item);
        if (sanitized && sanitized._id) {
          return {
            id: sanitized._id.toString(),
            ...sanitized,
          };
        }
        return sanitized;
      })
      .map(({ _id, ...rest }) => rest) ?? [];

  return mappedArray;
};

export const replaceMongoIdInObject = (obj) => {
  if (!obj) return null;
  const sanitized = sanitizeValue(obj);
  if (!sanitized._id) return sanitized;
  const { _id, ...updatedObj } = { ...sanitized, id: sanitized._id.toString() };
  return updatedObj;
};
