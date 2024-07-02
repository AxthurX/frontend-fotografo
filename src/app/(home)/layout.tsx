import { ReactNode } from "react";

export default function Layout(props: {
  children: ReactNode;
  news: ReactNode;
}) {
  return (
    <div className="container border border-t-0 border-sage-300 bg-beige-100 p-0 max-sm:border-0">
      {props.children}
      <div className="mb-16 h-20 bg-calpolygreen-900 text-beige-50">
        <h3 className="flex h-full w-full items-center justify-center text-center align-middle text-2xl">
          Notícias recentes
        </h3>
      </div>
      {props.news}
    </div>
  );
}
