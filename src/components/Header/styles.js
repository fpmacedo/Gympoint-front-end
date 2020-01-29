import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  height: 64px;
  background: #ffffff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 30px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #999999;
    }

    ul {
      display: flex;
      color: #999999;

      li:first-child {
        margin-left: 20px;
      }

      li {
        margin: 0 10px;
        max-width: 200px;
        white-space: nowrap;
      }
      .nav-link {
        color: ${lighten(0.1, '#ee4d64')};
      }
    }
  }

  aside {
    display: flex;
    padding-top: 14px;
    flex-direction: column;
    color: #666666;
    font-size: 16px;
    span {
      font-weight: bold;
      margin-bottom: 2px;
    }
    button {
      color: #ee4d64;
      background: none;
      border: none;
    }
  }
`;
