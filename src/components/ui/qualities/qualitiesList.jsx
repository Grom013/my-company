import Qualitie from "./qualitie";
const QualitiesList = ({ qualities }) => {
  return (
    <>
      {qualities.map((item) => (
        <Qualitie key={item._id} {...item} />
      ))}
    </>
  );
};

export default QualitiesList;
