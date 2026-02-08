import { BiLink } from "react-icons/bi";
import { Link } from "react-router-dom";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <div className={`text-3xl font-bold text-inherit ${className ?? ""}`}>
      <Link to="/" className="flex items-center gap-2">
        <BiLink className="text-blue-700" />
        <span className="text-blue-700">Short Your Link</span>
      </Link>
    </div>
  );
};

export default Logo;