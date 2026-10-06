import { useState } from "react";
import FormField from "./FormField.jsx";

const EMPTY_FORM = { message: "" };

export default function App() {

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [submittedData, setSubmittedData] = useState(null);

  function handleChange(e) {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      message: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmittedData(null);
      return;
    }

    setErrors({});
    setSubmittedData(formData); // snapshot of what was submitted
  }

  function validate(data) {
    const newErrors = {};
    if (!data.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  }

  function handleRegisterAnother() {
    setFormData(EMPTY_FORM);
    setErrors({});
    setSubmittedData(null);
  }

  if (submittedData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Success icon + heading */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              Successfully submitted
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Here's what we received.
            </p>
          </div>

          {/* Summary */}
          <dl className="mt-6 divide-y divide-gray-100 rounded-lg border border-gray-200 bg-gray-50">
            <div className="px-4 py-3">
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Message
              </dt>

              <dd className="mt-1 flex items-start justify-between gap-3">
                <span className="whitespace-pre-wrap break-words text-sm text-gray-900">
                  {showMessage
                    ? submittedData.message
                    : "•".repeat(Math.min(submittedData.message.length, 12))}
                </span>

                <button
                  type="button"
                  onClick={() => setShowMessage((s) => !s)}
                  aria-label={showMessage ? "Hide message" : "Show message"}
                  aria-pressed={showMessage}
                  className="shrink-0 rounded-md p-1 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                >
                  {showMessage ? (
                    /* Eye-off icon */
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    /* Eye icon */
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.543 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </dd>
            </div>
          </dl>

          {/* Action */}
          <button
            onClick={handleRegisterAnother}
            className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 active:bg-blue-800"
          >
            Submit another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-sm text-center">
        <h1 className="text-2xl font-bold text-slate-900">Hello, Anonymous</h1>
        <p className="mt-2 text-slate-500">
          Just type in something that you like to share!
        </p>

        <form onSubmit={handleSubmit}>
          <FormField
            label=""
            name="message"
            type="text"
            value={formData.message}
            onChange={handleChange}
            error={errors.message}
            placeholder="Type your message here"
          />
  
          <button className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}