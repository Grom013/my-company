const SearchStatus = ({ count }) => {
  const renderPhrase = () => {
    return count > 0
      ? `сегодня с тобой тусанут ${count} человек`
      : `сегодня с тобой никто не тусанет`;
  };
  return (
    <h2 className={`badge bg-${count > 0 ? `primary` : `danger`}`}>
      {renderPhrase()}
    </h2>
  );
};

export default SearchStatus;
