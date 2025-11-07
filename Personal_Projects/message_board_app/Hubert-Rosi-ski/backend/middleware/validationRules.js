export const messageValidationRules = {
  content: {
    minLength: 5,
    maxLength: 500,
    messages: {
      required: "Content is required.",
      tooShort: "Content is too short.",
      tooLong: "Content is too long.",
    },
  },
  id: {
    mustBeInteger: "ID must be an integer.",
  },
};