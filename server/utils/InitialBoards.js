exports.firstBoard = () => {
  return {
    title: "Main",
    subtitle: "",
    children: ["InitialFile"],
    text: "",
    expanded: true,
    id: "ROOT",
    parentId: null,
  };
};

exports.secondBoard = () => {
  return {
    title: "Starter",
    subtitle: "",
    children: [],
    text: "This is your first file",
    expanded: true,
    id: "InitialFile",
    parentId: "ROOT",
  };
};
