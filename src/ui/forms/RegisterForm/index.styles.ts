import styled from 'styled-components';

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

#bio {
  height: 124px;
}

.image-link {
  font-size: 14px;
}

span {
  margin-top: 10px;
  color: var(--color-alert-red);
  font-size: 14px;
}
`