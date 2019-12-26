import { Input } from '@rocketseat/unform';
import React, { useEffect, useState } from 'react';
import api from '~/Services/api';
import { HeaderMenu, Table } from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);

  async function loadStudents() {
    const response = await api.get('students?name');

    setStudents(response.data);
  }

  useEffect(() => {
    loadStudents();
  });

  return (
    <>
      <HeaderMenu>
        <span>Gerenciando alunos</span>

        <aside>
          <button type="button" name="cadastrar">
            CADASTRAR
          </button>
          <Input name="name" placeholder="Buscar aluno" />
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
            <tr>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <button>editar</button>
                <button>apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
