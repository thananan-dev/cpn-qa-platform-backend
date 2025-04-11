const handleRequestInvalidBody = (...data) => {
  console.log({ data });
  return data.some((item) => item === undefined);
};

module.exports = { handleRequestInvalidBody };
