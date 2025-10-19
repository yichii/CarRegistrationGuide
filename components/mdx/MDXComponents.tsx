import { Callout } from "./Callout"
import { Checklist } from "./Checklist"
import { DownloadButton } from "./DownloadButton"

export const mdxComponents = {
  Callout,
  Checklist,
  DownloadButton,
  // Style standard markdown elements
  h1: (props: any) => <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
  h4: (props: any) => <h4 className="text-xl font-semibold mt-4 mb-2" {...props} />,
  p: (props: any) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700" {...props} />,
  li: (props: any) => <li className="ml-4" {...props} />,
  a: (props: any) => <a className="text-blue-600 hover:text-blue-700 underline" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 rounded px-1.5 py-0.5 text-sm font-mono text-gray-800" {...props} />
  ),
  pre: (props: any) => <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4" {...props} />,
}
