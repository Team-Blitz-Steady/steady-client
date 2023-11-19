const isPastDate = (date: Date) => {
  const today = new Date();
  if (date.getMonth() < today.getMonth()) {
    return true;
  } else if (date.getMonth() === today.getMonth()) {
    if (date.getDate() < today.getDate()) {
      return true;
    }
  }
  return false;
};

export default isPastDate;
