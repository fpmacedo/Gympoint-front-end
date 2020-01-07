import { Input } from '@rocketseat/unform';
import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import api from '~/Services/api';
import { HeaderMenu, Table, EditButton, DeleteButton } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  async function loadStudents() {
    const response = await api.get(`students?name=${search}`);

    setStudents(response.data);
  }

  useEffect(() => {
    loadStudents();
  });

  async function handleDelete(id) {
    await api.delete(`students/${id}`);
    // loadStudents();
  }

  function confirmDelete(id) {
    confirmAlert({
      title: 'Confirmação de exclusão',
      message: 'Você quer mesmo excluir esse aluno?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => handleDelete(id),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  return (
    <>
      <HeaderMenu>
        <span>Gerenciando alunos</span>

        <aside>
          <button type="button" name="cadastrar">
            CADASTRAR
          </button>
          <Input
            name="search"
            placeholder="Buscar aluno"
            onChange={e => setSearch(e.target.value)}
          />
        </aside>
      </HeaderMenu>
      <Table>
        <thead>
          <tr>
            <th scope="col">NOME</th>
            <th scope="col">E-MAIL</th>
            <th scope="col">IDADE</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <EditButton type="button">editar</EditButton>
                <DeleteButton
                  type="button"
                  onClick={() => confirmDelete(student.id)}
                >
                  apagar
                </DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
