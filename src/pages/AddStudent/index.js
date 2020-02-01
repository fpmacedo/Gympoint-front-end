import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import React from 'react';
import { toast } from 'react-toastify';
import { MdCheck, MdClose } from 'react-icons/md';
import api from '~/Services/api';
import { Container, Nav, FormInserts, NumbersDiv, StringDiv } from './styles';

import history from '~/Services/history';

export default function AddStudent() {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('O e-mail é obrigatório'),
    age: Yup.string().required('A idade é obrigatória'),
    weight: Yup.string().required('O peso é obrigatório'),
    height: Yup.string().required('A altura é obrigatória'),
  });

  async function handleSubmit(data) {
    try {
      data.height = data.height.replace(/,/g, '.');
      data.weight = data.weight.replace(/,/g, '.');
      await api.post('/students', data);
      history.push('/students');
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
              <Link to="/students">
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
                <strong>NOME COMPLETO</strong>
                <Input name="name" placeholder="John Doe" />
              </div>

              <div>
                <strong>ENDEREÇO DE E-MAIL</strong>
                <Input
                  name="email"
                  type="email"
                  placeholder="exemplo@dominio.com"
                />
              </div>
            </div>
          </StringDiv>

          <NumbersDiv>
            <div>
              <strong>IDADE</strong>
              <Input name="age" />
            </div>

            <div>
              <strong>PESO (em kg)</strong>
              <Input name="weight" />
            </div>

            <div>
              <strong>ALTURA</strong>
              <Input name="height" />
            </div>
          </NumbersDiv>
        </FormInserts>
      </Form>
    </Container>
  );
}
