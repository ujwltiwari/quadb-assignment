const ContentWrapper = ({ children, className }) => {
  return (
    <>
      <div className={`max-w-[1120px] m-auto ${className ?? ""}`}>
        {children}
      </div>
    </>
  );
};

export default ContentWrapper;
