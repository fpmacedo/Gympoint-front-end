import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/Services/api';
import { HeaderMenu, Table, AnswerButton, PageButton } from './styles';

export default function HelpOrders() {
  const [helporders, setHelporders] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`help-orders?page=${page}`);
      const data = response.data.map(helporder => ({
        ...helporder,
        created: format(parseISO(helporder.createdAt), "d 'de' MMMM 'de' Y", {
          locale: pt,
        }),
        updated: format(parseISO(helporder.updatedAt), "d 'de' MMMM 'de' Y", {
          locale: pt,
        }),
      }));
      setHelporders(data);
      console.tron.log(data);
    }
    loadHelpOrders();
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      <HeaderMenu>
        <span>Pedidos de auxilio</span>
      </HeaderMenu>
      <Table>
        <thead>
          <tr>
            <th scope="col">ALUNO</th>
          </tr>
        </thead>
        <tbody>
          {helporders.map(helporder => (
            <tr key={helporder.id}>
              <td>
                {helporder.students
                  ? helporder.students.name
                  : 'ALUNO NÃO ENCONTRADO'}
              </td>

              <td>
                <AnswerButton type="button">responder</AnswerButton>
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
          disabled={helporders.length / 20 < 1}
          onClick={() => setPage(page + 1)}
        >
          Próxima página
        </PageButton>
      </div>
    </>
  );
}
