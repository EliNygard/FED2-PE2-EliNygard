import styled from "styled-components";

export const StyledRegisterForm = styled.div`
  form {
    margin-top: 1.75rem;
  }

  h2 {
    font-size: 1.125rem;
  }

  .input-wrapper {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .image-link {
    font-size: 14px;
    margin: 0.5rem 0 0.5rem 0;
  }

  span {
    margin-top: 10px;
  }

  span,
  .error-message {
    color: var(--color-alert-red);
    font-size: 14px;
  }

  Button {
    margin-top: 2rem;
  }
`;
