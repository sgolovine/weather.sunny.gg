interface Props {
  children: string;
}
const Error: React.FC<Props> = ({ children }) => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div>
        <div>
          <h3 className="text-sm text-center font-medium text-red-800">
            {children}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Error;
