import { type FC } from "react";
import { prettifyError, ZodError } from "zod";

const ErrorComponent: FC<{ error: unknown }> = ({ error }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-3xl font-bold mb-4">Something went wrong.</h1>
      <pre className="bg-red-100 text-red-800 p-4 rounded-lg max-w-lg overflow-x-auto">
        {(error instanceof ZodError) ? prettifyError(error) : (error instanceof Error) ? error.message : "Unknown error"}
      </pre>
    </div>
  );
};
export default ErrorComponent;