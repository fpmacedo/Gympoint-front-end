import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import logoheader from '~/assets/logoheader.svg';
import { signOut } from '~/store/modules/auth/actions';
import { Container, Content } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);
  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <nav>
          <img src={logoheader} alt="Gympoint" />
          <ul>
            <li>
              <NavLink to="/students">ALUNOS</NavLink>
            </li>
            <li>
              <NavLink to="/plans">PLANOS</NavLink>
            </li>
            <li>
              <NavLink to="/enrollments">MATRÍCULAS</NavLink>
            </li>
            <li>
              <NavLink to="/help-orders">PEDIDOS DE AUXÍLIO</NavLink>
            </li>
          </ul>
        </nav>
        <aside>
          <div>
            <strong>{profile.name}</strong>
          </div>
          <button type="button" onClick={handleSignOut}>
            sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
