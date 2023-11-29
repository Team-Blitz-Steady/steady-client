const escapeHTML = (str: string) => {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
};

export default escapeHTML;
