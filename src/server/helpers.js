module.exports = {
  numberOfDaysBetweenDates: (date1, date2) => {
    const diff = date2.getTime() - date1.getTime();
    return Math.round(diff / (1000 * 3600 * 24));
  },
};
