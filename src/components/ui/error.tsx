import React from 'react';

type ErrorComponentProps = {
  message: string;
};

const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  return (
    <div className="error-message" data-testid="error-component">
      <p>{message}</p>
    </div>
  );
};

export default ErrorComponent;
