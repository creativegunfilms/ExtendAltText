'use client';
const ClientComponent = ({ children }) => {
  return (
    <>
      <p>Coming from Client Component Wrapper</p>
      {children}
    </>
  );
};

export default ClientComponent;
