const AddReviewButton = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <button
      onClick={onOpen}
      className="rounded-full font-bold p-3 bg-blue-500 text-white fony-bold hover:bg-blue-600 cursor-pointer"
    >
      Want to add Review ?
    </button>
  );
};

export default AddReviewButton;
