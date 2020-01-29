import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/Services/api';
import {
  HeaderMenu,
  Table,
  EditButton,
  DeleteButton,
  PageButton,
} from './styles';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [page, setPage] = useState(1);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    async function loadEnrollments() {
      const response = await api.get(`enrollments?page=${page}`);
      const data = response.data.map(enrollment => ({
        ...enrollment,
        startDateFormatted: format(
          parseISO(enrollment.start_date),
          "d 'de' MMMM 'de' Y",
          {
            locale: pt,
          }
        ),
        endDateFormatted: format(
          parseISO(enrollment.end_date),
          "d 'de' MMMM 'de' Y",
          {
            locale: pt,
          }
        ),
      }));
      setEnrollments(data);
      console.tron.log(data);
    }
    loadEnrollments();
    // eslint-disable-next-line
  }, [page]);

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
        api.delete(`enrollments/${id}`);
        const updatedList = enrollments.filter(
          enrollment => enrollment.id !== id
        );
        setEnrollments(updatedList);
        Swal.fire(
          'Deletado!',
          'A matricula foi deletada com sucesso!',
          'success'
        );
      }
    });
  }

  return (
    <>
      <HeaderMenu>
        <span>Gerenciando matrículas</span>

        <aside>
          <button type="button" name="cadastrar">
            CADASTRAR
          </button>
        </aside>
      </HeaderMenu>
      <Table>
        <thead>
          <tr>
            <th scope="col">ALUNO</th>
            <th scope="col">PLANO</th>
            <th scope="col">INÍCIO</th>
            <th scope="col">TÉRMINO</th>
            <th scope="col">ATIVA</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map(enrollment => (
            <tr key={enrollment.id}>
              <td>
                {enrollment.students
                  ? enrollment.students.name
                  : 'ALUNO NÃO ENCONTRADO'}
              </td>
              <td>
                {enrollment.plans
                  ? enrollment.plans.title
                  : 'PLANO NÃO ENCONTRADO'}
              </td>
              <td>{enrollment.startDateFormatted}</td>
              <td>{enrollment.endDateFormatted}</td>
              <td>{enrollment.active ? 'SIM' : 'NÃO'}</td>
              <td>
                <EditButton type="button">editar</EditButton>
                <DeleteButton
                  type="button"
                  onClick={() => handleDelete(enrollment.id)}
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
          disabled={enrollments.length / 20 < 1}
          onClick={() => setPage(page + 1)}
        >
          Próxima página
        </PageButton>
      </div>
    </>
  );
}
