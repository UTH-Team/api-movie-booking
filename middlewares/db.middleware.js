const checkIDExist = (Model) => {
  return async (req,res,next) => {
    try {
      const { id } = req.params;
      const isExist = await Model.findByPk(id);
      req.recordDB = isExist;
      next()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = {
  checkIDExist
}