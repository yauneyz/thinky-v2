exports.getDeletedTabs = async () => {
  const response = await fetch("/undo/getDeletedTabs");
  return await response.json();
};
