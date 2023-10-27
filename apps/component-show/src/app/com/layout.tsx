import React from "react";
function BreadCrumb({
  pages,
}: {
  pages: { name: string; href: string; current: boolean }[];
}) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-3">
        <li>
          <div>
            <a
              href={""}
              className="ml-4 text-sm  text-gray-500 hover:text-blue-600"
            >
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
                className={`ml-4 text-sm hover:text-blue-600 ${
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

export default function Layout({
  params,
  children,
}: {
  params: {};
  children: React.ReactNode;
}) {
  console.log("params", params);
  return (
    <main className="w-full">
      <div className="border border-red-500 flex flex-col w-full p-12">
        <div className="m-12">
          <BreadCrumb
            pages={[
              { name: "Projects", href: "#", current: false },
              { name: "Project Nero", href: "#", current: true },
            ]}
          />
          <h1> Header</h1>
        </div>
        <div>{children}</div>
      </div>
    </main>
  );
}
