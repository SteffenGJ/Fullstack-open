const Notification = ({ message }) => {
  return (
    <div className="bg-green-300 text-lg font-semibold p-4 rounded-2xl my-5 text-center">
      {message.message}
    </div>
  );
};

export default Notification;