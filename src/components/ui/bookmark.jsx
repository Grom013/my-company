const Bookmark = ({ bookmark, ...rest }) => {
  return (
    <button {...rest}>
      <i className={"bi bi-bookmark" + (bookmark ? "-heart-fill" : "")}></i>
    </button>
  );
};

export default Bookmark;
