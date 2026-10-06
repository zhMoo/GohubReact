// OBJECTIVE: Creating controlled components for forms
// OBJECTIVE: Rendering data with conditional rendering
//
// This one component covers both. "Controlled" means the input's
// value comes FROM React state (the `value` prop) and every keystroke
// reports back to that same state (`onChange`) — React is the single
// source of truth for what's in the box, not the DOM.
//
// The error line below the input is conditionally rendered: `error &&
// <p>...</p>` only produces something when `error` is a truthy
// string. No error for this field yet → nothing renders at all.
export default function FormField({ label, name, type = "text", value, onChange, error, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/30"
        }`}
        
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
