export const converSchemaToAntdRule = (schema) => {
  return {
    async validator(ruleObject, value) {
      const field = "field";
      schema.validateSyncAt(ruleObject[field], {
        [ruleObject[field]]: value,
      });
    },
  };
};
