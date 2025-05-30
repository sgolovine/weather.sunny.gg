import type { ReactNode } from "react";
import { Link } from "wouter";

interface Props {
  href: string;
  children: ReactNode;
}

const IconButton: React.FC<Props> = ({ href, children }) => (
  <div className="absolute top-4 right-4">
    <Link href={href}>
      <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 active:bg-gray-400">
        {children}
      </button>
    </Link>
  </div>
);

export default IconButton;
