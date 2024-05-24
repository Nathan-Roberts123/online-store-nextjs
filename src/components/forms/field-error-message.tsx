const FeildErrorMessage = ({ message }: { message?: string }) => {
  return <p className="text-tiny inline-block text-red-600">{message}</p>;
};

export default FeildErrorMessage;
