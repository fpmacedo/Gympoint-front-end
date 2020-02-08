import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { MdCheck, MdClose } from 'react-icons/md';
import api from '~/Services/api';
import { formatPrice, formatComma } from '~/util/format';
import { Container, Nav, FormInserts, NumbersDiv, StringDiv } from './styles';

import history from '~/Services/history';

export default function EditPlan() {
  const { id } = useParams();
  const [title, setTitle] = useState([]);
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [totalPrice, setTotalPrice] = useState('');

  useEffect(() => {
    setTotalPrice(formatPrice(price * duration));
  }, [price, duration]);

  useEffect(() => {
    async function loadPlan() {
      const response = await api.get(`plans?id=${id}`);
      console.tron.log(response);
      setPrice(response.data.price);
      setDuration(response.data.duration);
      setTitle(response.data.title);

      // const initialData = {
      //   title: response.data.title,
      //   duration: response.data.duration,
      //   price: `R$ ${formatComma(response.data.price)}`,
      //   total: formatPrice(response.data.price * response.data.duration),
      // };
      // console.tron.log(initialData);

      // setPlan(initialData);
    }
    loadPlan();
  }, [id]);

  const schema = Yup.object().shape({
    title: Yup.string().required('O titulo é obrigatório'),
    duration: Yup.string().required('A duracao é obrigatória'),
    price: Yup.string().required('O preco e obrigatorio'),
  });

  async function handleSubmit(data) {
    try {
      data.price = data.price.replace('R$', '');
      data.price = data.price.replace(',', '.');
      console.tron.log(data);
      await api.put(`/plans/${id}`, data);
      history.push('/plans');
    } catch (erro) {
      toast.error('Preencha todos os dados corretamente.');
    }
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Nav>
          <strong>Cadastro de aluno</strong>
          <div>
            <div>
              <Link to="/plans">
                <MdClose size={20} color="#FFF" />
                CANCELAR
              </Link>
            </div>
            <button type="submit">
              <MdCheck size={18} color="#FFF" />
              SALVAR
            </button>
          </div>
        </Nav>
        <FormInserts>
          <StringDiv>
            <div>
              <div>
                <strong>TÍTULO DO PLANO</strong>
                <Input
                  name="title"
                  id={title}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
            </div>
          </StringDiv>

          <NumbersDiv>
            <div>
              <strong>DURAÇÃO (em meses)</strong>
              <Input
                name="duration"
                value={duration}
                onChange={e => setDuration(e.target.value)}
              />
            </div>

            <div>
              <strong>PREÇO MENSAL</strong>
              <Input
                name="price"
                value={`R$ ${formatComma(price)}`}
                onChange={e =>
                  setPrice(e.target.value.replace('R$', '').replace(',', '.'))
                }
              />
            </div>

            <div>
              <strong>PREÇO TOTAL</strong>
              <Input
                name="total"
                readOnly
                value={totalPrice}
                placeholder="Valor Total"
              />
            </div>
          </NumbersDiv>
        </FormInserts>
      </Form>
    </Container>
  );
}
