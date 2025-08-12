export const colorChoice = (type: "error" | "success" | "added") => {
  switch (type) {
    case "error":
      return "#e7000b";
    case "added":
      return "#7ccf00";
    default:
      return "#00a6f4";
  }
};
