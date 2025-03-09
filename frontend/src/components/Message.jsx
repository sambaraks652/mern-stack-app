const Message = ({ username, message }) => {
  return (
    <div className="message">
      <strong>{username}: </strong>
      <span>{message}</span>
    </div>
  );
};

export default Message;
