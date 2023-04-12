export const errorMsg = (error: Error) => {
  console.error(
    "\x1b[31m%s\x1b[0m",
    error.stack?.toString().split("\n").splice(0, 2).join("\n")
  );
};

export const sucessMsg = (message: string) => {
  console.error("\x1b[32m%s\x1b[0m", message);
};

export const pendingMsg = (message: string) => {
  console.error("\x1b[33m%s\x1b[0m", message);
};
