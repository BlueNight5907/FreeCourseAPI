export const paginate = async (
  Model,
  page = 1,
  page_size = 10,
  sort = {},
  condition,
  populate = []
) => {
  const findPromise = Model.find(condition)
    .limit((page - 1) * page_size > 0 ? page_size : 0)
    .skip((page - 1) * page_size > 0 ? (page - 1) * page_size : 0)
    .sort(sort)
    .populate(populate);
  const countPromise = Model.countDocuments(condition);
  const total = await countPromise;
  const data = await findPromise;
  return { total, data };
};
