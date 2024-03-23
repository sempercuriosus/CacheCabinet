/**
 * @name dateHelper
 * @description description
 * @param {}
 * @returns
 */
const dateHelper = (dateToConvert) => {
  if (!dateToConvert) {
    return '';
  }

  try {
    const dateInput = isNaN(new Date(dateToConvert).getTime())
      ? new Date(dateToConvert)
      : dateToConvert;

    const formattedDateString = dateInput.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    return formattedDateString;
  } catch (error) {
    return '';
  }
}; //  [ end : dateHelper ]

module.exports = dateHelper;

