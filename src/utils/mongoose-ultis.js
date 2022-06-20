export const deleteSecureField = (doc) => {
  delete doc.__v;
  delete doc.createdAt;
  delete doc.updatedAt;
  delete doc.password;
  return doc;
};
