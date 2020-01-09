import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import api from '~/Services/api';
import { formatPrice } from '../../util/format';
import { HeaderMenu, Table, EditButton, DeleteButton } from './styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const countMonth = ['mês', 'meses'];

  async function loadPlans() {
    const response = await api.get(`plans`);

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

  useEffect(() => {
    loadPlans();
  });

  async function handleDelete(id) {
    await api.delete(`plans/${id}`);
  }

  function confirmDelete(id) {
    confirmAlert({
      title: 'Confirmação de exclusão',
      message: 'Você quer mesmo excluir esse plano?',
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
                  onClick={() => confirmDelete(plan.id)}
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
