import { Input } from '@rocketseat/unform';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import api from '~/Services/api';
import {
  HeaderMenu,
  Table,
  EditButton,
  DeleteButton,
  PageButton,
} from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get(`students?name=${search}&page=${page}`);

      setStudents(response.data);
    }
    loadStudents();
  }, [search, page]);

  async function handleDelete(id) {
    MySwal.fire({
      title: 'Você tem certeza?',
      text: 'Você não irá poder desfazer essa alteração!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.value) {
        api.delete(`students/${id}`);
        const updatedList = students.filter(student => student.id !== id);
        setStudents(updatedList);
        Swal.fire('Deletado!', 'O aluno foi deletado com sucesso!', 'success');
      }
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
                  onClick={() => handleDelete(student.id)}
                >
                  apagar
                </DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div align="center">
        <PageButton disabled={page < 2} onClick={() => setPage(page - 1)}>
          Página anterior
        </PageButton>
        <span>{page}</span>
        <PageButton
          disabled={students.length / 20 < 1}
          onClick={() => setPage(page + 1)}
        >
          Próxima página
        </PageButton>
      </div>
    </>
  );
}
