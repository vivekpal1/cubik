export default function BreadCrumb({
  pages,
}: {
  pages: { name: string; href: string; current: boolean }[];
}) {
  return (
    <nav className="flex mb-14" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        <li>
          <div>
            <a href={""} className="text-md text-gray-500 hover:text-blue-600">
              Home
            </a>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <a
                href={page.href}
                className={`ml-4 text-md hover:text-blue-600 ${
                  page.current ? "text-blue-600" : "text-gray-500"
                }`}
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
