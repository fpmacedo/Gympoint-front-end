import styled from 'styled-components';

export const HeaderMenu = styled.div`
  max-width: 1200px;
  margin: 40px auto 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 24px;
    font-weight: bold;
    color: #444444;
  }
  aside {
    display: flex;
  }

  button {
    background: #ee4d64;
    border: none;
    border-radius: 4px;
    width: 142px;
    height: 36px;
    color: #ffffff;
    font-weight: bold;
  }

  input {
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 0 35px;
    width: 210px;
    border-radius: 4px;
    margin-left: 10px;
    text-align: left;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  border-radius: 4px;
  margin: 40px auto 0 auto;
  font-size: 16px;
  max-width: 1200px;
  width: 100%;
  text-align: center;
  background: #fff;
  thead {
    tr {
      font-size: 18px;
      color: #444444;
      th {
        padding: 30px;
      }
    }
  }
  tbody {
    overflow: scroll;
    color: #666666;
    font-size: 16px;
  }
  tbody td {
    border-bottom: 1px solid #eee;
  }
  tr:last-child td {
    border-bottom: none;
  }
  tbody tr {
    height: 60px;
  }
  tbody tr {
    button {
      margin-right: 5px;
      border: none;
      background: none;
      font-weight: bold;
    }
  }
  tbody tr a {
    color: #4d85ee;
  }
`;

export const AnswerButton = styled.button`
  margin-right: 10px;
  border: none;
  background: none;
  color: #4d85ee;
`;

export const DeleteButton = styled.button`
  border: none;
  margin-left: 10px;
  background: none;
  color: #ee4d64;
`;

export const PageButton = styled.button`
  border: none;
  background: #ee4d64;
  color: #eee;
  border-radius: 2px;
  padding: 5px;
  align-items: center;
  margin: 20px 20px 20px 20px;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
