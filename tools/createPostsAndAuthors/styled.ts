import styled from 'styled-components'

export const Container = styled.div`
  margin: 30px;
  display: flex;
  column-gap: 30px;
`

export const StyledButton = styled.button`
  padding: 20px 80px;
  background-color: #3ecff0;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;

  &:disabled {
    background-color: rgba(62, 207, 240, 0.5);
    cursor: not-allowed;
  }
`
