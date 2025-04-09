// Utility function to check error types and return a string message
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if ((error as any).name === "ValidationError") {
    return "Validation Error: " + (error as any).message;
  }

  if ((error as any).code === "ER_DUP_ENTRY") {
    return "Database Error: Duplicate entry.";
  }

  return "Unknown error occurred.";
};
