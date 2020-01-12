import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import api from '~/Services/api';
import { formatPrice } from '../../util/format';
import {
  HeaderMenu,
  Table,
  EditButton,
  DeleteButton,
  PageButton,
} from './styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);
  const countMonth = ['mês', 'meses'];

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get(`plans?page=${page}`);

      const data = response.data.map(plan => ({
        ...plan,
        durationFormatted: `${
          plan.duration < 2
            ? `${plan.duration} ${countMonth[0]}`
            : `${plan.duration} ${countMonth[1]}`
        }`,
        priceFormatted: formatPrice(plan.price),
      }));

      setPlans(data);
    }
    loadPlans();
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
        api.delete(`plans/${id}`);
        const updatedList = plans.filter(plan => plan.id !== id);
        setPlans(updatedList);
        Swal.fire('Deletado!', 'O aluno foi deletado com sucesso!', 'success');
      }
    });
  }

  return (
    <>
      <HeaderMenu>
        <span>Gerenciando planos</span>

        <aside>
          <button type="button" name="cadastrar">
            CADASTRAR
          </button>
        </aside>
      </HeaderMenu>
      <Table>
        <thead>
          <tr>
            <th scope="col">TÍTULO</th>
            <th scope="col">DURAÇÃO</th>
            <th scope="col">VALOR p/ MÊS</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td>{plan.title}</td>
              <td>{plan.durationFormatted}</td>
              <td>{plan.priceFormatted}</td>
              <td>
                <EditButton type="button">editar</EditButton>
                <DeleteButton
                  type="button"
                  onClick={() => handleDelete(plan.id)}
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
          disabled={plans.length / 20 < 1}
          onClick={() => setPage(page + 1)}
        >
          Próxima página
        </PageButton>
      </div>
    </>
  );
}
