const customError = (req, res) => {
  res.status(404).json({ message: 'Route not found' });
};

module.exports = customError;
