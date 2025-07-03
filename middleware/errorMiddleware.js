const notFound = (req, res, next) => res.status(404).json({ message: 'Route not found' });

const handleErrors = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
};

module.exports = { notFound, handleErrors };
